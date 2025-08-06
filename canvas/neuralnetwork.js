function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

//actual derivative of sigmoid:
//S`(x) = S(x) * (1 - S(x))
//here the parameter we recieve y is the sigmoid(to make things simpler)
function dsigmoid(y) {
    return y*(1-y);
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

        this.lr = 0.1;
    }

    feedforward(inputs){
        inputs = Matrix.fromArray(inputs);

        //hidden section:
        let hidden_output = Matrix.multiply(this.weights_ih,inputs);
        hidden_output.add(this.bias_ih);
        hidden_output.map(sigmoid);

        //output section:
        let output = Matrix.multiply(this.weights_ho,hidden_output);
        output.add(this.bias_ho);
        output.map(sigmoid);

        return Matrix.toArray(output);
    }

    train(inputs,targets){
        // let outputs = this.feedforward(inputs);
        // outputs = Matrix.fromArray(outputs);
        inputs = Matrix.fromArray(inputs);

        //hidden section:
        let hidden_output = Matrix.multiply(this.weights_ih,inputs);
        hidden_output.add(this.bias_ih);
        hidden_output.map(sigmoid);

        //output section:
        let output = Matrix.multiply(this.weights_ho,hidden_output);
        output.add(this.bias_ho);
        output.map(sigmoid);

        //calculate hidden layer errors
        targets = Matrix.fromArray(targets);
        let output_errors = Matrix.subtract(targets,output);

        //calculate gradient descent using error
        let output_gradients = Matrix.map(output,dsigmoid);
        output_gradients.hadamard(output_errors);
        output_gradients.multiply(this.lr);

        let hidden_output_T = Matrix.transpose(hidden_output);
        let delta_weights_ho = Matrix.multiply(output_gradients,hidden_output_T);

        //update output layer weights
        this.weights_ho.add(delta_weights_ho);
        //recalculate bias
        this.bias_ho.add(output_gradients);



        //calculate hidden layer errors
        let weights_hoT = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_hoT,output_errors);

        //calculate gradient descent using error
        let hidden_gradients = Matrix.map(hidden_output,dsigmoid);
        hidden_gradients.hadamard(hidden_errors);
        hidden_gradients.multiply(this.lr);

        let inputs_T = Matrix.transpose(inputs);
        let delta_weights_ih = Matrix.multiply(hidden_gradients,inputs_T);

        //update hidden layer weights
        this.weights_ih.add(delta_weights_ih);
        //recalculate bias
        this.bias_ih.add(hidden_gradients);
    }
}
