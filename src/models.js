export const LossFunction = Object.freeze({
    CROSS_ENTROPY: Symbol("CROSS_ENTROPY"),
    MEAN_SQUARED_ERROR: Symbol("MEAN_SQUARED_ERROR"),
    L1_LOSS: Symbol("L1_LOSS"),
})

export const ActivationFunction = Object.freeze({
    RELU: Symbol("RELU"),
    SIGMOID: Symbol("SIGMOID"),
    TANH: Symbol("TANH"),
    SOFTMAX: Symbol("SOFTMAX"),
    LINEAR: Symbol("LINEAR"),
    GELU: Symbol("GELU")
})

/**
 * 
 * @param {number} inputSize 
 * @param {number} outputSize 
 * @param {Layer[]} layers 
 * @param {LossFunction} lossFunction 
 */
export function NeuralNetwork(inputSize, outputSize, layers, lossFunction) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = layers
    this.lossFunction = lossFunction;
}

/**
 * 
 * @param {number} numNodes 
 * @param {ActivationFunction} activationFunction 
 */
export function Layer(numNodes, activationFunction) {
    this.numNodes = numNodes;
    this.activationFunction = activationFunction;
}

