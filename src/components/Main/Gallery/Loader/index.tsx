import React from "react";
import './style.css';

const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
}

export default Loader;