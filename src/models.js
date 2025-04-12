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

/**
 * 
 * @param {number} inputSize 
 * @param {number} outputSize 
 * @param {Layer[]} layers 
 * @param {LossFunction} lossFunction 
 */
export function NeuralNetwork(inputSize, outputSize, layers, lossFunction) {
    return { inputSize, outputSize, layers, lossFunction }
}

/**
 * 
 * @param {number} numNodes 
 * @param {ActivationFunction} activationFunction 
 */
export function Layer(numNodes, activationFunction) {
    return { numNodes, activationFunction }
}
