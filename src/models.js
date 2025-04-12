export const LossFunction = Object.freeze({
    CROSS_ENTROPY: Symbol("CrossEntropyLoss"),
    MEAN_SQUARED_ERROR: Symbol("MSELoss"),
    L1_LOSS: Symbol("L1Loss"),
})

export const ActivationFunction = Object.freeze({
    RELU: Symbol("ReLu"),
    SIGMOID: Symbol("Sigmoid"),
    TANH: Symbol("Tanh"),
    SOFTMAX: Symbol("Softmax"),
    GELU: Symbol("Gelu")
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

