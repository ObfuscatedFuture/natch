import React, { useState, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BlocklyWorkspace } from "react-blockly";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import "blockly/msg/en"; // make sure block messages show up
import CustomBlocks from "./components/CustomBlocks"

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
      name: "Layer",
      colour: "#5C81A6",
      contents: [
        { kind: "block", type: "controls_if" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
    {
      kind: "category",
      name: "Lists",
      colour: "#745CA6",
      contents: [
        { kind: "block", type: "lists_create_with" },
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
    }
  ],
};

function App() {
  const [xml, setXml] = useState("<xml></xml>");

  return (
    <div className="screen">
      <Sidebar />

      <div className="main-area">
        <BlocklyWorkspace
          className="blockly-workspace"
          toolboxConfiguration={MY_TOOLBOX}
          initialXml={xml}
          onXmlChange={setXml}
          workspaceConfiguration={{
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
          }}
          style={{ height: "600px", width: "100%" }}
        />
        <button onclick="ADD EVENT LISTENER HERE()"> ADD EVENT LISTENER() </button>
      </div>
    </div>
  );
}


export default App;