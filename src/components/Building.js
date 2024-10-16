import React from 'react';
import './Building.css';

const Building = () => {
    // Define positions for rooms and exits
    const exits = [
        { position: { top: '0%', left: '0%' }, label: 'E1' },
        { position: { top: '0%', left: '100%' }, label: 'E2' },
        { position: { top: '100%', left: '0%' }, label: 'E3' },
    ];

    const rooms = [
        { position: { top: '20%', left: '10%' }, label: 'Room 1' },
        { position: { top: '20%', left: '40%' }, label: 'Room 2' },
        { position: { top: '50%', left: '10%' }, label: 'Room 3' },
        { position: { top: '50%', left: '40%' }, label: 'Room 4' },
    ];

    return (
        <div className="building">
            <div className="building-area">
                {/* Adding exit doors in three corners */}
                {exits.map((exit, index) => (
                    <Exit key={index} className={`exit-e${index + 1}`} label={exit.label} position={exit.position} />
                ))}

                {/* Positioning rooms */}
                {rooms.map((room, index) => (
                    <Room key={index} position={room.position} label={room.label} />
                ))}

                {/* Show paths from each room to each exit */}
                {rooms.map((room, roomIndex) => (
                    exits.map((exit, exitIndex) => (
                        <Path key={`${roomIndex}-${exitIndex}`} start={room.position} end={exit.position} />
                    ))
                ))}
            </div>
        </div>
    );
};

const Room = ({ position, label }) => {
    return (
        <div className="room" style={{ top: position.top, left: position.left }}>
            {label}
        </div>
    );
};

const Exit = ({ className, label, position }) => {
    return (
        <div className={`exit ${className}`} style={{ top: position.top, left: position.left }}>
            {label}
        </div>
    );
};

const Path = ({ start, end }) => {
    const startX = parseFloat(start.left);
    const startY = parseFloat(start.top);
    const endX = parseFloat(end.left);
    const endY = parseFloat(end.top);

    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    return (
        <div
            className="path"
            style={{
                top: `${(startY + endY) / 2}%`,
                left: `${(startX + endX) / 2}%`,
                width: `${width}%`,
                height: `${height}%`,
                border: '1px dotted black',
                position: 'absolute',
                transform: `translate(-50%, -50%)`,
            }}
        />
    );
};

export default Building;
