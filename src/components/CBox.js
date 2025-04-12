import React, { useRef, useEffect } from "react";
import DraggableBox from "./DraggableBox";

function CBox({
  id,
  label,
  position,
  childrenBoxes = [],
  onDrag,
  onDrop,
  onDropInside,
  autoDrag,
  clearAutoDrag,
}) {
  const boxRef = useRef(null);

  const startDragging = (e) => {
    const onMouseMove = (e) => onDrag(id, e);
    const onMouseUp = (e) => {
      onDrop(id, e);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };
  

  useEffect(() => {
    if (autoDrag && boxRef.current) {
      const event = {
        clientX: position.x + 150,
        clientY: position.y + 150,
      };
      startDragging(event);
      clearAutoDrag();
    }
  }, [autoDrag]);

  const handleDropInside = (e) => {
    const rect = boxRef.current.getBoundingClientRect();
    const newBox = {
      id: Date.now(),
      label: "Nested Box",
      x: e.clientX - rect.left - 40,
      y: e.clientY - rect.top - 40,
    };
    onDropInside(newBox);
  };

  return (
    <div
      ref={boxRef}
      className="cbox"
      style={{
        left: position.x,
        top: position.y,
        position: "absolute",
        width: "300px",
        height: "300px",
        backgroundColor: "#f8f8f8",
        border: "2px solid #888",
        borderRadius: "12px",
        padding: "10px",
        boxSizing: "border-box",
        cursor: "grab",
      }}
      onMouseDown={startDragging}
      onDoubleClick={handleDropInside} // ← Simulate drop with double click for now
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{label}</div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#fff",
        }}
      >
        {childrenBoxes.map((box) => (
        <DraggableBox
            key={box.id}
            id={box.id}
            label={box.label}
            position={{ x: box.x, y: box.y }}
            onDrag={(childId, e) => {
            const rect = boxRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left - 40;
            const newY = e.clientY - rect.top - 40;

            const updatedBox = {
                ...box,
                id: childId,
                x: newX,
                y: newY,
            };

            // Replace the moved box in this CBox's children array
            onDropInside(updatedBox);
            }}
            onDrop={() => {}}
            autoDrag={false} // optional: you can support auto-drag here too
            clearAutoDrag={() => {}} // noop since this isn't from sidebar
        />
        ))}


      </div>
    </div>
  );
}

export default CBox;
