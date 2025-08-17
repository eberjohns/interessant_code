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
        //outputs_ih = (W*I + B)
        let outputs_ih = Matrix.multiply(this.weights_ih,inputs);
        outputs_ih.add(this.bias_ih);
        outputs_ih.map(sigmoid);

        //output section:
        // outputs_ho = (w*a_o + B)
        let outputs_ho = Matrix.multiply(this.weights_ho,outputs_ih);
        outputs_ho.add(this.bias_ho);
        outputs_ho.map(sigmoid);

        return Matrix.toArray(outputs_ho);
    }

    train(inputs,targets){
        // let outputs = this.feedforward(inputs);
        // outputs = Matrix.fromArray(outputs);
        inputs = Matrix.fromArray(inputs);

        //hidden section:
        //outputs_ih = (W*I + B)
        let outputs_ih = Matrix.multiply(this.weights_ih,inputs);
        outputs_ih.add(this.bias_ih);
        
        let a_outputs_ih = Matrix.map(outputs_ih,sigmoid);

        //output section:
        // outputs_ho = (w*a_o + B)
        let outputs_ho = Matrix.multiply(this.weights_ho,a_outputs_ih);
        outputs_ho.add(this.bias_ho);
        
        let a_outputs_ho = Matrix.map(outputs_ho,sigmoid);

        // _______________________________________________________________

        //calculate output layer errors
        targets = Matrix.fromArray(targets);
        let output_errors = Matrix.subtract(targets,a_outputs_ho);

        //calculate gradient descent using error
        let gradients_ho = Matrix.map(a_outputs_ho,dsigmoid);
        gradients_ho.hadamard(output_errors);
        gradients_ho.multiply(this.lr);

        let a_outputs_ih_T = Matrix.transpose(a_outputs_ih);
        let delta_weights_ho = Matrix.multiply(gradients_ho,a_outputs_ih_T);

        // ________________________________________________________________

        //calculate hidden layer errors
        let weights_hoT = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_hoT,gradients_ho);

        //calculate gradient descent using error
        let gradients_ih = Matrix.map(a_outputs_ih,dsigmoid);
        gradients_ih.hadamard(hidden_errors);
        gradients_ih.multiply(this.lr);

        let inputs_T = Matrix.transpose(inputs);
        let delta_weights_ih = Matrix.multiply(gradients_ih,inputs_T);

        //__________________________________________________________________

        //update output layer weights
        this.weights_ho.add(delta_weights_ho);
        //recalculate bias
        this.bias_ho.add(gradients_ho);

        //update hidden layer weights
        this.weights_ih.add(delta_weights_ih);
        //recalculate bias
        this.bias_ih.add(gradients_ih);
    }
}
