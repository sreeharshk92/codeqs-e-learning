// src/Pages/Pagenotfound/Pagenotfound.js
import React from 'react';
import './Pagenotfound.css'; // Import your CSS file

const Pagenotfound = () => {
    return (
        <div className="page-not-found-container">
            <h1 className="page-not-found-title">404 - Page Not Found</h1>
            <p className="page-not-found-message">We're sorry, but the page you are looking for does not exist.</p>
            <a className="page-not-found-link" href="/">Go back to Home</a>
        </div>
    );
};

export default Pagenotfound;
