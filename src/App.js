import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript"; // ✅ ADD THIS
import "blockly/blocks";
import "blockly/msg/en";
import "./components/CustomBlocks";
import Canvas from "./components/Canvas";

const MY_TOOLBOX = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Layers",
      colour: "#AA66CC",
      contents: [
        { kind: "block", type: "layer" }
      ]
    },
    {
      kind: "category",
      name: "Activation Funcs",
      colour: "#AA66CC",
      contents: [
        { kind: "block", type: "RELU" },
        { kind: "block", type: "SIGMOID" },
        { kind: "block", type: "TANH" },
        { kind: "block", type: "SOFTMAX" },

      ]
    },
    {
      kind: "category",
      name: "Network",
      colour: "#2e9cf7",
      contents: [
        { kind: "block", type: "network" },
      ]
    },
    {
      kind: "category",
      name: "Loss Functions",
      colour: "#AA66CC",
      contents: [
        { kind: "block", type: "CROSS_ENTROPY" },
        { kind: "block", type: "MEAN_SQUARED_ERROR" },
        { kind: "block", type: "L1_LOSS" }
      ]
    }
  ]
};


function App() {
  const blocklyDiv = useRef(null);          // for DOM node
const blocklyWorkspace = useRef(null);    // for Blockly workspace
  const [code, setCode] = useState("");
  const [showWorkspace, setShowWorkspace] = useState(true);

  const toggleWorkspace = () => {
    setShowWorkspace(prev => !prev);
  };


  useEffect(() => {
    if (!blocklyDiv.current) return;
  
    blocklyWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: MY_TOOLBOX,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
    });
  
    return () => {
      if (blocklyWorkspace.current) {
        blocklyWorkspace.current.dispose();
      }
    };
  }, []);
  

  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(blocklyWorkspace.current);
    console.log("Generated JS code:", code);
    setCode(code);
  }

  return (
    <div className="screen">
      <div className="sidebar">Sidebar Here
      <button onClick={generateCode}>
          Generate Code
        </button>
        <button onClick={toggleWorkspace}>
          {showWorkspace ? "Show Visualization" : "Show Workspace"}
        </button>
      </div>

      <div className="main-area">
        
        <div
          ref={blocklyDiv}
          className="blockly-workspace"
          style={{ display: showWorkspace ? "block" : "none" }}
          
        />
        <Canvas />
        <pre>{code}</pre>
      </div>
      
    </div>
  );
}

export default App;
