import {LossFunction, ActivationFunction, NeuralNetwork} from "./models"

class Code {
    constructor (neuralNetwork) {
        this.network = neuralNetwork;
    }

    combineAll() {
        /*
            import torch
            class MLP(nn.Module)
                
        */
        const method = ["import torch.nn as nn", "class MLP(nn.Module):", "\tdef __init__(self):", "\t\tsuper(MLP, self).__init__(), \t\tself.model = nn.Sequential("];
        const layers = this.layersToCode();
        const code = method.concat(layers);

        const step = ["\tdef forwards(self, x):", "\t\treturn self.model(x)"];
        const code2 = code.concat(step);
        return code2;
    }

    layersToCode() {
        const code = [];
        
        for (let i = 0; i < this.network.layers.length - 1; i++) {
            const input = this.network.layers[i].numNodes;
            const output = this.network.layers[i + 1].numNodes;
            const linear = `\t\t\tnn.Linear(in_features = ${input}, out_features = ${output})\n`;
            
            code.push(linear);

            const activation = `\t\t\tnn.${this.networks.layers[i].activationFunction}()\n`;

            code.push(activation);
        }

        code.push(`\t\t\tnn.Linear(in_features = ${this.network.layers[this.network.layers.length - 1].numNodes}, out_features = ${this.network.outputSize}\n`);
        code.push(`\t\t\tnn.${this.networks.layers[i].activationFunction}())\n`);

        return code;
    }
}