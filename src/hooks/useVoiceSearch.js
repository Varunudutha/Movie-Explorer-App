import { useState, useEffect, useCallback, useRef } from 'react';

const DEBUG_VOICE = true;

export const VOICE_STATUS = {
    IDLE: 'idle',
    LISTENING: 'listening',
    SUCCESS: 'success',
    ERROR: 'error',
    STOPPED: 'stopped'
};

/**
 * State Machine based Voice Search Hook
 * Prevents flickering and event loops by strictly managing transition states.
 */
const useVoiceSearch = (options = {}) => {
    // Single Source of Truth for State
    const [status, setStatus] = useState(VOICE_STATUS.IDLE);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const [isSupported, setIsSupported] = useState(true);

    const recognitionRef = useRef(null);
    const cooldownRef = useRef(false); // Lock to prevent spam

    const log = (msg, data = '') => {
        if (DEBUG_VOICE) console.log(`[VoiceSearch][${status}] ${msg}`, data);
    };

    // Helper: Safe Context Check
    const isSafeContext = () => {
        if (typeof window === 'undefined') return false;
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isHttps = window.location.protocol === 'https:';
        return isLocalhost || isHttps;
    };

    // Initialize (Lazy)
    const initializeRecognition = () => {
        if (typeof window === 'undefined') return null;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsSupported(false);
            return null;
        }

        if (!isSafeContext()) {
            setStatus(VOICE_STATUS.ERROR);
            setError('Voice search requires HTTPS');
            return null;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            return recognition;
        } catch (e) {
            log('Init failed', e);
            return null;
        }
    };

    // Transition Helper
    const transitionTo = (newStatus) => {
        log(`Transition: ${status} -> ${newStatus}`);
        setStatus(newStatus);
    };

    // Create & Bind Instance
    const getOrCreateInstance = () => {
        if (recognitionRef.current) return recognitionRef.current;

        const recognition = initializeRecognition();
        if (!recognition) return null;

        recognition.onstart = () => {
            log('Event: onstart');
            transitionTo(VOICE_STATUS.LISTENING);
        };

        recognition.onresult = (event) => {
            log('Event: onresult');
            const result = event.results[0][0].transcript;
            if (result) {
                setTranscript(result);
                transitionTo(VOICE_STATUS.SUCCESS);
            }
        };

        recognition.onerror = (event) => {
            log('Event: onerror', event.error);
            const errCode = event.error;

            // Ignore manual aborts
            if (errCode === 'aborted') {
                // If we were listening and it aborted, goes to IDLE
                // If we manually stopped, it goes to IDLE via stop function usually
                return;
            }

            // Map Error
            let msg = 'Voice search unavailable';
            if (errCode === 'no-speech') msg = "Didn't hear you. Try again.";
            if (errCode === 'network') msg = "Network error. Check connection.";
            if (errCode === 'not-allowed') msg = "Permission denied.";

            setError(msg);
            transitionTo(VOICE_STATUS.ERROR);

            // Lock Mic for 1.5s (Cooldown)
            cooldownRef.current = true;
            setTimeout(() => {
                cooldownRef.current = false;
            }, 1500);
        };

        recognition.onend = () => {
            log('Event: onend');
            // CRITICAL: Check current state mechanism
            // If we are SUCCESS, we stay SUCCESS (consumer handles it) or go IDLE?
            // Usually we want to go back to IDLE eventually, or let the UI decide.
            // But if we are in ERROR state, DO NOT go to IDLE immediately, or it flickers!
            // WE ONLY GO TO IDLE IF WE WERE LISTENING

            setStatus(prev => {
                if (prev === VOICE_STATUS.LISTENING) {
                    return VOICE_STATUS.IDLE;
                }
                // If SUCCESS, keep SUCCESS so UI shows "Searching..."
                // If ERROR, keep ERROR so UI shows error message
                return prev;
            });
        };

        recognitionRef.current = recognition;
        return recognition;
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.abort();
        };
    }, []);

    const startListening = useCallback(() => {
        if (cooldownRef.current) {
            log('Blocked by cooldown');
            return;
        }

        // Reset
        setError(null);
        setTranscript('');

        // Ensure instance
        const recognition = getOrCreateInstance();
        if (!recognition) return;

        try {
            recognition.start();
        } catch (e) {
            log('Start failed (likely already active)', e);
            // If double-start error, just ensure we are consistent
        }
    }, [status]); // Dependencies might trigger re-creation if heavy, strictly speaking none needed for refs

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        // Force IDLE
        transitionTo(VOICE_STATUS.IDLE);
    }, []);

    // Manual Reset (e.g. user clicks 'X' or clicks mic again from error state)
    const resetState = useCallback(() => {
        stopListening();
        setError(null);
        setTranscript('');
        transitionTo(VOICE_STATUS.IDLE);
    }, [stopListening]);

    return {
        status,
        transcript,
        isSupported,
        error,
        startListening,
        stopListening,
        resetState
    };
};

export default useVoiceSearch;
