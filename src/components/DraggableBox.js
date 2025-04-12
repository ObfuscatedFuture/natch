import React, { useEffect, useRef } from "react";

function DraggableBox({ id, label, position, onDrag, onDrop, autoDrag, clearAutoDrag }) {
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

  // Automatically start dragging if this is a freshly added box
  useEffect(() => {
    if (autoDrag && boxRef.current) {
      const event = {
        clientX: position.x + 40, // center of box
        clientY: position.y + 40,
      };
      startDragging(event);
      clearAutoDrag(); // Let parent know this one has already auto-started
    }
  }, [autoDrag]);

  return (
    <div
      ref={boxRef}
      className="box"
      style={{ left: position.x, top: position.y }}
      onMouseDown={startDragging}
    >
      {label}
    </div>
  );
}

export default DraggableBox;
