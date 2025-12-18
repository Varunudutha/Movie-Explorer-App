import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this exports your firestore instance
import GlassPage from '../components/GlassPage';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        }

        try {
            setError('');
            setLoading(true);

            // 1. Create User in Firebase Auth
            const userCredential = await signup(email, password);
            const user = userCredential.user;

            // 2. Create User Document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                createdAt: serverTimestamp(),
            });

            // 3. Redirect to Home
            navigate('/');
        } catch (err) {
            console.error("Signup Error:", err);
            // Firebase error codes are like 'auth/email-already-in-use'
            if (err.code === 'auth/email-already-in-use') {
                setError('Failed to create an account. Email is already in use.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password is too weak.');
            } else {
                // Show the actual error message to help debug
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassPage title="Sign Up" maxWidth="500px">
            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-dark text-white border-secondary py-2"
                        style={{ fontSize: '1.1rem' }}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-dark text-white border-secondary py-2"
                        style={{ fontSize: '1.1rem' }}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-dark text-white border-secondary py-2"
                        style={{ fontSize: '1.1rem' }}
                    />
                    <Form.Text className="text-muted">
                        Must be at least 6 characters.
                    </Form.Text>
                </Form.Group>

                <Button
                    variant="danger"
                    type="submit"
                    className="w-100 py-3 fw-bold fs-5 mb-4"
                    disabled={loading}
                    style={{ background: '#e50914', border: 'none' }}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                </Button>

                <div className="text-center text-white-50">
                    Already have an account? <Link to="/login" className="text-white fw-bold text-decoration-none hover-underline">Sign in now.</Link>
                </div>
            </Form>
        </GlassPage>
    );
};

export default Signup;
