import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/msg/en";
import "./components/CustomBlocks"; // your custom blocks here

const MY_TOOLBOX = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Logic",
      colour: "#5C81A6",
      contents: [
        { kind: "block", type: "controls_if" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
    {
      kind: "category",
      name: "Math",
      colour: "#5CA65C",
      contents: [
        { kind: "block", type: "math_number" },
        { kind: "block", type: "math_arithmetic" },
      ],
    },
    {
      kind: "category",
      name: "Custom",
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
        { kind: "block", type: "LINEAR" }
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
  const blocklyDiv = useRef(null);
  const toolboxRef = useRef(null);
  const workspaceRef = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxRef.current,
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
        scaleSpeed: 1.2
      }
    });

    // Optional: listener to auto-generate code
    workspaceRef.current.addChangeListener(() => {
      const code = Blockly.JavaScript.workspaceToCode(workspaceRef.current);
      setCode(code);
    });

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, []);

  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
    console.log("Generated JS code:", code);
    setCode(code);
  }

  return (
    <div className="screen">
      <div className="sidebar">Sidebar Here</div>

      <div className="main-area">
        <div ref={blocklyDiv} className="blockly-workspace" />
        <xml ref={toolboxRef} style={{ display: "none" }}>
          {Blockly.utils.toolbox.convertToolboxDefToXml(MY_TOOLBOX).children}
        </xml>

        <button onClick={generateCode}>
          Generate Code
        </button>

        <pre>{code}</pre>
      </div>
    </div>
  );
}

export default App;
