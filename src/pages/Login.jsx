import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import GlassPage from '../components/GlassPage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error("Login Error:", err);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Failed to log in. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await googleSignIn();
            navigate('/');
        } catch (err) {
            console.error("Google Login Error:", err);
            setError('Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassPage title="Sign In" maxWidth="450px">
            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Control
                        type="email"
                        placeholder="Email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-dark text-white border-0 py-3"
                        style={{ fontSize: '1rem', background: '#333' }}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-dark text-white border-0 py-3"
                        style={{ fontSize: '1rem', background: '#333' }}
                    />
                </Form.Group>

                <Button
                    variant="danger"
                    type="submit"
                    className="w-100 py-3 fw-bold mb-3"
                    disabled={loading}
                    style={{ background: '#e50914', border: 'none' }}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                </Button>

                <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1 border-bottom border-secondary opacity-50"></div>
                    <span className="px-3 text-white-50 small">OR</span>
                    <div className="flex-grow-1 border-bottom border-secondary opacity-50"></div>
                </div>

                <Button
                    variant="light"
                    className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-4"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <FaGoogle /> Sign in with Google
                </Button>

                <div className="text-white-50 mt-3 small">
                    New to CineVerse? <Link to="/signup" className="text-white fw-bold text-decoration-none hover-underline">Sign up now.</Link>
                </div>
            </Form>
        </GlassPage>
    );
};

export default Login;
