import React from "react";

function DraggableBox({ index, position, onDrag, onDrop }) {
  const handleMouseDown = (e) => {
    const onMouseMove = (e) => onDrag(index, e);
    const onMouseUp = (e) => {
      onDrop(index, e);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="box"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      Function {index + 1}
    </div>
  );
}

export default DraggableBox;
