import React, { act, useEffect, useRef, useState } from "react";
import "./App.css";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript"; 
import "blockly/blocks";
import "blockly/msg/en";
import "./components/CustomBlocks";
import Canvas from "./components/Canvas";
import { Layer, ActivationFunction, NeuralNetwork, LossFunction } from "./models";
import Code from "./Processing";

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
    javascriptGenerator.forBlock['layer'] = function (block, generator) {
      
    };
      javascriptGenerator.forBlock['network'] = function (block, generator) {
        let layers = [];
        let layerBlock = block.getInputTargetBlock("LAYERS");
        while (layerBlock) {
          const activationFunction = ActivationFunction[layerBlock.getInputTargetBlock('ACTIVATION').type]
          layers.push(Layer(parseInt(layerBlock.getFieldValue('numNodes')), activationFunction));
          layerBlock = layerBlock.getNextBlock(); // iterate through stacked Layer blocks
        }

        // Get the loss function from the "LOSS" input (value input)
        const lossBlock = LossFunction[block.getInputTargetBlock("LOSS").type]
        const outputSize = block.getFieldValue('outputSize')

        // You now have layersCode = [layer1Code, layer2Code, ...]
        // and lossCode = "LossFunction.XYZ" or whatever the loss block generates

       const generatedCode = new Code(NeuralNetwork(outputSize, layers, lossBlock));
        setCode(generatedCode.combineAll());
        return generatedCode.combineAll();
      };
     

    javascriptGenerator.forBlock['controls_if'] = function(block, generator) {
      var n = 0;
      var code = '';
      if (generator.valueToCode(block, 'IF' + n, Order.NONE)) {
        code += 'if (' + generator.valueToCode(block, 'IF' + n, Order.NONE) + ') {\n' + generator.statementToCode(block, 'DO' + n) + '}\n';
      }
      for (n = 1; n <= block.elseifCount_; n++) {
        if (generator.valueToCode(block, 'IF' + n, Order.NONE)) {
          code += ' else if (' + generator.valueToCode(block, 'IF' + n, Order.NONE) + ') {\n' + generator.statementToCode(block, 'DO' + n) + '}\n';
        }
      }
      if (block.elseCount_) {
        code += ' else {\n' + generator.statementToCode(block, 'ELSE') + '}\n';
      }
      return code;
    };

    javascriptGenerator.forBlock['CROSS_ENTROPY'] = function () {
      return "CROSS_ENTROPY"
  }
  javascriptGenerator.forBlock['MEAN_SQUARED_ERROR'] = function () {
    return "MEAN_SQUARED_ERROR"
  }
  javascriptGenerator.forBlock['L1_LOSS'] = function () {
    return "L1_LOSS"
  }
  javascriptGenerator['RELU'] = function () {
  return ['"RELU"', javascriptGenerator.ORDER_ATOMIC];
  };
  javascriptGenerator.forBlock['SIGMOID'] = function () {
  return ['"SIGMOID"', javascriptGenerator.ORDER_ATOMIC];
  };
  javascriptGenerator.forBlock['TANH'] = function () {
  return ['"TANH"', javascriptGenerator.ORDER_ATOMIC];
  };
  javascriptGenerator.forBlock['SOFTMAX'] = function () {
    return ['"SOFTMAX"', javascriptGenerator.ORDER_ATOMIC];
  };
  javascriptGenerator.forBlock['GELU'] = function () {
    return ['"GELU"', javascriptGenerator.ORDER_ATOMIC];
  };

    const generatedCode = javascriptGenerator.workspaceToCode(blocklyWorkspace.current);
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
        <Canvas num_of_nodes={5} />
        <pre>{code}</pre>
        

      </div>
      {visible && (
        <div className="CenteredBox">
          <button className="CloseButton" onClick={handleClose}>×</button>
          <div className ="textfield">
            <pre>{code}</pre>
          </div>
          
        </div>
      )}

      
    </div>
  );
}

export default App;
