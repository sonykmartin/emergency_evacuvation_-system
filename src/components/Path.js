// src/Path.js
import React from 'react';
import './Path.css';

const Path = ({ path }) => {
    return (
        <div className="path">
            {path.map((p, index) => (
                <div key={index} className="path-arrow" style={{ left: `${p.x}px`, top: `${p.y}px` }}>
                    →
                </div>
            ))}
        </div>
    );
};

export default Path;
