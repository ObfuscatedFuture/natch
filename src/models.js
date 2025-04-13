export const LossFunction = Object.freeze({
    CROSS_ENTROPY: "CrossEntropyLoss",
    MEAN_SQUARED_ERROR: "MSELoss",
    L1_LOSS: "L1Loss",
})

export const ActivationFunction = Object.freeze({
    RELU: "ReLu",
    SIGMOID: "Sigmoid",
    TANH: "Tanh",
    SOFTMAX: "Softmax",
    GELU: "Gelu"
})

export const Optimizer = Object.freeze({
    SGD: "SGD",
    ADAM: "Adam",
    RMSPROP: "RMSprop",
    ADAGRAD: "Adagrad",
})

/**
 *  
 * @param {number} outputSize 
 * @param {Layer[]} layers 
 * @param {string} lossFunction 
 * @param {string} optimizer
 * @return {object}
 */
export function NeuralNetwork(outputSize, layers, lossFunction, optimizer) {
    return { inputSize: layers[0].inputSize, outputSize, layers, lossFunction, optimizer }
}

/**
 * 
 * @param {number} numNodes 
 * @param {string} activationFunction 
 */
export function Layer(numNodes, activationFunction) {
    return { numNodes, activationFunction }
}
