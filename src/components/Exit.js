// src/Exit.js
import React from 'react';
import './Exit.css';

const Exit = ({ position }) => {
    return (
        <div className="exit" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <h4>Main Exit</h4>
        </div>
    );
};

export default Exit;
