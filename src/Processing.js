import {LossFunction, ActivationFunction, NeuralNetwork} from "./models"

class Code {
    constructor (NeuralNetwork) {
        this.network = NeuralNetwork;
    }

    combineAll() {
        const method = ["import torch.nn as nn", "class MLP(nn.Module):", "\tdef __init__(self):", "\t\tsuper(MLP, self).__init__(), \t\tself.model = nn.Sequential("];
        const layers = this.layersToCode();
        const code = method.concat(layers.map(string => "\t\t\t" + string));
        code.push("\t\t)");

        return code;
    }

    layersToCode() {
        const code = [];
        
        for (let i = 0; i < this.network.layers.length - 1; i++) {
            const input = this.network.layers[i].numNodes;
            const output = this.network.layers[i + 1].numNodes;
            const linear = `\tnn.Linear(in_features = ${input}, out_features = ${output})\n`;
            
            const activation = "";
            switch (this.network.layers[i].activationFunction) {
                case "RELU":
                    activation = "\tnn.ReLu()\n";
                case "SIGMOID":
                    activation = "\tnn.Sigmoid()\n";
                case "TANH":
                    activation = "\tnn.Tanh()\n";
                case "SOFTMAX":
                    activation = "\tnn.Softmax()\n";
                case "GELU":
                    activation = "\tnn.GELU()\n";
            }

            code.push([linear, activation]);
        }

        code.push([`\tnn.Linear(in_features = ${this.network.layers[this.network.layers.length - 1].numNodes}, out_features = ${this.network.outputSize}\n`]);

        return code;
    }
}