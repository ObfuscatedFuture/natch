import React, { useState, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BlocklyWorkspace } from "react-blockly";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import "blockly/msg/en"; // make sure block messages show up

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
      </div>
    </div>
  );
}


export default App;