function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function relu(x) {
    return Math.max(0, x);
}

class NeuralNetwork{
    constructor(input_nodes,hidden_nodes,output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        
        this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes);
        this.weights_ih.randomise();
        this.bias_ih = new Matrix(this.hidden_nodes,1);
        this.bias_ih.randomise();

        this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes);
        this.weights_ho.randomise();
        this.bias_ho = new Matrix(this.output_nodes,1);
        this.bias_ho.randomise();
    }

    feedforward(given){
        let input = Matrix.fromArray(given);

        let hidden_output = Matrix.multiply(this.weights_ih,input);
        hidden_output.add(this.bias_ih);
        hidden_output.map(sigmoid);
        //hidden section finish

        let output = Matrix.multiply(this.weights_ho,hidden_output);
        output.add(this.bias_ho);
        output.map(sigmoid);

        let out = Matrix.toArray(output);
        return out;
    }
}
