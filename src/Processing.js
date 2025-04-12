import {LossFunction, ActivationFunction, NeuralNetwork} from "./models"

export default class Code {
    constructor (neuralNetwork) {
        this.network = neuralNetwork;
    }

    combineAll() {
        /*
            import torch
            class MLP(nn.Module)
                
        */
        const method = ["import torch.nn as nn", "import torch.optim as optim", "class MLP(nn.Module):", "\tdef __init__(self):", "\t\tsuper(MLP, self).__init__()", "\t\tself.model = nn.Sequential("];
        const layers = this.layersToCode();
        const code = method.concat(layers);

        const step = ["\tdef forward(self, x):", "\t\treturn self.model(x)"];
        const code2 = code.concat(step);
        const code3 = code2.concat(this.trainFun());
        return code3.join("\n");
    }

    layersToCode() {
        const code = [];
        
        for (let i = 0; i < this.network.layers.length - 1; i++) {
            const input = this.network.layers[i].numNodes;
            const output = this.network.layers[i + 1].numNodes;
            const linear = `\t\t\tnn.Linear(in_features = ${input}, out_features = ${output})`;
            
            code.push(linear);

            const activation = `\t\t\tnn.${this.network.layers[i].activationFunction}()`;

            code.push(activation);
        }

        code.push(`\t\t\tnn.Linear(in_features = ${this.network.layers[this.network.layers.length - 1].numNodes}, out_features = ${this.network.outputSize})`);
        code.push(`\t\t\tnn.${this.network.layers[this.network.layers.length - 1].activationFunction}()`);
        code.push("\t\t)");

        return code.join("\n");
    }

    trainFun() {
        const train = ["def train(model, inputdata, outputdata, numepochs):", "\tfor epoch in range(numepochs):", "\t\tmodel.train()",
            "\t\toptimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)", "\t\toptimizer.zero_grad()", `\t\tloss = nn.${this.network.lossFunction}()`,
            "\t\toutputs = model(inputdata)", "\t\terror = loss(outputs, outputdata)", "\t\terror.backward()", "\t\toptimizer.step()"
        ];

        return train.join("\n");
    }
}