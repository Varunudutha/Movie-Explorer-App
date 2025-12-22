import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const MainLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
