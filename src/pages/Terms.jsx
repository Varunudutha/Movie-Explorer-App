import React from 'react';
import GlassPage from '../components/GlassPage';

const Terms = () => {
    return (
        <GlassPage title="Terms of Service">
            <div className="text-white opacity-75">
                <p>Welcome to CineVerse!</p>
                <p>
                    These terms and conditions outline the rules and regulations for the use of CineVerse's Website.
                    By accessing this website we assume you accept these terms and conditions.
                    Do not continue to use CineVerse if you do not agree to take all of the terms and conditions stated on this page.
                </p>

                <h5 className="text-white mt-4">License</h5>
                <p>
                    Unless otherwise stated, CineVerse and/or its licensors own the intellectual property rights for all material on CineVerse.
                    All intellectual property rights are reserved. You may access this from CineVerse for your own personal use subjected to restrictions set in these terms and conditions.
                </p>

                <h5 className="text-white mt-4">User Content</h5>
                <p>
                    CineVerse reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                </p>
            </div>
        </GlassPage>
    );
};

export default Terms;
