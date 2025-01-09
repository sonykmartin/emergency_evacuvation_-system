import React, { useEffect, useRef, useState } from 'react';
import "./Building.css";

const ITFloorPlan = () => {
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
    const CORRIDOR_WIDTH = Math.floor(50 * scale);

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

    function drawCorridor() {
      ctx.fillStyle = '#f1f5f9';
      // Horizontal corridor
      ctx.fillRect(50 * scale, 150 * scale, 700 * scale, CORRIDOR_WIDTH);
      // Vertical corridor
      ctx.fillRect(350 * scale, 200 * scale, CORRIDOR_WIDTH, 200 * scale);
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

    function getPathPoints(room) {
      // Define corridor intersection points
      const corridorPoints = {
        mainIntersection: { x: 375, y: 175 }, // Main corridor intersection
        leftExit: { x: 50, y: 175 },
        rightExit: { x: 750, y: 175 },
        bottomExit: { x: 375, y: 400 }
      };

      // Get room's door location
      const doorPoint = {
        x: room.doorX,
        y: room.doorY
      };

      return {
        doorPoint,
        corridorPoints
      };
    }

    function drawEvacuationPath(startRoom) {
      if (!startRoom) return;
      
      const room = rooms.find(r => r.label === startRoom);
      if (!room) return;

      const { doorPoint, corridorPoints } = getPathPoints(room);
      const isShorterPath = (ageGroup === 'elder' || disease === 'chronic');

      const exits = [
        { point: corridorPoints.leftExit, label: 'left' },
        { point: corridorPoints.rightExit, label: 'right' },
        { point: corridorPoints.bottomExit, label: 'bottom' }
      ];

      const nearestExit = exits.reduce((nearest, exit) => {
        const distance = Math.sqrt(
          Math.pow(doorPoint.x - exit.point.x, 1) + 
          Math.pow(doorPoint.y - exit.point.y, 2)
        );
        return (!nearest || (isShorterPath ? distance < nearest.distance : distance > nearest.distance))
          ? { ...exit, distance }
          : nearest;
      }, null);

      // Create gradient for path
      const gradient = ctx.createLinearGradient(
        doorPoint.x * scale, 
        doorPoint.y * scale,
        nearestExit.point.x * scale,
        nearestExit.point.y * scale
      );
      gradient.addColorStop(0, '#4f46e5');  
      gradient.addColorStop(1, '#06b6d4');  

      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 4]);

      ctx.beginPath();
      ctx.moveTo(doorPoint.x * scale, doorPoint.y * scale);
      ctx.lineTo(doorPoint.x * scale, corridorPoints.mainIntersection.y * scale);

      if (nearestExit.label === 'bottom') {
        ctx.lineTo(corridorPoints.mainIntersection.x * scale, corridorPoints.mainIntersection.y * scale);
        ctx.lineTo(corridorPoints.bottomExit.x * scale, corridorPoints.bottomExit.y * scale);
      } else if (nearestExit.label === 'left') {
        ctx.lineTo(corridorPoints.leftExit.x * scale, corridorPoints.leftExit.y * scale);
      } else {
        ctx.lineTo(corridorPoints.rightExit.x * scale, corridorPoints.rightExit.y * scale);
      }

      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      const arrowSize = 12 * scale;
      const points = [doorPoint, corridorPoints.mainIntersection, nearestExit.point];
      const midPoint = points[Math.floor(points.length / 2)];
      const nextPoint = points[Math.floor(points.length / 2) + 1];
      
      const angle = Math.atan2(nextPoint.y - midPoint.y, nextPoint.x - midPoint.x);
      ctx.fillStyle = '#06b6d4';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.moveTo(midPoint.x * scale, midPoint.y * scale);
      ctx.lineTo(
        (midPoint.x - arrowSize * Math.cos(angle - Math.PI / 6)) * scale,
        (midPoint.y - arrowSize * Math.sin(angle - Math.PI / 6)) * scale
      );
      ctx.lineTo(
        (midPoint.x - arrowSize * Math.cos(angle + Math.PI / 6)) * scale,
        (midPoint.y - arrowSize * Math.sin(angle + Math.PI / 6)) * scale
      );
      ctx.closePath();
      ctx.fill();
    }

    const rooms = [
      // Top row (above corridor)
      { x: 50, y: 50, w: 140, h: 100, label: 'TCS Office', doorX: 120, doorY: 150 },
      { x: 200, y: 50, w: 140, h: 100, label: 'Infosys Hub', doorX: 270, doorY: 150 },
      { x: 450, y: 50, w: 140, h: 100, label: 'Microsoft Suite', doorX: 520, doorY: 150 },
      { x: 600, y: 50, w: 140, h: 100, label: 'Google Space', doorX: 670, doorY: 150 },
      
      // Bottom row (below corridor)
      { x: 50, y: 200, w: 140, h: 100, label: 'Amazon Hub', doorX: 120, doorY: 200 },
      { x: 200, y: 200, w: 140, h: 100, label: 'Tech Cafe', doorX: 270, doorY: 200 },
      
      // Right wing
      { x: 450, y: 200, w: 140, h: 100, label: 'Innovation Lab', doorX: 450, doorY: 250 },
      { x: 450, y: 310, w: 140, h: 90, label: 'Conference Center', doorX: 450, doorY: 355 },
      
      // Central area
      { x: 600, y: 200, w: 140, h: 200, label: 'Central Plaza', doorX: 600, doorY: 250 }
    ];

    function drawLayout() {
      clearCanvas();
      drawGrid();
      drawCorridor();

      rooms.forEach(room => {
        const isSelected = room.label === selectedRoom;
        drawWalls(room.x, room.y, room.w, room.h, isSelected);
        drawDoor(room.doorX, room.doorY, room.doorX === room.x, true);
        drawRoomLabel(room.x, room.y, room.w, room.h, room.label, isSelected);
      });

      drawExitSign(50, 175);    // Left exit
      drawExitSign(750, 175);   // Right exit
      drawExitSign(375, 375);   // Bottom exit

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
          <option value="youth">20-30</option>
          <option value="middle aged">30-50</option>
          <option value="elder">Above 50</option>
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
          <option value="respiratory disease">Respiratory disease</option>
          <option value="cardic diseases">Cardic diseases</option>
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

      </div>
    );
  };
  
  export default ITFloorPlan;
