import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BlocklyWorkspace } from "react-blockly";
import { defineBlocksWithJsonArray } from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import "blockly/msg/en"; // Needed for block labels
import "blockly/media/blockly.css"; // Make sure workspace renders

// ✅ Define custom blocks
defineBlocksWithJsonArray([
  {
    "type": "layer",
    "message0": "Layer %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "LAYER_NAME",
        "text": "layer1"
      },
      {
        "type": "input_statement",
        "name": "NODES"
      }
    ],
    "colour": 230,
    "tooltip": "A layer containing multiple nodes",
    "helpUrl": ""
  },
  {
    "type": "node",
    "message0": "Node %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NODE_NAME",
        "text": "node1"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "A node inside a layer",
    "helpUrl": ""
  }
]);

// ✅ Optional code generation
javascriptGenerator["layer"] = function (block) {
  const name = block.getFieldValue("LAYER_NAME");
  const nodes = javascriptGenerator.statementToCode(block, "NODES");
  return `Layer("${name}", [\n${nodes}])\n`;
};

javascriptGenerator["node"] = function (block) {
  const name = block.getFieldValue("NODE_NAME");
  return `  Node("${name}"),\n`;
};

// ✅ Toolbox
const MY_TOOLBOX = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "category",
      name: "Logic",
      contents: [
        { kind: "block", type: "controls_if" },
        { kind: "block", type: "controls_repeat_ext" },
      ],
    },
    {
      kind: "category",
      name: "Math",
      contents: [
        { kind: "block", type: "math_number" },
        { kind: "block", type: "math_arithmetic" },
      ],
    },
    {
      kind: "category",
      name: "Custom",
      colour: "260",
      contents: [
        { kind: "block", type: "layer" },
        { kind: "block", type: "node" },
      ],
    },
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
          style={{ height: "600px", width: "100%" }}
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
              scaleSpeed: 1.2,
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
