import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const { currentUser } = useAuth();

    // Check local storage or default to dark (true) for initial state
    // Check local storage or system preference for initial state
    const [isDark, setIsDark] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme !== null) {
                return JSON.parse(savedTheme);
            }
            // Fallback to system preference
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (e) {
            console.warn("Error reading theme preference:", e);
            return true; // Default to dark safe mode
        }
    });

    // Sync from Firestore when logged in
    useEffect(() => {
        let unsubscribe;
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            unsubscribe = onSnapshot(userRef, async (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.themePreference !== undefined) {
                        setIsDark(data.themePreference);
                    } else {
                        // Doc exists but no theme pref? Update with current local.
                        await setDoc(userRef, { themePreference: isDark }, { merge: true });
                    }
                } else {
                    // Create doc if missing (robustness), sync current local pref to cloud
                    await setDoc(userRef, { themePreference: isDark }, { merge: true });
                }
            });
        }
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentUser]);

    // Effect to apply styles to body and save to localStorage (always, for redundancy/guest)
    // Effect to apply styles via CSS class
    // Effect to apply styles via data-theme attribute
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDark));
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }, [isDark]);

    const toggleTheme = async () => {
        const newTheme = !isDark;
        setIsDark(newTheme); // Optimistic update

        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            try {
                await updateDoc(userRef, {
                    themePreference: newTheme
                });
            } catch (error) {
                console.error("Error saving theme preference:", error);
            }
        }
    };

    const value = React.useMemo(() => ({
        isDark,
        toggleTheme
    }), [isDark]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
