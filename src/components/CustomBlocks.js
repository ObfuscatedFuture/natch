import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks['layer'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("Layer");
  
      // Inline-style: Label + value input on the same row
      this.appendValueInput("ACTIVATION")
          .setCheck("ActivationFunc")
          .appendField("Activation Func:");
  
      // Stacked-style: One row for label, one row for text input
      this.appendDummyInput()
          .appendField("Number of Input Nodes:");
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("#"), "numNodes");
  
      this.setInputsInline(false); // default, so we preserve vertical layout for others
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
      this.setTooltip("Define Your Layer");
      this.setHelpUrl("");
  }
};

  Blockly.Blocks['network'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("Network");
  
      this.appendStatementInput("LAYERS") // ✅ accept multiple layer blocks
          .setCheck("Layer")               // optionally restrict to "Layer" type
          .appendField("Layers");
  
      this.appendValueInput("LOSS")
          .setCheck("LossFunc")
          .appendField("Loss Func:");

      this.appendDummyInput()
          .appendField("Number of Output Nodes:");
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("#"), "outputSize");
  
      this.setInputsInline(false);
      this.setPreviousStatement(null, null);
      this.setNextStatement(null, null);
      this.setColour(207);
      this.setTooltip("Define a network with stacked layers and a loss function");
      this.setHelpUrl("");
      
    }
  };
  

Blockly.Blocks['CROSS_ENTROPY'] = {
init: function () {
    this.appendDummyInput()
        .appendField("Cross Entropy");
    this.setOutput(true, "LossFunc"); 
    this.setColour(260);
    this.setTooltip("Cross Entropy TOOL TIP");
    this.setHelpUrl("");
}
};

Blockly.Blocks['MEAN_SQUARED_ERROR'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Mean Squared Error");
        this.setOutput(true, "LossFunc"); 
        this.setColour(260);
        this.setTooltip("Mean Squared Error TOOL TIP");
        this.setHelpUrl("");
    }
};
javascriptGenerator.forBlock['MEAN_SQUARED_ERROR'] = function () {
    return ['"MEAN_SQUARED_ERROR"', javascriptGenerator.ORDER_ATOMIC];
  };
Blockly.Blocks['L1_LOSS'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("L1_Loss");
        this.setOutput(true, "LossFunc"); 
        this.setColour(260);
        this.setTooltip("L1_Loss TOOL TIP");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['L1_LOSS'] = function () {
    return ['"L1_LOSS"', javascriptGenerator.ORDER_ATOMIC];
  };
  
/*
CROSS_ENTROPY: Symbol("CROSS_ENTROPY"),
    MEAN_SQUARED_ERROR: Symbol("MEAN_SQUARED_ERROR"),
    L1_LOSS: Symbol("L1_LOSS"),
    */
Blockly.Blocks['RELU'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("RELU");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("RELU TOOL TIP");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['SIGMOID'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("SIGMOID");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("SIGMOID TOOL TIP");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['TANH'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("TANH");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("TANH TOOL TIP");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['SOFTMAX'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("SOFTMAX");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("SOFTMAX TOOL TIP");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['GELU'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("GELU");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("Gelu is better than ReLu");
      this.setHelpUrl("");
    }
  };

  
  /* RELU: Symbol("RELU"),
    SIGMOID: Symbol("SIGMOID"),
    TANH: Symbol("TANH"),
    SOFTMAX: Symbol("SOFTMAX"),
    LINEAR: Symbol("LINEAR"),
    GELU: Symbol("GELU") */
  
    javascriptGenerator.forBlock = function (name) {
        if (!this[name]) {
          console.warn(`⚠️ Missing generator for block: ${name}`);
          return () => ['undefined', this.ORDER_ATOMIC];
        }
        return this[name];
      };
      