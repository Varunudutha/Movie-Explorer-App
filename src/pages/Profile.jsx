
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AvatarUpload from '../components/profile/AvatarUpload';
import GenderToggle from '../components/profile/GenderToggle';
import GenreSelector from '../components/profile/GenreSelector';
import SubscriptionCard from '../components/profile/SubscriptionCard';
import ReviewHistory from '../components/profile/ReviewHistory';

const Profile = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [profileData, setProfileData] = useState({
        name: '',
        gender: 'male',
        interestedGenres: [],
        profileImageUrl: null
    });

    // Load Data
    useEffect(() => {
        const fetchProfile = async () => {
            if (!currentUser) return;
            try {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProfileData({ ...docSnap.data() });
                } else {
                    // Init with basic auth data if no firestore doc
                    setProfileData(prev => ({
                        ...prev,
                        name: currentUser.displayName || currentUser.email.split('@')[0],
                        profileImageUrl: currentUser.photoURL
                    }));
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setErrorMsg("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser]);

    // Save Handler
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const docRef = doc(db, 'users', currentUser.uid);
            // Merge true allows us to update only specified fields without overwriting everything
            await setDoc(docRef, {
                ...profileData,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setSuccessMsg("Profile updated successfully!");
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error("Error saving profile:", err);
            setErrorMsg("Failed to save changes. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div style={{ minHeight: '80vh' }} className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="danger" />
        </div>
    );

    return (
        <Container className="py-5 mt-5">
            <div className="d-flex align-items-center justify-content-between mb-5">
                <h2 className="fw-bold text-white mb-0 display-6">Edit Profile</h2>
                {successMsg && <div className="text-success fw-bold fade-in">✓ Saved</div>}
            </div>

            <Form onSubmit={handleSave}>
                <Row className="g-5">
                    {/* Left Column: Avatar & Subscription */}
                    <Col lg={4} className="d-flex flex-column gap-4">
                        {/* Avatar Section */}
                        <div className="p-4 rounded-4 text-center bg-glass-panel">
                            <AvatarUpload
                                currentImage={profileData.profileImageUrl}
                                onImageChange={(url) => setProfileData({ ...profileData, profileImageUrl: url })}
                            />
                            <div className="mt-3 text-secondary small">
                                Allowed: JPG, PNG (Max 2MB)
                            </div>
                        </div>

                        {/* Subscription Card */}
                        <SubscriptionCard />
                    </Col>

                    {/* Right Column: Key Details */}
                    <Col lg={8}>
                        <div className="p-4 rounded-4 bg-glass-panel h-100">
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                            {successMsg && <Alert variant="success">{successMsg}</Alert>}

                            {/* Name Input */}
                            <Form.Group className="mb-4">
                                <Form.Label className="text-secondary fw-bold small">USER NAME</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={profileData.name || ''}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="bg-dark text-white border-secondary py-2"
                                    placeholder="Enter your name"
                                    required
                                />
                            </Form.Group>

                            {/* Gender Toggle */}
                            <Form.Group className="mb-4">
                                <Form.Label className="text-secondary fw-bold small d-block mb-3">GENDER</Form.Label>
                                <GenderToggle
                                    selected={profileData.gender}
                                    onSelect={(gender) => setProfileData({ ...profileData, gender })}
                                />
                            </Form.Group>

                            <hr className="border-secondary my-4 opacity-50" />

                            {/* Genre Selector */}
                            <Form.Group className="mb-5">
                                <Form.Label className="text-secondary fw-bold small d-block mb-3">
                                    INTERESTS (Select genres to personalize your feed)
                                </Form.Label>
                                <GenreSelector
                                    selectedGenres={profileData.interestedGenres || []}
                                    onToggle={(genres) => setProfileData({ ...profileData, interestedGenres: genres })}
                                />
                            </Form.Group>

                            {/* Save Button */}
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="danger"
                                    type="submit"
                                    size="lg"
                                    className="px-5 fw-bold btn-netflix"
                                    disabled={saving}
                                >
                                    {saving ? <Spinner size="sm" animation="border" /> : 'SAVE CHANGES'}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>

            {/* Review History Section */}
            <div className="mt-5">
                <ReviewHistory />
            </div>

            <style jsx>{`
                .bg-glass-panel {
                    background-color: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                }
                .fade-in {
                    animation: fadeIn 0.5s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </Container >
    );
};

export default Profile;
