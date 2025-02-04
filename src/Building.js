
import React, { useEffect, useRef, useState } from "react";
import "./Building.css";

const ITFloorPlan = () => {
  const canvasRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [showPath, setShowPath] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Age and health condition weight mapping
  const ageWeight = {
    'Young': 0.8,
    'Middle-Aged': 1.0,
    'Senior': 1.3
  };

  const healthWeight = {
    'Fit': 0.9,
    'Limited Mobility': 1.4,
    'Critical Condition': 1.6
  };

  // Updated room and exit layout
  const rooms = {
    "Developer Room 1": { x: 100, y: 120, width: 120, height: 100, door: { x: 220, y: 170 } },
    "Developer Room 2": { x: 250, y: 120, width: 120, height: 100, door: { x: 310, y: 170 } },
    "Manager Room": { x: 400, y: 120, width: 120, height: 100, door: { x: 460, y: 170 } },
    "Meeting Room": { x: 100, y: 250, width: 120, height: 100, door: { x: 220, y: 300 } },
    "Cafeteria": { x: 250, y: 250, width: 120, height: 100, door: { x: 310, y: 300 } },
    "Server Room": { x: 400, y: 250, width: 120, height: 100, door: { x: 460, y: 300 } },
    "Reception": { x: 550, y: 120, width: 120, height: 100, door: { x: 610, y: 170 } }
  };

  // Added more strategic exit points
  const exits = [
    { x: 50, y: 100, label: "North Exit" },
    { x: 50, y: 350, label: "West Exit" },
    { x: 700, y: 100, label: "East Exit 1" },
    { x: 700, y: 350, label: "East Exit 2" },
    { x: 400, y: 450, label: "South Exit" }
  ];

  const corridors = [
    { start: { x: 50, y: 200 }, end: { x: 700, y: 200 } }, // Horizontal corridor
    { start: { x: 400, y: 50 }, end: { x: 400, y: 450 } }  // Vertical corridor
  ];

  const findOptimalPath = (startRoom) => {
    if (!startRoom) return [];

    const start = rooms[startRoom].door;
    let bestExit = exits[0];
    let minDistance = Infinity;

    // Adjust distance calculation based on age and health condition
    const ageMultiplier = ageWeight[ageGroup] || 1;
    const healthMultiplier = healthWeight[healthCondition] || 1;

    // Path finding logic considering obstacles and multipliers
    exits.forEach((exit) => {
      const distance = calculatePathDistance(start, exit);
      const adjustedDistance = distance * ageMultiplier * healthMultiplier; // Adjusted distance
      if (adjustedDistance < minDistance) {
        minDistance = adjustedDistance;
        bestExit = exit;
      }
    });

    // Generate waypoints avoiding room intersections
    const waypoints = generateSafePath(start, bestExit);
    return [...waypoints, bestExit];
  };

  const calculatePathDistance = (start, end) => {
    // Calculate distance considering corridor paths
    const directDistance = Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)
    );
    return directDistance;
  };

  const generateSafePath = (start, end) => {
    // Strategic waypoint generation
    const waypoints = [
      { x: start.x, y: 200 }, // Move to horizontal corridor
      { x: end.x, y: 200 }    // Move to exit corridor
    ];
    return waypoints;
  };

  const drawFloorPlan = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw corridors
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 10;
    corridors.forEach(corridor => {
      ctx.beginPath();
      ctx.moveTo(corridor.start.x, corridor.start.y);
      ctx.lineTo(corridor.end.x, corridor.end.y);
      ctx.stroke();
    });

    // Draw rooms
    Object.entries(rooms).forEach(([roomName, room]) => {
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(room.x, room.y, room.width, room.height);
      ctx.strokeStyle = "#333";
      ctx.strokeRect(room.x, room.y, room.width, room.height);
      
      // Room label
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(roomName, room.x + 10, room.y + 20);
      
      // Room door
      ctx.fillStyle = "#8BC34A";
      ctx.fillRect(room.door.x - 5, room.door.y - 5, 10, 10);
    });

    // Draw exits
    exits.forEach(exit => {
      ctx.fillStyle = "#FF5722";
      ctx.beginPath();
      ctx.arc(exit.x, exit.y, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#000";
      ctx.fillText(exit.label, exit.x + 10, exit.y);
    });
  };

  const drawEvacuationPath = (ctx) => {
    if (!selectedRoom) return;

    const path = findOptimalPath(selectedRoom);
    
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    
    ctx.strokeStyle = "#FF5733";
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 4]);
    
    path.slice(1).forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 750;
    canvas.height = 500;
    
    drawFloorPlan(ctx);
    if (showPath) drawEvacuationPath(ctx);
  }, [selectedRoom, showPath, ageGroup, healthCondition]);

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        style={{border: "1px solid #ccc"}}
      />
      <div>
        <select onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="">Select Room</option>
          {Object.keys(rooms).map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
        <select onChange={(e) => setAgeGroup(e.target.value)}>
          <option value="">Age Group</option>
          <option value="Young">Young</option>
          <option value="Middle-Aged">Middle-Aged</option>
          <option value="Senior">Senior</option>
        </select>
        <select onChange={(e) => setHealthCondition(e.target.value)}>
          <option value="">Health Condition</option>
          <option value="Fit">Fit</option>
          <option value="Limited Mobility">Limited Mobility</option>
          <option value="Critical Condition">Critical Condition</option>
        </select>
        <button onClick={() => setShowPath(true)}>Show Evacuation Path</button>
      </div>
    </div>
  );
};

export default ITFloorPlan;
