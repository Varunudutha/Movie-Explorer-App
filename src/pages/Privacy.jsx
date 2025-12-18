import React from 'react';
import GlassPage from '../components/GlassPage';

const Privacy = () => {
    return (
        <GlassPage title="Privacy Policy">
            <div className="text-white opacity-75">
                <p>Last updated: December 18, 2025</p>
                <p>
                    At CineVerse, accessible from cineverse.com, one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected and recorded by CineVerse and how we use it.
                </p>

                <h5 className="text-white mt-4">Information We Collect</h5>
                <p>
                    We collect very minimal data. As a portfolio project, we primarily store your watchlist preferences locally on your device.
                    If you contact us directly, we may receive additional information about you such as your name, email address, and the contents of the message you may send us.
                </p>

                <h5 className="text-white mt-4">Log Files</h5>
                <p>
                    CineVerse follows a standard procedure of using log files. These files log visitors when they visit websites.
                    The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
                </p>
            </div>
        </GlassPage>
    );
};

export default Privacy;
