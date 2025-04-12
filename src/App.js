import React, { act, useEffect, useRef, useState } from "react";
import "./App.css";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript"; 
import "blockly/blocks";
import "blockly/msg/en";
import "./components/CustomBlocks";
import NeuralNetworkVisualizer from "./components/NeuralNetworkVisualizer";
import { Layer, ActivationFunction, NeuralNetwork, LossFunction } from "./models";
import Code from "./Processing";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


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

  const [visible, setVisible] = useState(false);
  const handleClose = () => setVisible(false);

  const [neuralNetwork, setNeuralNetwork] = useState(null)

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
        maxScale: 4,
        minScale: 0.1,
        scaleSpeed: 1.3,
      },
    });
  
    return () => {
      if (blocklyWorkspace.current) {
        blocklyWorkspace.current.dispose();
      }
    };
  }, []);
  

  const generateCode = () => {
      // Render conditionally
    setVisible(prev => !prev)

    javascriptGenerator.forBlock['network'] = function (block, generator) {
      let layers = [];
      let layerBlock = block.getInputTargetBlock("LAYERS");
      if (layerBlock === null) {
        alert("No layer block connected");
        return "ERROR"
      }
      // Iterate through all connected Layer blocks and add them to the layers array
      while (layerBlock) {
        if ( layerBlock.getInputTargetBlock('ACTIVATION') === null) {
          alert("No activation function block connected")
          return "ERROR"
        }
        const activationFunction = ActivationFunction[ layerBlock.getInputTargetBlock('ACTIVATION').type]
        
        layers.push(Layer(parseInt(layerBlock.getFieldValue('numNodes')), activationFunction));
        layerBlock = layerBlock.getNextBlock(); // iterate through stacked Layer blocks
      }

      // Get the loss function from the "LOSS" input (value input)
      if (block.getInputTargetBlock("LOSS") === null) {
        alert("No loss function block connected");  
        return "ERROR" 
      }
      const lossBlock = LossFunction[block.getInputTargetBlock("LOSS").type]
      if (block.getFieldValue('outputSize') === null) {
        alert("No output size provided")
        return "ERROR"
      }
      const outputSize = block.getFieldValue('outputSize')

      // You now have layersCode = [layer1Code, layer2Code, ...]
      // and lossCode = "LossFunction.XYZ" or whatever the loss block generates
      
      const neuralNetwork = NeuralNetwork(outputSize, layers, lossBlock);
      setNeuralNetwork(neuralNetwork)
      const generatedCode = new Code(neuralNetwork);
      return generatedCode.combineAll();
    };

    const generatedCode = javascriptGenerator.workspaceToCode(blocklyWorkspace.current);
    if (generatedCode === "ERROR") {
      setVisible(false)
      return
    }

    console.log("Generated JS code:", generatedCode);
    setCode(generatedCode);
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
        <NeuralNetworkVisualizer layers={[4,2,3,4,5]}></NeuralNetworkVisualizer>

      </div>
      {visible && (
        <div className="CenteredBox">
          <button className="CloseButton" onClick={handleClose}>×</button>
          <SyntaxHighlighter language="python" style={oneDark} customStyle={{ height: '100%', overflow: 'auto' }}>
            {code}
          </SyntaxHighlighter>
        </div>

      )}
    </div>
  );
}

export default App;
