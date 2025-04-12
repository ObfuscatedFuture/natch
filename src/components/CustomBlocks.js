import * as Blockly from 'blockly/core';

Blockly.Blocks['layer'] = {
  init: function () {
    this.appendDummyInput().appendField("Layer");

    this.appendDummyInput()
        .appendField(`Activation Func`)
        .appendField(new Blockly.FieldTextInput(`-`), `-`)
    
    this.appendDummyInput()
        .appendField(`Number of Input Nodes`)
        .appendField(new Blockly.FieldTextInput(`#`), `-`)        

    this.setPreviousStatement(null, null);
    this.setNextStatement(null, null);
    this.setColour(260);
    this.setTooltip("Define Your Layer");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['Activation Funcs'] = {
    init: function () {
      this.appendDummyInput().appendField("ActivationFunc");
  
      this.appendDummyInput()
          .appendField(`Activation Func`)
          .appendField(new Blockly.FieldTextInput(`-`), `-`)
            
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
      this.setTooltip("Define 5 fixed layers with labels");
      this.setHelpUrl("");
    }
  };
  
