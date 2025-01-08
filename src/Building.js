// import React, { useEffect, useRef, useState } from 'react';

// const ITFloorPlan = () => {
//   const canvasRef = useRef(null);
//   const [selectedOffice, setSelectedOffice] = useState('');
//   const [showPath, setShowPath] = useState(false);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const updateDimensions = () => {
//       const container = document.getElementById('floor-plan-container');
//       if (container) {
//         const { width } = container.getBoundingClientRect();
//         setDimensions({
//           width: Math.floor(width * 0.95),
//           height: Math.floor((width * 0.95) * (2/3)) // Adjusted for L shape
//         });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   useEffect(() => {
//     if (dimensions.width === 0) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
    
//     const scale = dimensions.width / 1000;
//     const WALL_THICKNESS = Math.floor(6 * scale);
//     const DOOR_WIDTH = Math.floor(24 * scale);
//     const GRID_SIZE = Math.floor(16 * scale);
//     const VERANDA_WIDTH = Math.floor(80 * scale);

//     function clearCanvas() {
//       ctx.fillStyle = '#f8fafc';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }

//     function drawGrid() {
//       ctx.strokeStyle = '#e2e8f0';
//       ctx.lineWidth = 0.5;
//       for (let i = 0; i < canvas.width; i += GRID_SIZE) {
//         ctx.beginPath();
//         ctx.moveTo(i, 0);
//         ctx.lineTo(i, canvas.height);
//         ctx.stroke();
//       }
//       for (let i = 0; i < canvas.height; i += GRID_SIZE) {
//         ctx.beginPath();
//         ctx.moveTo(0, i);
//         ctx.lineTo(canvas.width, i);
//         ctx.stroke();
//       }
//     }

//     function drawWalls(x, y, width, height, isSelected) {
//       ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
//       ctx.shadowBlur = 5;
//       ctx.shadowOffsetX = 2;
//       ctx.shadowOffsetY = 2;
      
//       ctx.fillStyle = isSelected ? '#3b82f6' : '#334155';
//       ctx.fillRect(x * scale, y * scale, width * scale, WALL_THICKNESS);
//       ctx.fillRect(x * scale, y * scale, WALL_THICKNESS, height * scale);
//       ctx.fillRect(x * scale + width * scale - WALL_THICKNESS, y * scale, WALL_THICKNESS, height * scale);
//       ctx.fillRect(x * scale, y * scale + height * scale - WALL_THICKNESS, width * scale, WALL_THICKNESS);
      
//       if (isSelected) {
//         ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
//         ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
//       }
      
//       ctx.shadowColor = 'transparent';
//       ctx.shadowBlur = 0;
//       ctx.shadowOffsetX = 0;
//       ctx.shadowOffsetY = 0;
//     }

//     function drawDoor(x, y, isHorizontal = true) {
//       ctx.strokeStyle = '#334155';
//       ctx.lineWidth = 2;
//       if (isHorizontal) {
//         ctx.clearRect(x * scale, y * scale - WALL_THICKNESS / 2, DOOR_WIDTH, WALL_THICKNESS);
//       } else {
//         ctx.clearRect(x * scale - WALL_THICKNESS / 2, y * scale, WALL_THICKNESS, DOOR_WIDTH);
//       }
//     }

//     function drawVeranda(x, y, width, height) {
//       ctx.fillStyle = 'rgba(203, 213, 225, 0.3)';
//       ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
      
//       // Draw pattern to indicate veranda
//       ctx.strokeStyle = '#cbd5e1';
//       ctx.lineWidth = 1;
//       ctx.setLineDash([5, 5]);
      
//       for (let i = 0; i < width; i += 20) {
//         ctx.beginPath();
//         ctx.moveTo((x + i) * scale, y * scale);
//         ctx.lineTo((x + i) * scale, (y + height) * scale);
//         ctx.stroke();
//       }
      
//       ctx.setLineDash([]);
//     }

//     function drawOfficeLabel(x, y, width, height, label, isSelected) {
//       ctx.font = `${Math.floor(14 * scale)}px sans-serif`;
//       ctx.fillStyle = isSelected ? '#1d4ed8' : '#1e293b';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       const lines = label.split('\n');
//       lines.forEach((line, index) => {
//         const yOffset = (index - (lines.length - 1) / 2) * 20;
//         ctx.fillText(line, (x + width/2) * scale, (y + height/2 + yOffset) * scale);
//       });
//     }

//     function drawExitSign(x, y) {
//       const size = 32 * scale;
//       ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
//       ctx.fillRect((x - size/2) * scale, (y - size/2) * scale, size, size);
//       ctx.strokeStyle = '#ef4444';
//       ctx.lineWidth = 2;
//       ctx.strokeRect((x - size/2) * scale, (y - size/2) * scale, size, size);
//       ctx.font = `${Math.floor(12 * scale)}px sans-serif`;
//       ctx.fillStyle = '#ef4444';
//       ctx.textAlign = 'center';
//       ctx.fillText('EXIT', x * scale, y * scale);
//     }

//     const offices = [
//       // Left wing
//       { x: 50, y: 50, w: 200, h: 150, label: 'TechCorp\nSoftware Solutions', doorX: 150, doorY: 200 },
//       { x: 50, y: 250, w: 200, h: 150, label: 'DataFlow\nAnalytics', doorX: 150, doorY: 250 },
      
//       // Right wing
//       { x: 330, y: 50, w: 200, h: 150, label: 'CloudNet\nServices', doorX: 430, doorY: 200 },
//       { x: 330, y: 250, w: 200, h: 150, label: 'SecureIT\nConsulting', doorX: 430, doorY: 250 },
      
//       // Bottom wing (L-shape)
//       { x: 580, y: 250, w: 200, h: 150, label: 'InnoTech\nSolutions', doorX: 680, doorY: 250 },
//       { x: 580, y: 450, w: 200, h: 150, label: 'Digital\nDynamics', doorX: 680, doorY: 450 }
//     ];

//     function drawLayout() {
//       clearCanvas();
//       drawGrid();

//       // Draw veranda
//       drawVeranda(270, 50, 40, 550); // Vertical veranda
//       drawVeranda(270, 450, 510, 40); // Horizontal veranda

//       offices.forEach(office => {
//         const isSelected = office.label === selectedOffice;
//         drawWalls(office.x, office.y, office.w, office.h, isSelected);
//         drawDoor(office.doorX, office.doorY, true);
//         drawOfficeLabel(office.x, office.y, office.w, office.h, office.label, isSelected);
//       });

//       // Draw exits
//       drawExitSign(290, 25);  // Top exit
//       drawExitSign(800, 470); // Right exit
//       drawExitSign(250, 470); // Bottom exit
//     }

//     drawLayout();

//     canvas.onclick = (event) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = (event.clientX - rect.left) / scale;
//       const y = (event.clientY - rect.top) / scale;

//       const clickedOffice = offices.find(office => 
//         x >= office.x && x <= office.x + office.w &&
//         y >= office.y && y <= office.y + office.h
//       );

//       if (clickedOffice) {
//         setSelectedOffice(clickedOffice.label);
//       }
//     };

//     return () => {
//       canvas.onclick = null;
//     };
//   }, [showPath, dimensions, selectedOffice]);

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4">
//       <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
//         <div className="text-sm text-gray-600">
//           Selected: {selectedOffice || 'No office selected'}
//         </div>
//       </div>
//       <div id="floor-plan-container" className="w-full aspect-[3/2] relative bg-gray-50 rounded-lg overflow-hidden">
//         <canvas
//           ref={canvasRef}
//           width={dimensions.width}
//           height={dimensions.height}
//           className="w-full h-full cursor-pointer"
//         />
//       </div>
//       <div className="mt-4 text-sm text-gray-500 text-center">
//         Click on an office to select it. The veranda connects all offices and provides access to multiple exits.
//       </div>
//     </div>
//   );
// };

// export default ITFloorPlan;



// import React, { useEffect, useRef, useState } from 'react';

// const FloorPlan = () => {
//   const canvasRef = useRef(null);
//   const [selectedRoom, setSelectedRoom] = useState('');
//   const [ageGroup, setAgeGroup] = useState('');
//   const [showPath, setShowPath] = useState(false);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const updateDimensions = () => {
//       const container = document.getElementById('floor-plan-container');
//       if (container) {
//         const { width } = container.getBoundingClientRect();
//         setDimensions({
//           width: Math.floor(width * 0.95),
//           height: Math.floor((width * 0.95) * (1/2)) // Changed to 1/2 for more compact layout
//         });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   useEffect(() => {
//     if (dimensions.width === 0) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
    
//     const scale = dimensions.width / 800; // Reduced from 1200 to 800 for compactness
//     const WALL_THICKNESS = Math.floor(6 * scale);
//     const DOOR_WIDTH = Math.floor(24 * scale);
//     const GRID_SIZE = Math.floor(16 * scale);

//     function clearCanvas() {
//       ctx.fillStyle = '#f8fafc';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }

//     function drawGrid() {
//       ctx.strokeStyle = '#e2e8f0';
//       ctx.lineWidth = 0.5;
//       for (let i = 0; i < canvas.width; i += GRID_SIZE) {
//         ctx.beginPath();
//         ctx.moveTo(i, 0);
//         ctx.lineTo(i, canvas.height);
//         ctx.stroke();
//       }
//       for (let i = 0; i < canvas.height; i += GRID_SIZE) {
//         ctx.beginPath();
//         ctx.moveTo(0, i);
//         ctx.lineTo(canvas.width, i);
//         ctx.stroke();
//       }
//     }

//     function drawWalls(x, y, width, height, isSelected) {
//       ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
//       ctx.shadowBlur = 5;
//       ctx.shadowOffsetX = 2;
//       ctx.shadowOffsetY = 2;
      
//       ctx.fillStyle = isSelected ? '#3b82f6' : '#334155';
//       ctx.fillRect(x * scale, y * scale, width * scale, WALL_THICKNESS);
//       ctx.fillRect(x * scale, y * scale, WALL_THICKNESS, height * scale);
//       ctx.fillRect(x * scale + width * scale - WALL_THICKNESS, y * scale, WALL_THICKNESS, height * scale);
//       ctx.fillRect(x * scale, y * scale + height * scale - WALL_THICKNESS, width * scale, WALL_THICKNESS);
      
//       if (isSelected) {
//         ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
//         ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
//       }
      
//       ctx.shadowColor = 'transparent';
//       ctx.shadowBlur = 0;
//       ctx.shadowOffsetX = 0;
//       ctx.shadowOffsetY = 0;
//     }

//     function drawDoor(x, y, isHorizontal = true, swingLeft = true) {
//       ctx.strokeStyle = '#334155';
//       ctx.lineWidth = 2;
//       if (isHorizontal) {
//         ctx.clearRect(x * scale, y * scale - WALL_THICKNESS / 2, DOOR_WIDTH, WALL_THICKNESS);
//         ctx.beginPath();
//         swingLeft
//           ? ctx.arc(x * scale, y * scale, 16 * scale, 0, Math.PI / 2)
//           : ctx.arc(x * scale + DOOR_WIDTH, y * scale, 16 * scale, Math.PI / 2, Math.PI);
//         ctx.stroke();
//       } else {
//         ctx.clearRect(x * scale - WALL_THICKNESS / 2, y * scale, WALL_THICKNESS, DOOR_WIDTH);
//         ctx.beginPath();
//         swingLeft
//           ? ctx.arc(x * scale, y * scale, 16 * scale, 0, -Math.PI / 2)
//           : ctx.arc(x * scale, y * scale + DOOR_WIDTH, 16 * scale, -Math.PI / 2, -Math.PI);
//         ctx.stroke();
//       }
//     }

//     function drawRoomLabel(x, y, width, height, label, isSelected) {
//       ctx.font = `${Math.floor(14 * scale)}px sans-serif`;
//       ctx.fillStyle = isSelected ? '#1d4ed8' : '#1e293b';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText(label, (x + width/2) * scale, (y + height/2) * scale);
//     }

//     function drawExitSign(x, y) {
//       const size = 32 * scale;
//       ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
//       ctx.fillRect((x - size/2) * scale, (y - size/2) * scale, size, size);
//       ctx.strokeStyle = '#ef4444';
//       ctx.lineWidth = 2;
//       ctx.strokeRect((x - size/2) * scale, (y - size/2) * scale, size, size);
//       ctx.font = `${Math.floor(12 * scale)}px sans-serif`;
//       ctx.fillStyle = '#ef4444';
//       ctx.textAlign = 'center';
//       ctx.fillText('EXIT', x * scale, y * scale);
//     }

//     function findNearestExit(startX, startY) {
//       const exits = [
//         { x: 50, y: 450 },  // Left exit
//         { x: 650, y: 50 }   // Right exit
//       ];
      
//       return exits.reduce((nearest, exit) => {
//         const distance = Math.sqrt(
//           Math.pow(exit.x - startX, 2) + Math.pow(exit.y - startY, 2)
//         );
//         return distance < nearest.distance ? { ...exit, distance } : nearest;
//       }, { distance: Infinity }).distance === Infinity ? exits[0] : exits.reduce((nearest, exit) => {
//         const distance = Math.sqrt(
//           Math.pow(exit.x - startX, 2) + Math.pow(exit.y - startY, 2)
//         );
//         return distance < nearest.distance ? { ...exit, distance } : nearest;
//       }, { distance: Infinity });
//     }

//     function drawEvacuationPath(startRoom) {
//       if (!startRoom) return;
      
//       const room = rooms.find(r => r.label === startRoom);
//       if (!room) return;

//       const startX = room.x + room.w / 2;
//       const startY = room.y + room.h / 2;
//       const nearestExit = findNearestExit(startX, startY);

//       ctx.strokeStyle = '#22c55e';
//       ctx.lineWidth = 3;
//       ctx.setLineDash([5, 5]);

//       // Create gradient for the path
//       const gradient = ctx.createLinearGradient(
//         startX * scale, 
//         startY * scale, 
//         nearestExit.x * scale, 
//         nearestExit.y * scale
//       );
//       gradient.addColorStop(0, '#22c55e');
//       gradient.addColorStop(1, '#ef4444');
//       ctx.strokeStyle = gradient;

//       // Draw path with animation effect
//       ctx.beginPath();
//       ctx.moveTo(startX * scale, startY * scale);
      
//       // Add some points for a more natural path
//       const midX = (startX + nearestExit.x) / 2;
//       const midY = (startY + nearestExit.y) / 2;
      
//       ctx.quadraticCurveTo(
//         midX * scale,
//         midY * scale,
//         nearestExit.x * scale,
//         nearestExit.y * scale
//       );
      
//       ctx.stroke();
//       ctx.setLineDash([]);

//       // Draw direction arrow
//       const arrowSize = 10 * scale;
//       const angle = Math.atan2(nearestExit.y - startY, nearestExit.x - startX);
//       ctx.beginPath();
//       ctx.moveTo(midX * scale, midY * scale);
//       ctx.lineTo(
//         midX * scale - arrowSize * Math.cos(angle - Math.PI / 6),
//         midY * scale - arrowSize * Math.sin(angle - Math.PI / 6)
//       );
//       ctx.moveTo(midX * scale, midY * scale);
//       ctx.lineTo(
//         midX * scale - arrowSize * Math.cos(angle + Math.PI / 6),
//         midY * scale - arrowSize * Math.sin(angle + Math.PI / 6)
//       );
//       ctx.strokeStyle = '#22c55e';
//       ctx.stroke();
//     }

//     const rooms = [
//       // First vertical column (left side of L-shape)
//       { x: 50, y: 50, w: 150, h: 100, label: 'Office 1', doorX: 125, doorY: 150 },
//       { x: 50, y: 150, w: 150, h: 100, label: 'Office 2', doorX: 125, doorY: 250 },
//       { x: 50, y: 250, w: 150, h: 100, label: 'Office 3', doorX: 125, doorY: 350 },
      
//       // Veranda (between the two arms of the L)
//       { x: 200, y: 50, w: 100, h: 300, label: 'Veranda', doorX: 250, doorY: 150 },
    
//       // Horizontal column (right side of L-shape)
//       { x: 300, y: 50, w: 150, h: 100, label: 'Office 4', doorX: 375, doorY: 150 },
//       { x: 300, y: 150, w: 150, h: 100, label: 'Office 5', doorX: 375, doorY: 250 },
//       { x: 300, y: 250, w: 150, h: 100, label: 'Office 6', doorX: 375, doorY: 350 },
    
//       // Stairs or common space
//       { x: 550, y: 200, w: 100, h: 250, label: 'Stairs', doorX: 650, doorY: 300, vertical: true }
//     ];
    

//     function drawLayout() {
//       clearCanvas();
//       drawGrid();

//       rooms.forEach(room => {
//         const isSelected = room.label === selectedRoom;
//         drawWalls(room.x, room.y, room.w, room.h, isSelected);
//         drawDoor(room.doorX, room.doorY, !room.vertical, false);
//         drawRoomLabel(room.x, room.y, room.w, room.h, room.label, isSelected);
//       });

//       drawExitSign(50, 450);  // Left exit
//       drawExitSign(650, 50);  // Right exit

//       if (showPath && selectedRoom && ageGroup) {
//         drawEvacuationPath(selectedRoom);
//       }
//     }

//     drawLayout();

//     // Add click handler for room selection
//     canvas.onclick = (event) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = (event.clientX - rect.left) / scale;
//       const y = (event.clientY - rect.top) / scale;

//       const clickedRoom = rooms.find(room => 
//         x >= room.x && x <= room.x + room.w &&
//         y >= room.y && y <= room.y + room.h
//       );

//       if (clickedRoom) {
//         setSelectedRoom(clickedRoom.label);
//       }
//     };

//     return () => {
//       canvas.onclick = null;
//     };
//   }, [ageGroup, showPath, dimensions, selectedRoom]);

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4">
//       <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
//         <select
//           value={ageGroup}
//           onChange={(e) => setAgeGroup(e.target.value)}
//           className="w-full sm:w-48 px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">Select Age Group</option>
//           <option value="child">Child (Below 15)</option>
//           <option value="youth">Youth (15-30)</option>
//           <option value="elder">Elder (Above 60)</option>
//         </select>
//         <div className="text-sm text-gray-600">
//           Selected: {selectedRoom || 'No room selected'}
//         </div>
//         <button
//           onClick={() => {
//             if (!selectedRoom) {
//               alert('Please select a room first');
//               return;
//             }
//             if (!ageGroup) {
//               alert('Please select an age group');
//               return;
//             }
//             setShowPath(true);
//           }}
//           className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//         >
//           Show Exit Path
//         </button>
//       </div>
//       <div id="floor-plan-container" className="w-full aspect-[2/1] relative bg-gray-50 rounded-lg overflow-hidden">
//         <canvas
//           ref={canvasRef}
//           width={dimensions.width}
//           height={dimensions.height}
//           className="w-full h-full cursor-pointer"
//         />
//       </div>
//       <div className="mt-4 text-sm text-gray-500 text-center">
//         Click on a room to select it, then choose an age group to see the optimal exit path
//       </div>
//     </div>
//   );
// };

// export default FloorPlan;

import React, { useEffect, useRef, useState } from 'react';

const FloorPlan = () => {
  const canvasRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [disease, setDisease] = useState('');
  const [showPath, setShowPath] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('floor-plan-container');
      if (container) {
        const { width } = container.getBoundingClientRect();
        setDimensions({
          width: Math.floor(width * 0.95),
          height: Math.floor((width * 0.95) * (1/2))
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const scale = dimensions.width / 800; 
    const WALL_THICKNESS = Math.floor(6 * scale);
    const DOOR_WIDTH = Math.floor(24 * scale);
    const GRID_SIZE = Math.floor(16 * scale);

    function clearCanvas() {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrid() {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    }

    function drawWalls(x, y, width, height, isSelected) {
      ctx.fillStyle = isSelected ? '#3b82f6' : '#334155';
      ctx.fillRect(x * scale, y * scale, width * scale, WALL_THICKNESS);
      ctx.fillRect(x * scale, y * scale, WALL_THICKNESS, height * scale);
      ctx.fillRect(x * scale + width * scale - WALL_THICKNESS, y * scale, WALL_THICKNESS, height * scale);
      ctx.fillRect(x * scale, y * scale + height * scale - WALL_THICKNESS, width * scale, WALL_THICKNESS);
      
      if (isSelected) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
      }
    }

    function drawDoor(x, y, isHorizontal = true, swingLeft = true) {
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      if (isHorizontal) {
        ctx.clearRect(x * scale, y * scale - WALL_THICKNESS / 2, DOOR_WIDTH, WALL_THICKNESS);
        ctx.beginPath();
        swingLeft
          ? ctx.arc(x * scale, y * scale, 16 * scale, 0, Math.PI / 2)
          : ctx.arc(x * scale + DOOR_WIDTH, y * scale, 16 * scale, Math.PI / 2, Math.PI);
        ctx.stroke();
      } else {
        ctx.clearRect(x * scale - WALL_THICKNESS / 2, y * scale, WALL_THICKNESS, DOOR_WIDTH);
        ctx.beginPath();
        swingLeft
          ? ctx.arc(x * scale, y * scale, 16 * scale, 0, -Math.PI / 2)
          : ctx.arc(x * scale, y * scale + DOOR_WIDTH, 16 * scale, -Math.PI / 2, -Math.PI);
        ctx.stroke();
      }
    }

    function drawRoomLabel(x, y, width, height, label, isSelected) {
      ctx.font = `${Math.floor(14 * scale)}px sans-serif`;
      ctx.fillStyle = isSelected ? '#1d4ed8' : '#1e293b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, (x + width/2) * scale, (y + height/2) * scale);
    }

    function drawExitSign(x, y) {
      const size = 32 * scale;
      ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
      ctx.fillRect((x - size/2) * scale, (y - size/2) * scale, size, size);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect((x - size/2) * scale, (y - size/2) * scale, size, size);
      ctx.font = `${Math.floor(12 * scale)}px sans-serif`;
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'center';
      ctx.fillText('EXIT', x * scale, y * scale);
    }

    function findNearestExit(startX, startY, isShorterPath) {
      const exits = [
        { x: 50, y: 450 },  // Left exit
        { x: 650, y: 50 }   // Right exit
      ];

      const sortedExits = exits.map(exit => ({
        ...exit,
        distance: Math.sqrt(Math.pow(exit.x - startX, 2) + Math.pow(exit.y - startY, 2))
      }));

      if (isShorterPath) {
        // Sort by distance in ascending order for the shortest path
        sortedExits.sort((a, b) => a.distance - b.distance);
      } else {
        // Sort by distance in descending order for the longest path
        sortedExits.sort((a, b) => b.distance - a.distance);
      }

      return sortedExits[0]; // Return the closest exit based on sorted order
    }

    function drawEvacuationPath(startRoom) {
      if (!startRoom) return;
      
      const room = rooms.find(r => r.label === startRoom);
      if (!room) return;

      const startX = room.x + room.w / 2;
      const startY = room.y + room.h / 2;

      // Determine if the person requires the shortest or longest path
      const isShorterPath = (ageGroup === 'elder' || disease === 'chronic');
      
      const nearestExit = findNearestExit(startX, startY, isShorterPath);

      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);

      const gradient = ctx.createLinearGradient(
        startX * scale, 
        startY * scale, 
        nearestExit.x * scale, 
        nearestExit.y * scale
      );
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(1, '#ef4444');
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(startX * scale, startY * scale);
      const midX = (startX + nearestExit.x) / 2;
      const midY = (startY + nearestExit.y) / 2;
      ctx.quadraticCurveTo(midX * scale, midY * scale, nearestExit.x * scale, nearestExit.y * scale);
      ctx.stroke();
      ctx.setLineDash([]);

      const arrowSize = 10 * scale;
      const angle = Math.atan2(nearestExit.y - startY, nearestExit.x - startX);
      ctx.beginPath();
      ctx.moveTo(midX * scale, midY * scale);
      ctx.lineTo(midX * scale - arrowSize * Math.cos(angle - Math.PI / 6), midY * scale - arrowSize * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(midX * scale, midY * scale);
      ctx.lineTo(midX * scale - arrowSize * Math.cos(angle + Math.PI / 6), midY * scale - arrowSize * Math.sin(angle + Math.PI / 6));
      ctx.strokeStyle = '#22c55e';
      ctx.stroke();
    }

    const rooms = [
      { x: 50, y: 50, w: 150, h: 100, label: 'Office 1', doorX: 125, doorY: 150 },
      { x: 50, y: 150, w: 150, h: 100, label: 'Office 2', doorX: 125, doorY: 250 },
      { x: 50, y: 250, w: 150, h: 100, label: 'Office 3', doorX: 125, doorY: 350 },
      { x: 200, y: 50, w: 100, h: 300, label: 'Veranda', doorX: 250, doorY: 150 },
      { x: 300, y: 50, w: 150, h: 100, label: 'Office 4', doorX: 375, doorY: 150 },
      { x: 300, y: 150, w: 150, h: 100, label: 'Office 5', doorX: 375, doorY: 250 },
      { x: 300, y: 250, w: 150, h: 100, label: 'Office 6', doorX: 375, doorY: 350 },
      { x: 550, y: 200, w: 100, h: 250, label: 'Stairs', doorX: 650, doorY: 300, vertical: true }
    ];

    function drawLayout() {
      clearCanvas();
      drawGrid();

      rooms.forEach(room => {
        const isSelected = room.label === selectedRoom;
        drawWalls(room.x, room.y, room.w, room.h, isSelected);
        drawDoor(room.doorX, room.doorY, !room.vertical, false);
        drawRoomLabel(room.x, room.y, room.w, room.h, room.label, isSelected);
      });

      drawExitSign(50, 450);
      drawExitSign(650, 50);

      if (showPath && selectedRoom && ageGroup) {
        drawEvacuationPath(selectedRoom);
      }
    }

    drawLayout();

    canvas.onclick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;

      const clickedRoom = rooms.find(room => 
        x >= room.x && x <= room.x + room.w &&
        y >= room.y && y <= room.y + room.h
      );

      if (clickedRoom) {
        setSelectedRoom(clickedRoom.label);
      }
    };

    return () => {
      canvas.onclick = null;
    };
  }, [ageGroup, disease, showPath, dimensions, selectedRoom]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Age Group</option>
          <option value="child">Child (Below 15)</option>
          <option value="youth">Youth (15-30)</option>
          <option value="elder">Elder (Above 60)</option>
        </select>
        
        <select
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Disease Condition</option>
          <option value="none">None</option>
          <option value="chronic">Chronic Disease</option>
          <option value="temporary">Temporary Injury</option>
        </select>

        <div className="text-sm text-gray-600">
          Selected: {selectedRoom || 'No room selected'}
        </div>
        
        <button
          onClick={() => {
            if (!selectedRoom) {
              alert('Please select a room first');
              return;
            }
            if (!ageGroup || !disease) {
              alert('Please select both age group and disease');
              return;
            }
            setShowPath(true);
          }}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Show Evacuation Path
        </button>
      </div>

      <div id="floor-plan-container" className="w-full aspect-[2/1] relative bg-gray-50 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full cursor-pointer"
        />
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Click on a room to select it, then choose an age group and disease condition to see the optimal evacuation path
      </div>
    </div>
  );
};

export default FloorPlan;
