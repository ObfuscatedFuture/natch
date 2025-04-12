import * as Blockly from 'blockly/core';

Blockly.Blocks['layers'] = {
  init: function () {
    this.appendDummyInput().appendField("Layer");

    this.appendDummyInput()
        .appendField(`Activation Func`)
        .appendField(new Blockly.FieldTextInput(`-`), `-`)
    
    this.appendDummyInput()
        .appendField(`Number of Nodes`)
        .appendField(new Blockly.FieldTextInput(`#`), `-`)
        

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("Define 5 fixed layers with labels");
    this.setHelpUrl("");
  }
};
