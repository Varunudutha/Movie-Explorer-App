import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

const ImmersiveLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <Outlet />
            </div>
            {/* No Footer in Immersive Layout */}
        </div>
    );
};

export default ImmersiveLayout;
