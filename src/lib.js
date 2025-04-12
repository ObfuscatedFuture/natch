const LossFunction = Object.freeze({
    CROSS_ENTROPY: Symbol("CROSS_ENTROPY"),
    MEAN_SQUARED_ERROR: Symbol("MEAN_SQUARED_ERROR"),
    L1_LOSS: Symbol("L1_LOSS"),
})

const ActivationFunction = Object.freeze({
    RELU: Symbol("RELU"),
    SIGMOID: Symbol("SIGMOID"),
    TANH: Symbol("TANH"),
    SOFTMAX: Symbol("SOFTMAX"),
    LINEAR: Symbol("LINEAR"),
    GELU: Symbol("GELU")
})

class NeuralNetwork {
    /**
     * 
     */
    constructor(numberOfLayers) {
        this.layers = Array.from({ length: numberOfLayers }, () => Layer());
    }

    /**
     * 
     * @param {LossFunction} lossFunction 
     */
    addLossFunction(lossFunction) {
        this.lossFunction = lossFunction;
    }

    /**
     * 
     * @param {Number[]} input 
     */
    addInput(input) {
        this.input = input;
    }

    /**
     * 
     * @param {Layer} layer 
     * @param {ActivationFunction} activationFunction 
     * 
     */
    addLayer(numNodes, activationFunction) {
        this.layers.push(Layer(numNodes, activationFunction));
    }
}

class Layer {
    constructor(numNodes, activationFunction) {
        this.numNodes = numNodes;
        this.activationFunction = activationFunction;
        this.output = [];
    }
}

