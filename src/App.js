import React, { useState, useRef } from "react";
import "./App.css";

const NUM_BOXES = 5;
const NUM_ZONES = 5;

function App() {
  const [positions, setPositions] = useState(
    Array.from({ length: NUM_BOXES }, () => ({ x: 220, y: 20 }))
  );

  const zoneRefs = useRef([]);

  const handleDrag = (index, e) => {
    const newPositions = [...positions];
    newPositions[index] = {
      x: e.clientX - 40,
      y: e.clientY - 40,
    };
    setPositions(newPositions);
  };

  const handleDrop = (index, e) => {
    const boxCenter = { x: e.clientX, y: e.clientY };
    let snapped = false;

    for (let i = 0; i < zoneRefs.current.length; i++) {
      const rect = zoneRefs.current[i].getBoundingClientRect();
      const zoneCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const dx = boxCenter.x - zoneCenter.x;
      const dy = boxCenter.y - zoneCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 60) {
        const newPositions = [...positions];
        newPositions[index] = {
          x: zoneCenter.x - 40,
          y: zoneCenter.y - 40,
        };
        setPositions(newPositions);
        snapped = true;
        break;
      }
    }

    if (!snapped) {
      handleDrag(index, e); // Just update to where they dropped it
    }
  };

  return (
    <div className="screen">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <p>This is the sidebar content.</p>
      </div>

      <div className="main-area">
        {/* Drop Zones */}
        <div className="drop-zone-container">
          {Array.from({ length: NUM_ZONES }).map((_, i) => (
            <div
              key={i}
              className="drop-zone"
              ref={(el) => (zoneRefs.current[i] = el)}
            />
          ))}
          </div>

        {/* Draggable Boxes */}
        {positions.map((pos, index) => (
          <div
            key={index}
            className="box"
            style={{ left: pos.x, top: pos.y }}
            onMouseDown={(e) => {
              const onMouseMove = (e) => handleDrag(index, e);
              const onMouseUp = (e) => {
                handleDrop(index, e);
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
              };
              window.addEventListener("mousemove", onMouseMove);
              window.addEventListener("mouseup", onMouseUp);
            }}
          >
            Function 1
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
