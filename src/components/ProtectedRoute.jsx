import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth(); // Assuming AuthContext provides a 'loading' state

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
