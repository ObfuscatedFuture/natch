import React from "react";
import DropZone from "./DropZone";

function DropZoneContainer({ count, zoneRefs }) {
  return (
    <div className="drop-zone-container">
      {Array.from({ length: count }).map((_, i) => (
        <DropZone key={i} innerRef={(el) => (zoneRefs.current[i] = el)} />
      ))}
    </div>
  );
}

export default DropZoneContainer;
