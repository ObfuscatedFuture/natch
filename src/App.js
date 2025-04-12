import React, { useState, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import DraggableBox from "./components/DraggableBox";
import DropZoneContainer from "./components/DropZoneContainer";

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
      handleDrag(index, e);
    }
  };

  return (
    <div className="screen">
      <Sidebar />
      <div className="main-area">
        <DropZoneContainer count={NUM_ZONES} zoneRefs={zoneRefs} />
        {positions.map((pos, index) => (
          <DraggableBox
            key={index}
            index={index}
            position={pos}
            onDrag={handleDrag}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
