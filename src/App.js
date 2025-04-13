import React, { act, useEffect, useRef, useState } from "react";
import "./App.css";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript"; 
import "blockly/blocks";
import "blockly/msg/en";
import "./components/CustomBlocks";
import NeuralNetworkVisualizer from "./components/NeuralNetworkVisualizer";
import { Layer, ActivationFunction, Optimizer, NeuralNetwork, LossFunction } from "./models";
import Code from "./Processing";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


const MY_TOOLBOX = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Layers",
      colour: "#83c5be",
      contents: [
        { kind: "block", type: "layer" }
      ]
    },
    {
      kind: "category",
      name: "Activation Funcs",
      colour: "#CCE2E9",
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
      colour: "#006d77",
      contents: [
        { kind: "block", type: "network" },
      ]
    },
    {
      kind: "category",
      name: "Loss Functions",
      colour: "#CCE2E9",
      contents: [
        { kind: "block", type: "CROSS_ENTROPY" },
        { kind: "block", type: "MEAN_SQUARED_ERROR" },
        { kind: "block", type: "L1_LOSS" }
      ]
    },
    {
      kind: "category",
      name: "Optimizers",
      colour: "#f2a900",
      contents: [
        { kind: "block", type: "SGD" },
        { kind: "block", type: "ADAM" },
        { kind: "block", type: "RMSPROP" },
        { kind: "block", type: "ADAGRAD" }
      ]
    }
  ]
};


function App() {
  const blocklyDiv = useRef(null);          // for DOM node
  const blocklyWorkspace = useRef(null);    // for Blockly workspace
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(true);

  const [visible, setVisible] = useState(false);
  const handleClose = () => setVisible(false);

  const [neuralNetwork, setNeuralNetwork] = useState(null)

  const toggleCode = () => {
    if (showCode) { // we are showing the visualization
      generateCode(false)
    }
    setShowCode(prev => !prev);
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
  

  const generateCode = (showCode=true) => {
    // Render conditionally
    setVisible(showCode)
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
        if (parseInt(layerBlock.getFieldValue('numNodes')) === 'NaN') {
          alert("No number of nodes provided")
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
      if (outputSize == null) {
        alert("No output size provided")
        return "ERROR"
      }

      const optimizer = Optimizer[block.getInputTargetBlock("OPTIMIZER").type]
      if (block.getInputTargetBlock('OPTIMIZER') === null) {
        alert("No optimizer provided")
        return "ERROR"
      }

      // You now have layersCode = [layer1Code, layer2Code, ...]
      // and lossCode = "LossFunction.XYZ" or whatever the loss block generates
      
      const neuralNetwork = NeuralNetwork(outputSize, layers, lossBlock, optimizer);
      setNeuralNetwork(neuralNetwork)
      const generatedCode = new Code(neuralNetwork);
      return generatedCode.combineAll();
    };
    Object.keys(Blockly.Blocks).forEach((blockType) => {
      if (blockType === "network") return
      javascriptGenerator.forBlock[blockType] = function (block, generator) {
        return ""
      };
    })
    
    
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
      <div className="main-area">
        <div className = "tab-bar"> 
          <div className = "side-content">
          {visible && (
          <>
            <SyntaxHighlighter language="python" style={oneDark} customStyle={{ height: '100%', overflow: 'auto' }}>
              {code}
            </SyntaxHighlighter>
          </>
          )}
          {neuralNetwork != null ? <NeuralNetworkVisualizer nnObj={neuralNetwork}></NeuralNetworkVisualizer> :null}

          <div className="tabs">
            <button onClick={generateCode}>
                Generate Code
              </button>
              <button onClick = {() => setVisible(!visible)}>
                Show Visualization
              </button>
          </div>
          </div>
         
        </div>
      
        <div
          ref={blocklyDiv}
          className="blockly-workspace"
        />
        
      </div>
      
    </div>
  );
}

export default App;
