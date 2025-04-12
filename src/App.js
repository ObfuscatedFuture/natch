import React, { useState, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import DraggableBox from "./components/DraggableBox";
import DropZoneContainer from "./components/DropZoneContainer";
import CBox from "./components/CBox";

const NUM_ZONES = 5;

function App() {
  const [boxes, setBoxes] = useState([]); // Dynamic list of draggable boxes
  const zoneRefs = useRef([]);
  const [newBoxToDragId, setNewBoxToDragId] = useState(null);
  const boxIdRef = useRef(0);
  const [cBoxes, setCBoxes] = useState([]);
  

  const handleAddBox = (label, mouseEvent) => {
    const newId = boxIdRef.current++;
    const newBox = {
      id: newId,
      label: label,
      x: mouseEvent.clientX - 40,
      y: mouseEvent.clientY - 40,
    };
    setBoxes((prev) => [...prev, newBox]);
    setNewBoxToDragId(newId);
  };

  const handleAddCBox = (label, mouseEvent) => {
    const newId = boxIdRef.current++;
    const newCBox = {
      id: newId,
      label: label,
      x: mouseEvent.clientX - 150,
      y: mouseEvent.clientY - 150,
      children: [], // nested drop zone support
    };
  
    // ⬇️ This is where `newCBox` is used
    setCBoxes((prev) => [...prev, newCBox]);
  
    setNewBoxToDragId(newId);
  };
  
  

  const handleDrag = (id, e) => {
    // Try dragging a regular box
    const updatedBox = boxes.find((box) => box.id === id);
    if (updatedBox) {
      setBoxes((prev) =>
        prev.map((box) =>
          box.id === id
            ? { ...box, x: e.clientX - 40, y: e.clientY - 40 }
            : box
        )
      );
      return;
    }
  
    // Try dragging a CBox
    const updatedCBox = cBoxes.find((cbox) => cbox.id === id);
    if (updatedCBox) {
      setCBoxes((prev) =>
        prev.map((cbox) =>
          cbox.id === id
            ? { ...cbox, x: e.clientX - 150, y: e.clientY - 150 }
            : cbox
        )
      );
    }
  };
  
  const handleDrop = (id, e) => {
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
        setBoxes((prev) =>
          prev.map((box) =>
            box.id === id
              ? {
                  ...box,
                  x: zoneCenter.x - 40,
                  y: zoneCenter.y - 40,
                }
              : box
          )
        );
        snapped = true;
        break;
      }
    }

    if (!snapped) {
      handleDrag(id, e);
    }
  };

  return (
    <div className="screen">
      <Sidebar onAddBox={handleAddBox} onAddCBox={handleAddCBox} />

      <div className="main-area">
        <DropZoneContainer count={NUM_ZONES} zoneRefs={zoneRefs} />
        {boxes.map((box) => (
        <DraggableBox
          key={box.id}
          id={box.id}
          label={box.label}
          position={{ x: box.x, y: box.y }}
          onDrag={handleDrag}
          onDrop={handleDrop}
          autoDrag={newBoxToDragId === box.id}
          clearAutoDrag={() => setNewBoxToDragId(null)}
        />
      ))}
      {cBoxes.map((cbox) => (
      <CBox
        key={cbox.id}
        id={cbox.id}
        label={cbox.label}
        position={{ x: cbox.x, y: cbox.y }}
        childrenBoxes={cbox.children}
        onDrag={handleDrag}
        onDrop={handleDrop}
        onDropInside={(childBox) => {
          setCBoxes((prev) =>
            prev.map((cb) =>
              cb.id === cbox.id
                ? {
                    ...cb,
                    children: cb.children.some((b) => b.id === childBox.id)
                      ? cb.children.map((b) =>
                          b.id === childBox.id ? childBox : b
                        )
                      : [...cb.children, childBox],
                  }
                : cb
            )
          );
        }}
        autoDrag={newBoxToDragId === cbox.id}
        clearAutoDrag={() => setNewBoxToDragId(null)}
      />
    ))}


      </div>
    </div>
  );
}

export default App;
