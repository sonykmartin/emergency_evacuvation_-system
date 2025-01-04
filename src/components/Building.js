import React, { useEffect, useRef } from 'react';

const FloorPlan = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Constants for architectural elements
    const WALL_THICKNESS = 8;
    const DOOR_WIDTH = 32;
    const DOOR_SWING = 30;
    const GRID_SIZE = 20;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawGrid() {
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 0.5;

      // Draw grid
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

    function drawWalls(x, y, width, height) {
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(x, y, width, WALL_THICKNESS);                          // Top
      ctx.fillRect(x, y, WALL_THICKNESS, height);                        // Left
      ctx.fillRect(x + width - WALL_THICKNESS, y, WALL_THICKNESS, height); // Right
      ctx.fillRect(x, y + height - WALL_THICKNESS, width, WALL_THICKNESS); // Bottom
    }

    function drawDoor(x, y, isHorizontal = true, swingLeft = true) {
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 2;

      if (isHorizontal) {
        ctx.clearRect(x, y - WALL_THICKNESS / 2, DOOR_WIDTH, WALL_THICKNESS);

        ctx.beginPath();
        if (swingLeft) {
          ctx.arc(x, y, DOOR_SWING, 0, Math.PI / 2);
        } else {
          ctx.arc(x + DOOR_WIDTH, y, DOOR_SWING, Math.PI / 2, Math.PI);
        }
        ctx.stroke();
      } else {
        ctx.clearRect(x - WALL_THICKNESS / 2, y, WALL_THICKNESS, DOOR_WIDTH);

        ctx.beginPath();
        if (swingLeft) {
          ctx.arc(x, y, DOOR_SWING, 0, -Math.PI / 2);
        } else {
          ctx.arc(x, y + DOOR_WIDTH, DOOR_SWING, -Math.PI / 2, -Math.PI);
        }
        ctx.stroke();
      }
    }

    function drawRoomLabel(x, y, width, height, label) {
      ctx.font = '16px Arial';
      ctx.fillStyle = '#34495e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(label, x + width / 2, y + height / 2);

      ctx.font = '12px Arial';
      ctx.fillStyle = '#7f8c8d';
      ctx.fillText(
        `${Math.round(width / GRID_SIZE)}' × ${Math.round(height / GRID_SIZE)}'`,
        x + width / 2,
        y + height / 2 + 20
      );
    }

    function drawExitSign(x, y) {
      // Highlight area around exit
      ctx.fillStyle = 'rgba(231, 76, 60, 0.2)';
      ctx.fillRect(x - 20, y - 20, 40, 40);

      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 20, y - 20, 40, 40);

      // Draw exit text
      ctx.font = '14px Arial';
      ctx.fillStyle = '#e74c3c';
      ctx.textAlign = 'center';
      ctx.fillText('EXIT', x, y);
    }

    // Draw the layout
    drawGrid();

    // Conference Hall
    drawWalls(600, 100, 300, 200);
    drawDoor(750, 300, true, false);
    drawRoomLabel(600, 100, 300, 200, 'Conference Hall');

    // Refreshment Area
    drawWalls(150, 100, 300, 200);
    drawDoor(300, 300, true, true);
    drawRoomLabel(150, 100, 300, 200, 'Refreshment Area');

    // Cabin 1
    drawWalls(150, 400, 300, 200);
    drawDoor(300, 400, true, false);
    drawRoomLabel(150, 400, 300, 200, 'Cabin 1');

    // Cabin 2
    drawWalls(600, 400, 300, 200);
    drawDoor(750, 400, true, true);
    drawRoomLabel(600, 400, 300, 200, 'Cabin 2');

    // Highlighted Exit signs
    drawExitSign(200, 650); // Lower exit remains the same
    drawExitSign(850, 80);  // Adjusted upper exit (moved to the right and away from the hall)

    // Scale indicator
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('0', 50, 45);
    ctx.fillText('5\'', 100, 45);
    ctx.fillText('10\'', 150, 45);
  }, []);

  return (
    <div className="relative w-full h-full p-4 bg-white rounded-lg shadow-md">
      <canvas
        ref={canvasRef}
        width={1000}
        height={800}
        className="w-full h-full"
      />
    </div>
  );
};

export default FloorPlan;
