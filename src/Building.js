// Building.js
import React, { useEffect, useRef } from 'react';
import './Building.css';

function Building() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const wallThickness = 10;
    const roomLabelFont = 'bold 14px Arial';
    const doorWidth = 40;

    function drawRoom(x, y, width, height, label, color = '#34495e') {
      // Set wall color
      ctx.fillStyle = color;

      // Draw walls
      ctx.fillRect(x, y, width, wallThickness);               // Top wall
      ctx.fillRect(x, y, wallThickness, height);              // Left wall
      ctx.fillRect(x + width - wallThickness, y, wallThickness, height); // Right wall
      ctx.fillRect(x, y + height - wallThickness, width, wallThickness); // Bottom wall

      // Draw label in the center
      ctx.font = roomLabelFont;
      ctx.fillStyle = '#2c3e50';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + width / 2, y + height / 2);

      // Clear door area at the bottom
      ctx.clearRect(x + (width - doorWidth) / 2, y + height - wallThickness, doorWidth, wallThickness);
    }

    function drawHallway(x, y, width, height) {
      ctx.fillStyle = '#ecf0f1';
      ctx.fillRect(x, y, width, height);
    }

    function drawGrid() {
      ctx.strokeStyle = '#dfe6e9';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    }

    // Draw the layout with refined room sizes and positions
    drawRoom(450, 80, 250, 160, 'Conference Hall', '#3b5998');
    drawRoom(100, 300, 250, 160, 'Cabin 1', '#8e44ad');
    drawRoom(450, 300, 250, 160, 'Cabin 2', '#e67e22');
    drawRoom(100, 80, 250, 160, 'Refreshment Area', '#1abc9c');

    // Exit doors repositioned outside adjacent corners
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(95, 470, 50, 25);   // Exit for Cabin 1 (bottom-left)
    ctx.fillRect(625, 60, 50, 25);   // Exit for Conference Hall (top-right)

    // Labels for exit doors
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Exit', 125, 482);  // Label for Cabin 1 exit
    ctx.fillText('Exit', 650, 72);   // Label for Conference Hall exit

    // Draw the grid for a structured look
    drawGrid();
  }, []);

  return (
    <div className="building-container">
      <canvas ref={canvasRef} id="houseCanvas" width="800" height="500"></canvas>
    </div>
  );
}

export default Building;
