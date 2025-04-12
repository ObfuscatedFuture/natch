import React from "react";
import "./Sidebar.css";

function Sidebar({ onAddBox, onAddCBox }) {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <p>This is the sidebar content.</p>
      <button onMouseDown={(e) => onAddBox("Function 1", e)}>
        Add Function 1
      </button>
      <button onMouseDown={(e) => onAddBox("Function 2", e)}>
        Add Function 2
      </button>
      <button onMouseDown={(e) => onAddCBox("C Block", e)}>
        Add C Block
      </button>

    </div>
  );
}

export default Sidebar;
