// // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // import "./Building.css";

// // // // // // // const ITFloorPlan = () => {
// // // // // // //   const canvasRef = useRef(null);
// // // // // // //   const [selectedRoom, setSelectedRoom] = useState('');
// // // // // // //   const [ageGroup, setAgeGroup] = useState('');
// // // // // // //   const [disease, setDisease] = useState('');
// // // // // // //   const [showPath, setShowPath] = useState(false);
// // // // // // //   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  

// // // // // // //   useEffect(() => {
// // // // // // //     const updateDimensions = () => {
// // // // // // //       const container = document.getElementById('floor-plan-container');
// // // // // // //       if (container) {
// // // // // // //         const { width } = container.getBoundingClientRect();
// // // // // // //         setDimensions({
// // // // // // //           width: Math.floor(width * 0.95),
// // // // // // //           height: Math.floor((width * 0.95) * (1/2))
// // // // // // //         });
// // // // // // //       }
// // // // // // //     };

// // // // // // //     updateDimensions();
// // // // // // //     window.addEventListener('resize', updateDimensions);
// // // // // // //     return () => window.removeEventListener('resize', updateDimensions);
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     if (dimensions.width === 0) return;

// // // // // // //     const canvas = canvasRef.current;
// // // // // // //     const ctx = canvas.getContext('2d');
    
// // // // // // //     const scale = dimensions.width / 800;
// // // // // // //     const WALL_THICKNESS = Math.floor(6 * scale);
// // // // // // //     const DOOR_WIDTH = Math.floor(24 * scale);
// // // // // // //     const GRID_SIZE = Math.floor(16 * scale);
// // // // // // //     const CORRIDOR_WIDTH = Math.floor(50 * scale);

// // // // // // //     function clearCanvas() {
// // // // // // //       ctx.fillStyle = '#f8fafc';
// // // // // // //       ctx.fillRect(0, 0, canvas.width, canvas.height);
// // // // // // //     }

// // // // // // //     function drawGrid() {
// // // // // // //       ctx.strokeStyle = '#e2e8f0';
// // // // // // //       ctx.lineWidth = 0.5;
// // // // // // //       for (let i = 0; i < canvas.width; i += GRID_SIZE) {
// // // // // // //         ctx.beginPath();
// // // // // // //         ctx.moveTo(i, 0);
// // // // // // //         ctx.lineTo(i, canvas.height);
// // // // // // //         ctx.stroke();
// // // // // // //       }
// // // // // // //       for (let i = 0; i < canvas.height; i += GRID_SIZE) {
// // // // // // //         ctx.beginPath();
// // // // // // //         ctx.moveTo(0, i);
// // // // // // //         ctx.lineTo(canvas.width, i);
// // // // // // //         ctx.stroke();
// // // // // // //       }
// // // // // // //     }

// // // // // // //     function drawCorridor() {
// // // // // // //       ctx.fillStyle = '#f1f5f9';
// // // // // // //       // Horizontal corridor
// // // // // // //       ctx.fillRect(50 * scale, 150 * scale, 700 * scale, CORRIDOR_WIDTH);
// // // // // // //       // Vertical corridor
// // // // // // //       ctx.fillRect(350 * scale, 200 * scale, CORRIDOR_WIDTH, 200 * scale);
// // // // // // //     }

// // // // // // //     function drawWalls(x, y, width, height, isSelected) {
// // // // // // //       ctx.fillStyle = isSelected ? '#3b82f6' : '#334155';
// // // // // // //       ctx.fillRect(x * scale, y * scale, width * scale, WALL_THICKNESS);
// // // // // // //       ctx.fillRect(x * scale, y * scale, WALL_THICKNESS, height * scale);
// // // // // // //       ctx.fillRect(x * scale + width * scale - WALL_THICKNESS, y * scale, WALL_THICKNESS, height * scale);
// // // // // // //       ctx.fillRect(x * scale, y * scale + height * scale - WALL_THICKNESS, width * scale, WALL_THICKNESS);
      
// // // // // // //       if (isSelected) {
// // // // // // //         ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
// // // // // // //         ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
// // // // // // //       }
// // // // // // //     }

// // // // // // //     function drawDoor(x, y, isHorizontal = true, swingLeft = true) {
// // // // // // //       ctx.strokeStyle = '#334155';
// // // // // // //       ctx.lineWidth = 2;
// // // // // // //       if (isHorizontal) {
// // // // // // //         ctx.clearRect(x * scale, y * scale - WALL_THICKNESS / 2, DOOR_WIDTH, WALL_THICKNESS);
// // // // // // //         ctx.beginPath();
// // // // // // //         swingLeft
// // // // // // //           ? ctx.arc(x * scale, y * scale, 16 * scale, 0, Math.PI / 2)
// // // // // // //           : ctx.arc(x * scale + DOOR_WIDTH, y * scale, 16 * scale, Math.PI / 2, Math.PI);
// // // // // // //         ctx.stroke();
// // // // // // //       } else {
// // // // // // //         ctx.clearRect(x * scale - WALL_THICKNESS / 2, y * scale, WALL_THICKNESS, DOOR_WIDTH);
// // // // // // //         ctx.beginPath();
// // // // // // //         swingLeft
// // // // // // //           ? ctx.arc(x * scale, y * scale, 16 * scale, 0, -Math.PI / 2)
// // // // // // //           : ctx.arc(x * scale, y * scale + DOOR_WIDTH, 16 * scale, -Math.PI / 2, -Math.PI);
// // // // // // //         ctx.stroke();
// // // // // // //       }
// // // // // // //     }

// // // // // // //     function drawRoomLabel(x, y, width, height, label, isSelected) {
// // // // // // //       ctx.font = `${Math.floor(14 * scale)}px sans-serif`;
// // // // // // //       ctx.fillStyle = isSelected ? '#1d4ed8' : '#1e293b';
// // // // // // //       ctx.textAlign = 'center';
// // // // // // //       ctx.textBaseline = 'middle';
// // // // // // //       ctx.fillText(label, (x + width/2) * scale, (y + height/2) * scale);
// // // // // // //     }

// // // // // // //     function drawExitSign(x, y) {
// // // // // // //       const size = 32 * scale;
// // // // // // //       ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
// // // // // // //       ctx.fillRect((x - size/2) * scale, (y - size/2) * scale, size, size);
// // // // // // //       ctx.strokeStyle = '#ef4444';
// // // // // // //       ctx.lineWidth = 2;
// // // // // // //       ctx.strokeRect((x - size/2) * scale, (y - size/2) * scale, size, size);
// // // // // // //       ctx.font = `${Math.floor(12 * scale)}px sans-serif`;
// // // // // // //       ctx.fillStyle = '#ef4444';
// // // // // // //       ctx.textAlign = 'center';
// // // // // // //       ctx.fillText('EXIT', x * scale, y * scale);
// // // // // // //     }

// // // // // // //     function getPathPoints(room) {
// // // // // // //       // Define corridor intersection points
// // // // // // //       const corridorPoints = {
// // // // // // //         mainIntersection: { x: 375, y: 175 }, // Main corridor intersection
// // // // // // //         leftExit: { x: 50, y: 175 },
// // // // // // //         rightExit: { x: 750, y: 175 },
// // // // // // //         bottomExit: { x: 375, y: 400 }
// // // // // // //       };

// // // // // // //       // Get room's door location
// // // // // // //       const doorPoint = {
// // // // // // //         x: room.doorX,
// // // // // // //         y: room.doorY
// // // // // // //       };

// // // // // // //       return {
// // // // // // //         doorPoint,
// // // // // // //         corridorPoints
// // // // // // //       };
// // // // // // //     }

// // // // // // //     function drawEvacuationPath(startRoom) {
// // // // // // //       if (!startRoom) return;
      
// // // // // // //       const room = rooms.find(r => r.label === startRoom);
// // // // // // //       if (!room) return;

// // // // // // //       const { doorPoint, corridorPoints } = getPathPoints(room);
// // // // // // //       const isShorterPath = (ageGroup === 'elder' || disease === 'chronic');

// // // // // // //       const exits = [
// // // // // // //         { point: corridorPoints.leftExit, label: 'left' },
// // // // // // //         { point: corridorPoints.rightExit, label: 'right' },
// // // // // // //         { point: corridorPoints.bottomExit, label: 'bottom' }
// // // // // // //       ];

// // // // // // //       const nearestExit = exits.reduce((nearest, exit) => {
// // // // // // //         const distance = Math.sqrt(
// // // // // // //           Math.pow(doorPoint.x - exit.point.x, 1) + 
// // // // // // //           Math.pow(doorPoint.y - exit.point.y, 2)
// // // // // // //         );
// // // // // // //         return (!nearest || (isShorterPath ? distance < nearest.distance : distance > nearest.distance))
// // // // // // //           ? { ...exit, distance }
// // // // // // //           : nearest;
// // // // // // //       }, null);

// // // // // // //       // Create gradient for path
// // // // // // //       const gradient = ctx.createLinearGradient(
// // // // // // //         doorPoint.x * scale, 
// // // // // // //         doorPoint.y * scale,
// // // // // // //         nearestExit.point.x * scale,
// // // // // // //         nearestExit.point.y * scale
// // // // // // //       );
// // // // // // //       gradient.addColorStop(0, '#4f46e5');  
// // // // // // //       gradient.addColorStop(1, '#06b6d4');  

// // // // // // //       ctx.shadowColor = '#06b6d4';
// // // // // // //       ctx.shadowBlur = 10;
// // // // // // //       ctx.strokeStyle = gradient;
// // // // // // //       ctx.lineWidth = 4;
// // // // // // //       ctx.setLineDash([8, 4]);

// // // // // // //       ctx.beginPath();
// // // // // // //       ctx.moveTo(doorPoint.x * scale, doorPoint.y * scale);
// // // // // // //       ctx.lineTo(doorPoint.x * scale, corridorPoints.mainIntersection.y * scale);

// // // // // // //       if (nearestExit.label === 'bottom') {
// // // // // // //         ctx.lineTo(corridorPoints.mainIntersection.x * scale, corridorPoints.mainIntersection.y * scale);
// // // // // // //         ctx.lineTo(corridorPoints.bottomExit.x * scale, corridorPoints.bottomExit.y * scale);
// // // // // // //       } else if (nearestExit.label === 'left') {
// // // // // // //         ctx.lineTo(corridorPoints.leftExit.x * scale, corridorPoints.leftExit.y * scale);
// // // // // // //       } else {
// // // // // // //         ctx.lineTo(corridorPoints.rightExit.x * scale, corridorPoints.rightExit.y * scale);
// // // // // // //       }

// // // // // // //       ctx.stroke();
// // // // // // //       ctx.setLineDash([]);
// // // // // // //       ctx.shadowBlur = 0;

// // // // // // //       const arrowSize = 12 * scale;
// // // // // // //       const points = [doorPoint, corridorPoints.mainIntersection, nearestExit.point];
// // // // // // //       const midPoint = points[Math.floor(points.length / 2)];
// // // // // // //       const nextPoint = points[Math.floor(points.length / 2) + 1];
      
// // // // // // //       const angle = Math.atan2(nextPoint.y - midPoint.y, nextPoint.x - midPoint.x);
// // // // // // //       ctx.fillStyle = '#06b6d4';
// // // // // // //       ctx.strokeStyle = '#06b6d4';
// // // // // // //       ctx.lineWidth = 3;
      
// // // // // // //       ctx.beginPath();
// // // // // // //       ctx.moveTo(midPoint.x * scale, midPoint.y * scale);
// // // // // // //       ctx.lineTo(
// // // // // // //         (midPoint.x - arrowSize * Math.cos(angle - Math.PI / 6)) * scale,
// // // // // // //         (midPoint.y - arrowSize * Math.sin(angle - Math.PI / 6)) * scale
// // // // // // //       );
// // // // // // //       ctx.lineTo(
// // // // // // //         (midPoint.x - arrowSize * Math.cos(angle + Math.PI / 6)) * scale,
// // // // // // //         (midPoint.y - arrowSize * Math.sin(angle + Math.PI / 6)) * scale
// // // // // // //       );
// // // // // // //       ctx.closePath();
// // // // // // //       ctx.fill();
// // // // // // //     }

// // // // // // //     const rooms = [
// // // // // // //       // Top row (above corridor)
// // // // // // //       { x: 50, y: 50, w: 140, h: 100, label: 'TCS Office', doorX: 120, doorY: 150 },
// // // // // // //       { x: 200, y: 50, w: 140, h: 100, label: 'Infosys Hub', doorX: 270, doorY: 150 },
// // // // // // //       { x: 450, y: 50, w: 140, h: 100, label: 'Microsoft Suite', doorX: 520, doorY: 150 },
// // // // // // //       { x: 600, y: 50, w: 140, h: 100, label: 'Google Space', doorX: 670, doorY: 150 },
      
// // // // // // //       // Bottom row (below corridor)
// // // // // // //       { x: 50, y: 200, w: 140, h: 100, label: 'Amazon Hub', doorX: 120, doorY: 200 },
// // // // // // //       { x: 200, y: 200, w: 140, h: 100, label: 'Tech Cafe', doorX: 270, doorY: 200 },
      
// // // // // // //       // Right wing
// // // // // // //       { x: 450, y: 200, w: 140, h: 100, label: 'Innovation Lab', doorX: 450, doorY: 250 },
// // // // // // //       { x: 450, y: 310, w: 140, h: 90, label: 'Conference Center', doorX: 450, doorY: 355 },
      
// // // // // // //       // Central area
// // // // // // //       { x: 600, y: 200, w: 140, h: 200, label: 'Central Plaza', doorX: 600, doorY: 250 }
// // // // // // //     ];

// // // // // // //     function drawLayout() {
// // // // // // //       clearCanvas();
// // // // // // //       drawGrid();
// // // // // // //       drawCorridor();

// // // // // // //       rooms.forEach(room => {
// // // // // // //         const isSelected = room.label === selectedRoom;
// // // // // // //         drawWalls(room.x, room.y, room.w, room.h, isSelected);
// // // // // // //         drawDoor(room.doorX, room.doorY, room.doorX === room.x, true);
// // // // // // //         drawRoomLabel(room.x, room.y, room.w, room.h, room.label, isSelected);
// // // // // // //       });

// // // // // // //       drawExitSign(50, 175);    // Left exit
// // // // // // //       drawExitSign(750, 175);   // Right exit
// // // // // // //       drawExitSign(375, 375);   // Bottom exit

// // // // // // //       if (showPath && selectedRoom && ageGroup) {
// // // // // // //         drawEvacuationPath(selectedRoom);
// // // // // // //       }
// // // // // // //     }

// // // // // // //     drawLayout();

// // // // // // //     canvas.onclick = (event) => {
// // // // // // //       const rect = canvas.getBoundingClientRect();
// // // // // // //       const x = (event.clientX - rect.left) / scale;
// // // // // // //       const y = (event.clientY - rect.top) / scale;

// // // // // // //       const clickedRoom = rooms.find(room => 
// // // // // // //         x >= room.x && x <= room.x + room.w &&
// // // // // // //         y >= room.y && y <= room.y + room.h
// // // // // // //       );

// // // // // // //       if (clickedRoom) {
// // // // // // //         setSelectedRoom(clickedRoom.label);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     return () => {
// // // // // // //       canvas.onclick = null;
// // // // // // //     };
    
// // // // // // //   }, [ageGroup, disease, showPath, dimensions, selectedRoom]);

// // // // // // //   return (
// // // // // // //     <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4">
// // // // // // //       <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
// // // // // // //         <select
// // // // // // //           value={ageGroup}
// // // // // // //           onChange={(e) => setAgeGroup(e.target.value)}
// // // // // // //           className="w-full sm:w-48 px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //         >
// // // // // // //           <option value="">Select Age Group</option>
// // // // // // //           <option value="youth">20-30</option>
// // // // // // //           <option value="middle aged">30-50</option>
// // // // // // //           <option value="elder">Above 50</option>
// // // // // // //         </select>
        
// // // // // // //         <select
// // // // // // //           value={disease}
// // // // // // //           onChange={(e) => setDisease(e.target.value)}
// // // // // // //           className="w-full sm:w-48 px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //         >
// // // // // // //           <option value="">Select Disease Condition</option>
// // // // // // //           <option value="none">None</option>
// // // // // // //           <option value="chronic">Chronic Disease</option>
// // // // // // //           <option value="temporary">Temporary Injury</option>       
// // // // // // //           <option value="respiratory disease">Respiratory disease</option>
// // // // // // //           <option value="cardic diseases">Cardic diseases</option>
// // // // // // //         </select>

// // // // // // //         <div className="text-sm text-gray-600">
// // // // // // //           Selected: {selectedRoom || 'No room selected'}
// // // // // // //         </div>
        
// // // // // // //         <button
// // // // // // //           onClick={() => {
// // // // // // //             if (!selectedRoom) {
// // // // // // //               alert('Please select a room first');
// // // // // // //               return;
// // // // // // //             }
// // // // // // //             if (!ageGroup || !disease) {
// // // // // // //               alert('Please select both age group and disease');
// // // // // // //               return;
// // // // // // //             }
// // // // // // //             setShowPath(true);
// // // // // // //           }}
// // // // // // //           className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
// // // // // // //           >
// // // // // // //             Show Evacuation Path
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         <div id="floor-plan-container" className="w-full aspect-[2/1] relative bg-gray-50 rounded-lg overflow-hidden">
// // // // // // //           <canvas
// // // // // // //             ref={canvasRef}
// // // // // // //             width={dimensions.width}
// // // // // // //             height={dimensions.height}
// // // // // // //             className="w-full h-full cursor-pointer"
// // // // // // //           />
// // // // // // //         </div>

// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   };
  
// // // // // // //   export default ITFloorPlan;
// // // // // // import React, { useEffect, useRef, useState } from "react";
// // // // // // import "./Building.css";

// // // // // // const ITFloorPlan = () => {
// // // // // //   const canvasRef = useRef(null);
// // // // // //   const [selectedRoom, setSelectedRoom] = useState("");
// // // // // //   const [ageGroup, setAgeGroup] = useState("");
// // // // // //   const [healthCondition, setHealthCondition] = useState("");
// // // // // //   const [showPath, setShowPath] = useState(false);
// // // // // //   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

// // // // // //   useEffect(() => {
// // // // // //     const updateDimensions = () => {
// // // // // //       const container = document.getElementById("floor-plan-container");
// // // // // //       if (container) {
// // // // // //         const { width } = container.getBoundingClientRect();
// // // // // //         setDimensions({
// // // // // //           width: Math.floor(width * 0.95),
// // // // // //           height: Math.floor((width * 0.95) * (1 / 2)),
// // // // // //         });
// // // // // //       }
// // // // // //     };
// // // // // //     updateDimensions();
// // // // // //     window.addEventListener("resize", updateDimensions);
// // // // // //     return () => window.removeEventListener("resize", updateDimensions);
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     if (dimensions.width === 0) return;
// // // // // //     const canvas = canvasRef.current;
// // // // // //     const ctx = canvas.getContext("2d");
// // // // // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // //     drawFloorPlan(ctx);
// // // // // //     if (showPath) drawEvacuationPath(ctx);
// // // // // //   }, [dimensions, selectedRoom, ageGroup, healthCondition, showPath]);

// // // // // //   // Define room positions
// // // // // //   const rooms = {
// // // // // //     "Room A": { x: 100, y: 120, width: 80, height: 60 },
// // // // // //     "Room B": { x: 250, y: 120, width: 80, height: 60 },
// // // // // //     "Room C": { x: 400, y: 120, width: 80, height: 60 },
// // // // // //   };

// // // // // //   // Define exit locations
// // // // // //   const exits = [
// // // // // //     { x: 50, y: 175 },
// // // // // //     { x: 750, y: 175 },
// // // // // //     { x: 375, y: 400 },
// // // // // //   ];

// // // // // //   // Function to draw rooms and exits
// // // // // //   const drawFloorPlan = (ctx) => {
// // // // // //     ctx.fillStyle = "#ddd";
// // // // // //     ctx.strokeStyle = "#000";
// // // // // //     ctx.lineWidth = 2;

// // // // // //     // Draw rooms
// // // // // //     Object.keys(rooms).forEach((room) => {
// // // // // //       const { x, y, width, height } = rooms[room];
// // // // // //       ctx.fillRect(x, y, width, height);
// // // // // //       ctx.strokeRect(x, y, width, height);
// // // // // //       ctx.fillStyle = "#000";
// // // // // //       ctx.fillText(room, x + 20, y + 35);
// // // // // //       ctx.fillStyle = "#ddd";
// // // // // //     });

// // // // // //     // Draw exits
// // // // // //     exits.forEach((exit, index) => {
// // // // // //       ctx.fillStyle = "#4CAF50";
// // // // // //       ctx.fillRect(exit.x - 10, exit.y - 10, 20, 20);
// // // // // //       ctx.fillStyle = "#fff";
// // // // // //       ctx.fillText(`Exit ${index + 1}`, exit.x - 15, exit.y - 15);
// // // // // //     });
// // // // // //   };

// // // // // //   // Function to get optimized evacuation path using WOA
// // // // // //   const getPathWOA = (startRoom) => {
// // // // // //     if (!startRoom) return [];

// // // // // //     const start = rooms[startRoom];
// // // // // //     if (!start) return [];

// // // // // //     // Modify distances based on age and health
// // // // // //     let weightFactor = 1;
// // // // // //     if (ageGroup === "Senior" || healthCondition === "Mobility Issues") {
// // // // // //       weightFactor = 1.5; // Prioritize shortest & easiest path
// // // // // //     }

// // // // // //     let bestExit = exits[0];
// // // // // //     let minDistance = Infinity;

// // // // // //     exits.forEach((exit) => {
// // // // // //       const distance =
// // // // // //         weightFactor *
// // // // // //         Math.sqrt(Math.pow(start.x - exit.x, 2) + Math.pow(start.y - exit.y, 2));

// // // // // //       if (distance < minDistance) {
// // // // // //         minDistance = distance;
// // // // // //         bestExit = exit;
// // // // // //       }
// // // // // //     });

// // // // // //     return [start, bestExit];
// // // // // //   };

// // // // // //   // Function to draw evacuation path
// // // // // //   const drawEvacuationPath = (ctx) => {
// // // // // //     if (!selectedRoom) return;
// // // // // //     const path = getPathWOA(selectedRoom);
// // // // // //     if (path.length < 2) return;

// // // // // //     ctx.strokeStyle = "#FF5733";
// // // // // //     ctx.lineWidth = 4;
// // // // // //     ctx.setLineDash([8, 4]);
// // // // // //     ctx.beginPath();
// // // // // //     ctx.moveTo(path[0].x + 40, path[0].y + 30); // Adjust to center of room
// // // // // //     ctx.lineTo(path[1].x, path[1].y);
// // // // // //     ctx.stroke();
// // // // // //     ctx.setLineDash([]);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div id="floor-plan-container">
// // // // // //       <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
// // // // // //       <div className="controls">
// // // // // //         <label>Select Room:</label>
// // // // // //         <select onChange={(e) => setSelectedRoom(e.target.value)}>
// // // // // //           <option value="">Select Room</option>
// // // // // //           <option value="Room A">Room A</option>
// // // // // //           <option value="Room B">Room B</option>
// // // // // //           <option value="Room C">Room C</option>
// // // // // //         </select>

// // // // // //         <label>Age Group:</label>
// // // // // //         <select onChange={(e) => setAgeGroup(e.target.value)}>
// // // // // //           <option value="">Select Age Group</option>
// // // // // //           <option value="Adult">Adult</option>
// // // // // //           <option value="Senior">Senior</option>
// // // // // //         </select>

// // // // // //         <label>Health Condition:</label>
// // // // // //         <select onChange={(e) => setHealthCondition(e.target.value)}>
// // // // // //           <option value="">Select Condition</option>
// // // // // //           <option value="Healthy">Healthy</option>
// // // // // //           <option value="Mobility Issues">Mobility Issues</option>
// // // // // //         </select>

// // // // // //         <button onClick={() => setShowPath(true)}>Show Path</button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ITFloorPlan;
// // // // // import React, { useEffect, useRef, useState } from "react";
// // // // // import "./Building.css";

// // // // // const ITFloorPlan = () => {
// // // // //   const canvasRef = useRef(null);
// // // // //   const [selectedRoom, setSelectedRoom] = useState("");
// // // // //   const [ageGroup, setAgeGroup] = useState("");
// // // // //   const [healthCondition, setHealthCondition] = useState("");
// // // // //   const [showPath, setShowPath] = useState(false);
// // // // //   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

// // // // //   useEffect(() => {
// // // // //     const updateDimensions = () => {
// // // // //       const container = document.getElementById("floor-plan-container");
// // // // //       if (container) {
// // // // //         const { width } = container.getBoundingClientRect();
// // // // //         setDimensions({
// // // // //           width: Math.floor(width * 0.95),
// // // // //           height: Math.floor((width * 0.95) * (1 / 2)),
// // // // //         });
// // // // //       }
// // // // //     };
// // // // //     updateDimensions();
// // // // //     window.addEventListener("resize", updateDimensions);
// // // // //     return () => window.removeEventListener("resize", updateDimensions);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (dimensions.width === 0) return;
// // // // //     const canvas = canvasRef.current;
// // // // //     const ctx = canvas.getContext("2d");
// // // // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // //     drawFloorPlan(ctx);
// // // // //     if (showPath) drawEvacuationPath(ctx);
// // // // //   }, [dimensions, selectedRoom, ageGroup, healthCondition, showPath]);

// // // // //   // Define room positions for IT office layout
// // // // //   const rooms = {
// // // // //     "Developer Room 1": { x: 100, y: 120, width: 120, height: 100 },
// // // // //     "Developer Room 2": { x: 250, y: 120, width: 120, height: 100 },
// // // // //     "Manager Room": { x: 400, y: 120, width: 120, height: 100 },
// // // // //     "Meeting Room": { x: 100, y: 250, width: 120, height: 100 },
// // // // //     "Cafeteria": { x: 250, y: 250, width: 120, height: 100 },
// // // // //     "Server Room": { x: 400, y: 250, width: 120, height: 100 },
// // // // //     "Reception": { x: 550, y: 120, width: 120, height: 100 },
// // // // //   };

// // // // //   // Define exit locations
// // // // //   const exits = [
// // // // //     { x: 50, y: 450 },
// // // // //     { x: 700, y: 450 },
// // // // //   ];

// // // // //   // Function to draw rooms and exits
// // // // //   const drawFloorPlan = (ctx) => {
// // // // //     ctx.fillStyle = "#ddd";
// // // // //     ctx.strokeStyle = "#000";
// // // // //     ctx.lineWidth = 2;

// // // // //     // Draw rooms
// // // // //     Object.keys(rooms).forEach((room) => {
// // // // //       const { x, y, width, height } = rooms[room];
// // // // //       ctx.fillRect(x, y, width, height);
// // // // //       ctx.strokeRect(x, y, width, height);
// // // // //       ctx.fillStyle = "#000";
// // // // //       ctx.fillText(room, x + 20, y + 35);
// // // // //       ctx.fillStyle = "#ddd";
// // // // //     });

// // // // //     // Draw exits
// // // // //     exits.forEach((exit, index) => {
// // // // //       ctx.fillStyle = "#4CAF50";
// // // // //       ctx.fillRect(exit.x - 10, exit.y - 10, 20, 20);
// // // // //       ctx.fillStyle = "#fff";
// // // // //       ctx.fillText(`Exit ${index + 1}`, exit.x - 15, exit.y - 15);
// // // // //     });
// // // // //   };

// // // // //   // Function to get optimized evacuation path using WOA
// // // // //   const getPathWOA = (startRoom) => {
// // // // //     if (!startRoom) return [];

// // // // //     const start = rooms[startRoom];
// // // // //     if (!start) return [];

// // // // //     // Modify distances based on age and health
// // // // //     let weightFactor = 1;
// // // // //     if (ageGroup === "Senior" || healthCondition === "Mobility Issues") {
// // // // //       weightFactor = 1.5; // Prioritize shortest & easiest path
// // // // //     }

// // // // //     let bestExit = exits[0];
// // // // //     let minDistance = Infinity;

// // // // //     exits.forEach((exit) => {
// // // // //       const distance =
// // // // //         weightFactor *
// // // // //         Math.sqrt(Math.pow(start.x - exit.x, 2) + Math.pow(start.y - exit.y, 2));

// // // // //       if (distance < minDistance) {
// // // // //         minDistance = distance;
// // // // //         bestExit = exit;
// // // // //       }
// // // // //     });

// // // // //     return [start, bestExit];
// // // // //   };

// // // // //   // Function to draw evacuation path
// // // // //   const drawEvacuationPath = (ctx) => {
// // // // //     if (!selectedRoom) return;
// // // // //     const path = getPathWOA(selectedRoom);
// // // // //     if (path.length < 2) return;

// // // // //     ctx.strokeStyle = "#FF5733";
// // // // //     ctx.lineWidth = 4;
// // // // //     ctx.setLineDash([8, 4]);
// // // // //     ctx.beginPath();
// // // // //     ctx.moveTo(path[0].x + 60, path[0].y + 50); // Adjust to center of room
// // // // //     ctx.lineTo(path[1].x, path[1].y);
// // // // //     ctx.stroke();
// // // // //     ctx.setLineDash([]);
// // // // //   };

// // // // //   return (
// // // // //     <div id="floor-plan-container">
// // // // //       <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
// // // // //       <div className="controls">
// // // // //         <label>Select Room:</label>
// // // // //         <select onChange={(e) => setSelectedRoom(e.target.value)}>
// // // // //           <option value="">Select Room</option>
// // // // //           {Object.keys(rooms).map((room) => (
// // // // //             <option key={room} value={room}>{room}</option>
// // // // //           ))}
// // // // //         </select>

// // // // //         <label>Age Group:</label>
// // // // //         <select onChange={(e) => setAgeGroup(e.target.value)}>
// // // // //           <option value="">Select Age Group</option>
// // // // //           <option value="Adult">Adult</option>
// // // // //           <option value="Senior">Senior</option>
// // // // //         </select>

// // // // //         <label>Health Condition:</label>
// // // // //         <select onChange={(e) => setHealthCondition(e.target.value)}>
// // // // //           <option value="">Select Condition</option>
// // // // //           <option value="Healthy">Healthy</option>
// // // // //           <option value="Mobility Issues">Mobility Issues</option>
// // // // //         </select>

// // // // //         <button onClick={() => setShowPath(true)}>Show Path</button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ITFloorPlan;



// // //  best output
// // // import React, { useEffect, useRef, useState } from "react";
// // // import "./Building.css";

// // // const ITFloorPlan = () => {
// // //   const canvasRef = useRef(null);
// // //   const [selectedRoom, setSelectedRoom] = useState("");
// // //   const [ageGroup, setAgeGroup] = useState("");
// // //   const [healthCondition, setHealthCondition] = useState("");
// // //   const [showPath, setShowPath] = useState(false);
// // //   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

// // //   // Updated room and exit layout
// // //   const rooms = {
// // //     "Developer Room 1": { x: 100, y: 120, width: 120, height: 100, door: { x: 220, y: 170 } },
// // //     "Developer Room 2": { x: 250, y: 120, width: 120, height: 100, door: { x: 310, y: 170 } },
// // //     "Manager Room": { x: 400, y: 120, width: 120, height: 100, door: { x: 460, y: 170 } },
// // //     "Meeting Room": { x: 100, y: 250, width: 120, height: 100, door: { x: 220, y: 300 } },
// // //     "Cafeteria": { x: 250, y: 250, width: 120, height: 100, door: { x: 310, y: 300 } },
// // //     "Server Room": { x: 400, y: 250, width: 120, height: 100, door: { x: 460, y: 300 } },
// // //     "Reception": { x: 550, y: 120, width: 120, height: 100, door: { x: 610, y: 170 } }
// // //   };

// // //   // Added more strategic exit points
// // //   const exits = [
// // //     { x: 50, y: 100, label: "North Exit" },
// // //     { x: 50, y: 350, label: "West Exit" },
// // //     { x: 700, y: 100, label: "East Exit 1" },
// // //     { x: 700, y: 350, label: "East Exit 2" },
// // //     { x: 400, y: 450, label: "South Exit" }
// // //   ];

// // //   const corridors = [
// // //     { start: { x: 50, y: 200 }, end: { x: 700, y: 200 } }, // Horizontal corridor
// // //     { start: { x: 400, y: 50 }, end: { x: 400, y: 450 } }  // Vertical corridor
// // //   ];

// // //   const findOptimalPath = (startRoom) => {
// // //     if (!startRoom) return [];

// // //     const start = rooms[startRoom].door;
// // //     let bestExit = exits[0];
// // //     let minDistance = Infinity;

// // //     // Path finding logic considering obstacles
// // //     exits.forEach((exit) => {
// // //       const distance = calculatePathDistance(start, exit);
// // //       if (distance < minDistance) {
// // //         minDistance = distance;
// // //         bestExit = exit;
// // //       }
// // //     });

// // //     // Generate waypoints avoiding room intersections
// // //     const waypoints = generateSafePath(start, bestExit);
// // //     return [...waypoints, bestExit];
// // //   };

// // //   const calculatePathDistance = (start, end) => {
// // //     // Calculate distance considering corridor paths
// // //     const directDistance = Math.sqrt(
// // //       Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)
// // //     );
// // //     return directDistance;
// // //   };

// // //   const generateSafePath = (start, end) => {
// // //     // Strategic waypoint generation
// // //     const waypoints = [
// // //       { x: start.x, y: 200 }, // Move to horizontal corridor
// // //       { x: end.x, y: 200 }    // Move to exit corridor
// // //     ];
// // //     return waypoints;
// // //   };

// // //   const drawFloorPlan = (ctx) => {
// // //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
// // //     // Draw corridors
// // //     ctx.strokeStyle = "#e0e0e0";
// // //     ctx.lineWidth = 10;
// // //     corridors.forEach(corridor => {
// // //       ctx.beginPath();
// // //       ctx.moveTo(corridor.start.x, corridor.start.y);
// // //       ctx.lineTo(corridor.end.x, corridor.end.y);
// // //       ctx.stroke();
// // //     });

// // //     // Draw rooms
// // //     Object.entries(rooms).forEach(([roomName, room]) => {
// // //       ctx.fillStyle = "#f0f0f0";
// // //       ctx.fillRect(room.x, room.y, room.width, room.height);
// // //       ctx.strokeStyle = "#333";
// // //       ctx.strokeRect(room.x, room.y, room.width, room.height);
      
// // //       // Room label
// // //       ctx.fillStyle = "#000";
// // //       ctx.font = "12px Arial";
// // //       ctx.fillText(roomName, room.x + 10, room.y + 20);
      
// // //       // Room door
// // //       ctx.fillStyle = "#8BC34A";
// // //       ctx.fillRect(room.door.x - 5, room.door.y - 5, 10, 10);
// // //     });

// // //     // Draw exits
// // //     exits.forEach(exit => {
// // //       ctx.fillStyle = "#FF5722";
// // //       ctx.beginPath();
// // //       ctx.arc(exit.x, exit.y, 10, 0, Math.PI * 2);
// // //       ctx.fill();
      
// // //       ctx.fillStyle = "#000";
// // //       ctx.fillText(exit.label, exit.x + 10, exit.y);
// // //     });
// // //   };

// // //   const drawEvacuationPath = (ctx) => {
// // //     if (!selectedRoom) return;

// // //     const path = findOptimalPath(selectedRoom);
    
// // //     ctx.beginPath();
// // //     ctx.moveTo(path[0].x, path[0].y);
    
// // //     ctx.strokeStyle = "#FF5733";
// // //     ctx.lineWidth = 4;
// // //     ctx.setLineDash([8, 4]);
    
// // //     path.slice(1).forEach(point => {
// // //       ctx.lineTo(point.x, point.y);
// // //     });
    
// // //     ctx.stroke();
// // //     ctx.setLineDash([]);
// // //   };

// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");
// // //     canvas.width = 750;
// // //     canvas.height = 500;
    
// // //     drawFloorPlan(ctx);
// // //     if (showPath) drawEvacuationPath(ctx);
// // //   }, [selectedRoom, showPath]);

// // //   return (
// // //     <div>
// // //       <canvas 
// // //         ref={canvasRef} 
// // //         style={{border: "1px solid #ccc"}}
// // //       />
// // //       <div>
// // //         <select onChange={(e) => setSelectedRoom(e.target.value)}>
// // //           <option value="">Select Room</option>
// // //           {Object.keys(rooms).map(room => (
// // //             <option key={room} value={room}>{room}</option>
// // //           ))}
// // //         </select>
// // //         <button onClick={() => setShowPath(true)}>Show Evacuation Path</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ITFloorPlan;
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { AlertTriangle, MapPin, Navigation } from 'lucide-react';

// // // const EvacuationFloorPlan = () => {
// // //   const [selectedRoom, setSelectedRoom] = useState('');
// // //   const [ageGroup, setAgeGroup] = useState('');
// // //   const [healthCondition, setHealthCondition] = useState('');
// // //   const [evacuationPath, setEvacuationPath] = useState([]);

// // //   // Rooms with detailed positioning
// // //   const rooms = {
// // //     'Developer Zone': { 
// // //       x: 100, y: 150, 
// // //       width: 200, height: 120, 
// // //       door: { x: 250, y: 270 },
// // //       riskFactor: 1.2
// // //     },
// // //     'Management Area': { 
// // //       x: 350, y: 150, 
// // //       width: 200, height: 120, 
// // //       door: { x: 450, y: 270 },
// // //       riskFactor: 1.0
// // //     },
// // //     'Server Room': { 
// // //       x: 600, y: 150, 
// // //       width: 150, height: 120, 
// // //       door: { x: 675, y: 270 },
// // //       riskFactor: 1.5
// // //     },
// // //     'Conference Center': { 
// // //       x: 100, y: 300, 
// // //       width: 200, height: 120, 
// // //       door: { x: 250, y: 300 },
// // //       riskFactor: 1.1
// // //     },
// // //     'Training Hall': { 
// // //       x: 350, y: 300, 
// // //       width: 200, height: 120, 
// // //       door: { x: 450, y: 300 },
// // //       riskFactor: 1.0
// // //     }
// // //   };

// // //   const exits = [
// // //     { x: 50, y: 200, label: 'North Exit', capacity: 50 },
// // //     { x: 750, y: 200, label: 'East Exit', capacity: 75 },
// // //     { x: 400, y: 500, label: 'Main Exit', capacity: 100 }
// // //   ];

// // //   const calculateEvacuationPath = () => {
// // //     if (!selectedRoom || !ageGroup || !healthCondition) return [];

// // //     // WOA-inspired path optimization
// // //     const startRoom = rooms[selectedRoom];
    
// // //     // Age and health condition weights
// // //     const ageWeight = {
// // //       'Young': 0.8,
// // //       'Middle-Aged': 1.0,
// // //       'Senior': 1.3
// // //     };

// // //     const healthWeight = {
// // //       'Fit': 0.9,
// // //       'Limited Mobility': 1.4,
// // //       'Critical Condition': 1.6
// // //     };

// // //     const optimalExit = exits.reduce((best, exit) => {
// // //       const distance = Math.sqrt(
// // //         Math.pow(startRoom.door.x - exit.x, 2) + 
// // //         Math.pow(startRoom.door.y - exit.y, 2)
// // //       );

// // //       const complexityScore = 
// // //         distance * 
// // //         startRoom.riskFactor * 
// // //         ageWeight[ageGroup] * 
// // //         healthWeight[healthCondition];

// // //       return complexityScore < best.score ? 
// // //         { exit, score: complexityScore } : 
// // //         best;
// // //     }, { exit: exits[0], score: Infinity });

// // //     return [
// // //       { x: startRoom.door.x, y: startRoom.door.y },
// // //       { x: optimalExit.exit.x, y: optimalExit.exit.y }
// // //     ];
// // //   };

// // //   const handleShowPath = () => {
// // //     const path = calculateEvacuationPath();
// // //     setEvacuationPath(path);
// // //   };

// // //   return (
// // //     <div className="bg-slate-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
// // //       <div className="grid grid-cols-3 gap-4 mb-6">
// // //         <select 
// // //           value={selectedRoom}
// // //           onChange={(e) => setSelectedRoom(e.target.value)}
// // //           className="p-2 border rounded bg-white"
// // //         >
// // //           <option value="">Select Room</option>
// // //           {Object.keys(rooms).map(room => (
// // //             <option key={room} value={room}>{room}</option>
// // //           ))}
// // //         </select>

// // //         <select 
// // //           value={ageGroup}
// // //           onChange={(e) => setAgeGroup(e.target.value)}
// // //           className="p-2 border rounded bg-white"
// // //         >
// // //           <option value="">Age Group</option>
// // //           <option value="Young">Young</option>
// // //           <option value="Middle-Aged">Middle-Aged</option>
// // //           <option value="Senior">Senior</option>
// // //         </select>

// // //         <select 
// // //           value={healthCondition}
// // //           onChange={(e) => setHealthCondition(e.target.value)}
// // //           className="p-2 border rounded bg-white"
// // //         >
// // //           <option value="">Health Condition</option>
// // //           <option value="Fit">Fit</option>
// // //           <option value="Limited Mobility">Limited Mobility</option>
// // //           <option value="Critical Condition">Critical Condition</option>
// // //         </select>
// // //       </div>

// // //       <button 
// // //         onClick={handleShowPath}
// // //         disabled={!selectedRoom || !ageGroup || !healthCondition}
// // //         className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
// // //       >
// // //         <Navigation className="inline mr-2" /> Calculate Evacuation Path
// // //       </button>

// // //       {evacuationPath.length > 0 && (
// // //         <div className="mt-4 bg-green-50 p-4 rounded flex items-center">
// // //           <AlertTriangle className="text-green-500 mr-3" />
// // //           <p>Optimal evacuation path calculated based on your profile.</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EvacuationFloorPlan;
// // import React, { useState } from 'react';
// // import { AlertTriangle, MapPin, Navigation } from 'lucide-react';

// // const EvacuationFloorPlan = () => {
// //   const [selectedRoom, setSelectedRoom] = useState('');
// //   const [ageGroup, setAgeGroup] = useState('');
// //   const [healthCondition, setHealthCondition] = useState('');
// //   const [evacuationPath, setEvacuationPath] = useState([]);

// //   // Rooms with detailed positioning
// //   const rooms = {
// //     'Developer Zone': { 
// //       x: 100, y: 150, 
// //       width: 200, height: 120, 
// //       door: { x: 250, y: 270 },
// //       riskFactor: 1.2
// //     },
// //     'Management Area': { 
// //       x: 350, y: 150, 
// //       width: 200, height: 120, 
// //       door: { x: 450, y: 270 },
// //       riskFactor: 1.0
// //     },
// //     'Server Room': { 
// //       x: 600, y: 150, 
// //       width: 150, height: 120, 
// //       door: { x: 675, y: 270 },
// //       riskFactor: 1.5
// //     },
// //     'Conference Center': { 
// //       x: 100, y: 300, 
// //       width: 200, height: 120, 
// //       door: { x: 250, y: 300 },
// //       riskFactor: 1.1
// //     },
// //     'Training Hall': { 
// //       x: 350, y: 300, 
// //       width: 200, height: 120, 
// //       door: { x: 450, y: 300 },
// //       riskFactor: 1.0
// //     }
// //   };

// //   const exits = [
// //     { x: 50, y: 200, label: 'North Exit', capacity: 50 },
// //     { x: 750, y: 200, label: 'East Exit', capacity: 75 },
// //     { x: 400, y: 500, label: 'Main Exit', capacity: 100 }
// //   ];

// //   const calculateEvacuationPath = () => {
// //     if (!selectedRoom || !ageGroup || !healthCondition) return [];

// //     // WOA-inspired path optimization
// //     const startRoom = rooms[selectedRoom];
    
// //     // Age and health condition weights
// //     const ageWeight = {
// //       'Young': 0.8,
// //       'Middle-Aged': 1.0,
// //       'Senior': 1.3
// //     };

// //     const healthWeight = {
// //       'Fit': 0.9,
// //       'Limited Mobility': 1.4,
// //       'Critical Condition': 1.6
// //     };

// //     const optimalExit = exits.reduce((best, exit) => {
// //       const distance = Math.sqrt(
// //         Math.pow(startRoom.door.x - exit.x, 2) + 
// //         Math.pow(startRoom.door.y - exit.y, 2)
// //       );

// //       const complexityScore = 
// //         distance * 
// //         startRoom.riskFactor * 
// //         ageWeight[ageGroup] * 
// //         healthWeight[healthCondition];

// //       return complexityScore < best.score ? 
// //         { exit, score: complexityScore } : 
// //         best;
// //     }, { exit: exits[0], score: Infinity });

// //     return [
// //       { x: startRoom.door.x, y: startRoom.door.y },
// //       { x: optimalExit.exit.x, y: optimalExit.exit.y }
// //     ];
// //   };

// //   const handleShowPath = () => {
// //     const path = calculateEvacuationPath();
// //     setEvacuationPath(path);
// //   };

// //   return (
// //     <div className="bg-slate-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
// //       <div className="grid grid-cols-3 gap-4 mb-6">
// //         <select 
// //           value={selectedRoom}
// //           onChange={(e) => setSelectedRoom(e.target.value)}
// //           className="p-2 border rounded bg-white"
// //         >
// //           <option value="">Select Room</option>
// //           {Object.keys(rooms).map(room => (
// //             <option key={room} value={room}>{room}</option>
// //           ))}
// //         </select>

// //         <select 
// //           value={ageGroup}
// //           onChange={(e) => setAgeGroup(e.target.value)}
// //           className="p-2 border rounded bg-white"
// //         >
// //           <option value="">Age Group</option>
// //           <option value="Young">Young</option>
// //           <option value="Middle-Aged">Middle-Aged</option>
// //           <option value="Senior">Senior</option>
// //         </select>

// //         <select 
// //           value={healthCondition}
// //           onChange={(e) => setHealthCondition(e.target.value)}
// //           className="p-2 border rounded bg-white"
// //         >
// //           <option value="">Health Condition</option>
// //           <option value="Fit">Fit</option>
// //           <option value="Limited Mobility">Limited Mobility</option>
// //           <option value="Critical Condition">Critical Condition</option>
// //         </select>
// //       </div>

// //       <button 
// //         onClick={handleShowPath}
// //         disabled={!selectedRoom || !ageGroup || !healthCondition}
// //         className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
// //       >
// //         <Navigation className="inline mr-2" /> Calculate Evacuation Path
// //       </button>

// //       <div className="relative mt-6">
// //         {/* Render Rooms */}
// //         {Object.keys(rooms).map((roomName) => {
// //           const room = rooms[roomName];
// //           return (
// //             <div 
// //               key={roomName} 
// //               className="absolute bg-blue-300 opacity-75 rounded-lg"
// //               style={{
// //                 left: room.x,
// //                 top: room.y,
// //                 width: room.width,
// //                 height: room.height,
// //               }}
// //             >
// //               <span className="absolute bottom-2 left-2 text-white">{roomName}</span>
// //             </div>
// //           );
// //         })}

// //         {/* Render Exits */}
// //         {exits.map((exit, index) => (
// //           <div 
// //             key={index} 
// //             className="absolute bg-red-500 rounded-full"
// //             style={{
// //               left: exit.x - 10,
// //               top: exit.y - 10,
// //               width: 20,
// //               height: 20,
// //             }}
// //           >
// //             <span className="absolute bottom-2 left-2 text-white text-xs">{exit.label}</span>
// //           </div>
// //         ))}

// //         {/* Render Evacuation Path */}
// //         {evacuationPath.length > 0 && (
// //           <svg className="absolute top-0 left-0 w-full h-full">
// //             <line
// //               x1={evacuationPath[0].x}
// //               y1={evacuationPath[0].y}
// //               x2={evacuationPath[1].x}
// //               y2={evacuationPath[1].y}
// //               stroke="green"
// //               strokeWidth="3"
// //             />
// //           </svg>
// //         )}
// //       </div>

// //       {evacuationPath.length > 0 && (
// //         <div className="mt-4 bg-green-50 p-4 rounded flex items-center">
// //           <AlertTriangle className="text-green-500 mr-3" />
// //           <p>Optimal evacuation path calculated based on your profile.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EvacuationFloorPlan;
// import React, { useEffect, useRef, useState } from "react";
// import "./Building.css";

// const ITFloorPlan = () => {
//   const canvasRef = useRef(null);
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [ageGroup, setAgeGroup] = useState("");
//   const [healthCondition, setHealthCondition] = useState("");
//   const [showPath, setShowPath] = useState(false);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   // Updated room and exit layout
//   const rooms = {
//     "Developer Room 1": { x: 100, y: 120, width: 120, height: 100, door: { x: 220, y: 170 } },
//     "Developer Room 2": { x: 250, y: 120, width: 120, height: 100, door: { x: 310, y: 170 } },
//     "Manager Room": { x: 400, y: 120, width: 120, height: 100, door: { x: 460, y: 170 } },
//     "Meeting Room": { x: 100, y: 250, width: 120, height: 100, door: { x: 220, y: 300 } },
//     "Cafeteria": { x: 250, y: 250, width: 120, height: 100, door: { x: 310, y: 300 } },
//     "Server Room": { x: 400, y: 250, width: 120, height: 100, door: { x: 460, y: 300 } },
//     "Reception": { x: 550, y: 120, width: 120, height: 100, door: { x: 610, y: 170 } }
//   };

//   // Added more strategic exit points
//   const exits = [
//     { x: 50, y: 100, label: "North Exit" },
//     { x: 50, y: 350, label: "West Exit" },
//     { x: 700, y: 100, label: "East Exit 1" },
//     { x: 700, y: 350, label: "East Exit 2" },
//     { x: 400, y: 450, label: "South Exit" }
//   ];

//   const corridors = [
//     { start: { x: 50, y: 200 }, end: { x: 700, y: 200 } }, // Horizontal corridor
//     { start: { x: 400, y: 50 }, end: { x: 400, y: 450 } }  // Vertical corridor
//   ];

//   // Modify this function to adjust based on age group and health condition
//   const findOptimalPath = (startRoom) => {
//     if (!startRoom) return [];

//     const start = rooms[startRoom].door;
//     let bestExit = exits[0];
//     let minDistance = Infinity;

//     // Adjust pathfinding based on age group or health condition
//     const adjustedExits = adjustExitsBasedOnHealth(ageGroup, healthCondition);

//     adjustedExits.forEach((exit) => {
//       const distance = calculatePathDistance(start, exit);
//       if (distance < minDistance) {
//         minDistance = distance;
//         bestExit = exit;
//       }
//     });

//     // Generate waypoints avoiding room intersections
//     const waypoints = generateSafePath(start, bestExit);
//     return [...waypoints, bestExit];
//   };

//   const adjustExitsBasedOnHealth = (ageGroup, healthCondition) => {
//     // Logic to adjust exits based on age and health condition
//     // Example: elderly or health-sensitive people might need to take a different route
//     if (ageGroup === "Elderly" || healthCondition === "Health-Sensitive") {
//       return exits.filter(exit => exit.label !== "West Exit");  // Example: avoid some exits for elderly or health-sensitive people
//     }
//     return exits;  // If no special condition, return all exits
//   };

//   const calculatePathDistance = (start, end) => {
//     // Calculate distance considering corridor paths
//     const directDistance = Math.sqrt(
//       Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)
//     );
//     return directDistance;
//   };

//   const generateSafePath = (start, end) => {
//     // Strategic waypoint generation
//     const waypoints = [
//       { x: start.x, y: 200 }, // Move to horizontal corridor
//       { x: end.x, y: 200 }    // Move to exit corridor
//     ];
//     return waypoints;
//   };

//   const drawFloorPlan = (ctx) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
//     // Draw corridors
//     ctx.strokeStyle = "#e0e0e0";
//     ctx.lineWidth = 10;
//     corridors.forEach(corridor => {
//       ctx.beginPath();
//       ctx.moveTo(corridor.start.x, corridor.start.y);
//       ctx.lineTo(corridor.end.x, corridor.end.y);
//       ctx.stroke();
//     });

//     // Draw rooms
//     Object.entries(rooms).forEach(([roomName, room]) => {
//       ctx.fillStyle = "#f0f0f0";
//       ctx.fillRect(room.x, room.y, room.width, room.height);
//       ctx.strokeStyle = "#333";
//       ctx.strokeRect(room.x, room.y, room.width, room.height);
      
//       // Room label
//       ctx.fillStyle = "#000";
//       ctx.font = "12px Arial";
//       ctx.fillText(roomName, room.x + 10, room.y + 20);
      
//       // Room door
//       ctx.fillStyle = "#8BC34A";
//       ctx.fillRect(room.door.x - 5, room.door.y - 5, 10, 10);
//     });

//     // Draw exits
//     exits.forEach(exit => {
//       ctx.fillStyle = "#FF5722";
//       ctx.beginPath();
//       ctx.arc(exit.x, exit.y, 10, 0, Math.PI * 2);
//       ctx.fill();
      
//       ctx.fillStyle = "#000";
//       ctx.fillText(exit.label, exit.x + 10, exit.y);
//     });
//   };

//   const drawEvacuationPath = (ctx) => {
//     if (!selectedRoom) return;

//     const path = findOptimalPath(selectedRoom);
    
//     ctx.beginPath();
//     ctx.moveTo(path[0].x, path[0].y);
    
//     ctx.strokeStyle = "#FF5733";
//     ctx.lineWidth = 4;
//     ctx.setLineDash([8, 4]);
    
//     path.slice(1).forEach(point => {
//       ctx.lineTo(point.x, point.y);
//     });
    
//     ctx.stroke();
//     ctx.setLineDash([]);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = 750;
//     canvas.height = 500;
    
//     drawFloorPlan(ctx);
//     if (showPath) drawEvacuationPath(ctx);
//   }, [selectedRoom, showPath, ageGroup, healthCondition]);

//   return (
//     <div>
//       <canvas 
//         ref={canvasRef} 
//         style={{border: "1px solid #ccc"}}
//       />
//       <div>
//         <select onChange={(e) => setSelectedRoom(e.target.value)}>
//           <option value="">Select Room</option>
//           {Object.keys(rooms).map(room => (
//             <option key={room} value={room}>{room}</option>
//           ))}
//         </select>

//         <select onChange={(e) => setAgeGroup(e.target.value)}>
//           <option value="">Select Age Group</option>
//           <option value="Adult">Adult</option>
//           <option value="Elderly">Elderly</option>
//         </select>

//         <select onChange={(e) => setHealthCondition(e.target.value)}>
//           <option value="">Select Health Condition</option>
//           <option value="Healthy">Healthy</option>
//           <option value="Health-Sensitive">Health-Sensitive</option>
//         </select>

//         <button onClick={() => setShowPath(true)}>Show Evacuation Path</button>
//       </div>
//     </div>
//   );
// };

// export default ITFloorPlan;
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
