import {LossFunction, ActivationFunction, NeuralNetwork} from "./models"

class Code {
    constructor (neuralNetwork) {
        this.network = neuralNetwork;
    }

    combineAll() {
        const method = ["import torch.nn as nn", "class MLP(nn.Module):", "\tdef __init__(self):", "\t\tsuper(MLP, self).__init__(), \t\tself.model = nn.Sequential("];
        const layers = this.layersToCode();
        const code = method.concat(layers);

        return code;
    }

    layersToCode() {
        const code = [];
        
        for (let i = 0; i < this.network.layers.length - 1; i++) {
            const input = this.network.layers[i].numNodes;
            const output = this.network.layers[i + 1].numNodes;
            const linear = `\t\t\tnn.Linear(in_features = ${input}, out_features = ${output})`;
            
            code.push(linear);

            const activation = `\t\t\tnn.${this.networks.layers[i].activationFunction}()`;

            code.push(activation);
        }

        code.push(`\t\t\tnn.Linear(in_features = ${this.network.layers[this.network.layers.length - 1].numNodes}, out_features = ${this.network.outputSize}\n`);
        code.push(`\t\t\tnn.${this.networks.layers[i].activationFunction}())`);

        return code;
    }
}