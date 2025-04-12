import React, { useRef, useEffect, useState } from "react";
import DraggableBox from "./DraggableBox";

function GridContainer({
  id,
  label,
  position,
  childrenBoxes = [],
  onDrag,
  onDrop,
  onDropInside,
  autoDrag,
  clearAutoDrag,
  gridSize = 20, // Size of each grid cell in pixels
}) {
  const containerRef = useRef(null);
  const [showGrid, setShowGrid] = useState(true);
  
  // Container dragging logic
  const startDragging = (e) => {
    // Prevent dragging when clicking on a child element
    if (e.target !== e.currentTarget && !e.target.classList.contains("grid-container-header")) {
      return;
    }
    
    const onMouseMove = (e) => onDrag(id, e);
    const onMouseUp = (e) => {
      onDrop(id, e);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Auto-drag on creation
  useEffect(() => {
    if (autoDrag && containerRef.current) {
      const event = {
        clientX: position.x + 150,
        clientY: position.y + 150,
      };
      startDragging(event);
      clearAutoDrag();
    }
  }, [autoDrag]);

  // Handle dropping a new box inside the container
  const handleDropInside = (e) => {
    console.log("Double click detected - adding box");
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate relative position inside the container
    let x = e.clientX - rect.left - 40; // 40 is half the box width
    let y = e.clientY - rect.top - 40 - 30; // 40 is half the box height, 30 for header
    
    // Snap to grid
    x = Math.round(x / gridSize) * gridSize;
    y = Math.round(y / gridSize) * gridSize;
    
    // Ensure the box stays within the container bounds
    x = Math.max(0, Math.min(x, rect.width - 80)); // 80 is the box width
    y = Math.max(0, Math.min(y, rect.height - 80 - 30)); // 80 is the box height, 30 for header
    
    const newBox = {
      id: Date.now(),
      label: "Box",
      x: x,
      y: y,
    };
    
    onDropInside(newBox);
  };

  // Handle dragging a box inside the container
  const handleChildDrag = (childId, e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate relative position inside the container
    let newX = e.clientX - rect.left - 40; // 40 is half the box width
    let newY = e.clientY - rect.top - 40 - 30; // 40 is half the box height, 30 for header
    
    // Snap to grid
    newX = Math.round(newX / gridSize) * gridSize;
    newY = Math.round(newY / gridSize) * gridSize;
    
    // Ensure the box stays within the container bounds
    newX = Math.max(0, Math.min(newX, rect.width - 80)); // 80 is the box width
    newY = Math.max(0, Math.min(newY, rect.height - 80 - 30)); // 80 is the box height, 30 for header
    
    // Find the box being dragged
    const box = childrenBoxes.find(box => box.id === childId);
    if (!box) return;
    
    const updatedBox = {
      ...box,
      x: newX,
      y: newY,
    };
    
    // Update the box position
    onDropInside(updatedBox);
  };

  // Toggle grid visibility
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  // Generate grid background
  const generateGridBackground = () => {
    if (!showGrid) return 'none';
    
    return `
      linear-gradient(to right, #f0f0f0 1px, transparent 1px) ${gridSize}px ${gridSize}px,
      linear-gradient(to bottom, #f0f0f0 1px, transparent 1px) ${gridSize}px ${gridSize}px
    `;
  };

  return (
    <div
      ref={containerRef}
      className="grid-container"
      style={{
        left: position.x,
        top: position.y,
        position: "absolute",
        width: "400px",
        height: "400px",
        backgroundColor: "#f8f8f8",
        border: "2px solid #888",
        borderRadius: "8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onMouseDown={startDragging}
    >
      {/* Header */}
      <div 
        className="grid-container-header"
        style={{
          padding: "5px 10px",
          backgroundColor: "#e0e0e0",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "grab",
        }}
      >
        <div style={{ fontWeight: "bold" }}>{label}</div>
        <button 
          onClick={toggleGrid}
          style={{
            background: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "2px 5px",
            cursor: "pointer",
          }}
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
      </div>

      {/* Grid area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#fff",
          backgroundImage: generateGridBackground(),
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
        onDoubleClick={handleDropInside} // This event handler is triggered on double-click
        onClick={(e) => {
          // For testing, we'll also add a box on single click
          // This can be removed later
          if (e.target === e.currentTarget) {
            handleDropInside(e);
          }
        }}
      >
        {childrenBoxes.map((box) => (
          <DraggableBox
            key={box.id}
            id={box.id}
            label={box.label}
            position={{ x: box.x, y: box.y }}
            onDrag={handleChildDrag}
            onDrop={() => {}} // We handle positioning in handleChildDrag
            autoDrag={false}
            clearAutoDrag={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default GridContainer;