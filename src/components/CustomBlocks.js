import * as Blockly from 'blockly/core';

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
          .appendField(new Blockly.FieldTextInput("#"), "NUM_INPUTS");
  
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
          .appendField("network");
  
      // Inline-style: Label + value input on the same row
      this.appendValueInput("ACTIVATION")
          .setCheck("ActivationFunc")
          .appendField("Activation Func:");
  
      this.setInputsInline(false); // default, so we preserve vertical layout for others
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
      this.setTooltip("Define Your Layer");
      this.setHelpUrl("");
    }
  };
  
  
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
  Blockly.Blocks['LINEAR'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("LINEAR");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("LINEAR TOOL TIP");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['GELU'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("GELU");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(260);
      this.setTooltip("GELU TOOL TIP");
      this.setHelpUrl("");
    }
  };
  
  /* RELU: Symbol("RELU"),
    SIGMOID: Symbol("SIGMOID"),
    TANH: Symbol("TANH"),
    SOFTMAX: Symbol("SOFTMAX"),
    LINEAR: Symbol("LINEAR"),
    GELU: Symbol("GELU") */
  
