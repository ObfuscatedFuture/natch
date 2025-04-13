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
      this.setColour("#fed766");
      this.setTooltip("Define Your Layer");
      this.setHelpUrl("");
  }
};

  Blockly.Blocks['network'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("Network");
  
      this.appendStatementInput("LAYERS") 
          .setCheck("Layer")               
          .appendField("Layers");
  
      this.appendValueInput("LOSS")
          .setCheck("LossFunc")
          .appendField("Loss Func:");

          this.appendValueInput("OPTIMIZER")
          .setCheck("Optimizer")
          .appendField("Optimizer:");

      this.appendDummyInput()
          .appendField("Number of Output Nodes:");
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("#"), "outputSize");
  
      this.setInputsInline(false);
      this.setPreviousStatement(null, null);
      this.setNextStatement(null, null);
      this.setColour("#009fb7");
      this.setTooltip("Define a network with stacked layers and a loss function");
      this.setHelpUrl("");
      
    }
  };

  const color = "#fe4a49";
  Blockly.Blocks['SGD'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("SGD");
        this.setOutput(true, "Optimizer");
        this.setColour(color);
        this.setTooltip("Randomly selects subset of data to calculate the optimal values to never get stuck at an unoptimal point.");
        this.setHelpUrl("https://towardsdatascience.com/neural-network-optimizers-made-simple-core-algorithms-and-why-they-are-needed-7fd072cd2788/");
    }
};
Blockly.Blocks['ADAM'] = {
  init: function () {
      this.appendDummyInput()
          .appendField("ADAM");
      this.setOutput(true, "Optimizer");
      this.setColour(color);
      this.setTooltip("Most commonly used one. Combines both SGD and RMS");
      this.setHelpUrl("https://medium.com/analytics-vidhya/optimizer-loss-functions-in-neural-network-2520c244cc22");
  }
};
Blockly.Blocks['ADAGRAD'] = {
  init: function () {
      this.appendDummyInput()
          .appendField("ADAGRAD");
      this.setOutput(true, "Optimizer");
      this.setColour(color);
      this.setTooltip("Ensures that the NN reaches optimization at a standard rate based on all the steps taken.");
      this.setHelpUrl("https://medium.com/@brijesh_soni/understanding-the-adagrad-optimization-algorithm-an-adaptive-learning-rate-approach-9dfaae2077bb");
  }
};

Blockly.Blocks['RMSPROP'] = {
  init: function () {
      this.appendDummyInput()
          .appendField("RMSPROP");
      this.setOutput(true, "Optimizer");
      this.setColour(color);
      this.setTooltip("Ensures that the NN reaches optimization at a standard rate based on the most recent steps taken.");
      this.setHelpUrl("https://medium.com/analytics-vidhya/optimizer-loss-functions-in-neural-network-2520c244cc22");
  }
};

Blockly.Blocks['CROSS_ENTROPY'] = {
init: function () {
    this.appendDummyInput()
        .appendField("Cross Entropy");
    this.setOutput(true, "LossFunc"); 
    this.setColour(color);
    this.setTooltip("Computes difference between two probaiblity distribution of variables. Penalizes for being very confident and wrong. Used for multi-class classification tasks.");
    this.setHelpUrl("https://neptune.ai/blog/pytorch-loss-functions#Cross-Entropy");
}
};

Blockly.Blocks['MEAN_SQUARED_ERROR'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Mean Squared Error");
        this.setOutput(true, "LossFunc"); 
        this.setColour(color);
        this.setTooltip("Computes the average of squared differences between actual and predicted values. Easiest to use and understand.");
        this.setHelpUrl("https://neptune.ai/blog/pytorch-loss-functions#Mean-Squared-Error");
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
        this.setColour(color);
        this.setTooltip("Computes average of sum of absolute differences between actual and predicted values. Useful for regression since it is robust to outliers.");
         this.setHelpUrl("https://neptune.ai/blog/pytorch-loss-functions#Mean-Absolute-Error");
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
      this.setColour(color);
      this.setTooltip("Most commonly used activation function. Simple and fast, but outputs 0 for negatives.");
      this.setHelpUrl("https://medium.com/@bhavaninetha222/activation-functions-explained-types-uses-and-importance-in-deep-learning-84eb8584a895");
    }
  };

  Blockly.Blocks['SIGMOID'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("SIGMOID");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(color);
      this.setTooltip("S-shaped, smooth curve ranging from 0 to 1. Commonly used in binary classification.");
      this.setHelpUrl("https://medium.com/@bhavaninetha222/activation-functions-explained-types-uses-and-importance-in-deep-learning-84eb8584a895");
    }
  };

  Blockly.Blocks['TANH'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("TANH");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(color);
      this.setTooltip("Same as Sigmoid, except centered at 0 from -1 to 1.");
      this.setHelpUrl("https://medium.com/@bhavaninetha222/activation-functions-explained-types-uses-and-importance-in-deep-learning-84eb8584a895");
    }
  };

  Blockly.Blocks['SOFTMAX'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("SOFTMAX");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(color);
      this.setTooltip("Used in output layer for multi-classification problems. ");
      this.setHelpUrl("https://medium.com/@bhavaninetha222/activation-functions-explained-types-uses-and-importance-in-deep-learning-84eb8584a895");
    }
  };

  Blockly.Blocks['GELU'] = {
    init: function () {
      this.appendDummyInput()
          .appendField("GELU");
      this.setOutput(true, "ActivationFunc"); 
      this.setColour(color);
      this.setTooltip("Similar to ReLu. Offers a range of negative values for small negative values.");
      this.setHelpUrl("https://medium.com/@shauryagoel/gelu-gaussian-error-linear-unit-4ec59fb2e47c");
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
      