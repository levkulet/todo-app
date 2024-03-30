import React from "react";
import './NotFound.scss';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 Page Not Found</h1>
            <p className="not-found-paragraph">Oops! The page you're looking for could not be found.</p>
            <p className="not-found-paragraph">Please check the URL and try again, or go back to the <Link to="/" className="not-found-link">homepage</Link>.</p>
        </div>
    );
}

export default NotFound;