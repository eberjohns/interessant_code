
let training_data = [{
        inputs: [0,0],
        targets: [0]
    },{
        inputs: [1,0],
        targets: [1]
    },{
        inputs: [0,1],
        targets: [1]
    },{
        inputs: [1,1],
        targets: [0]
    }
];


let nn = new NeuralNetwork(2,2,1);

for(let i=0;i<500000;i++){
    // let inputs_array = [];
    // let targets_array = [];
    //batch size 4
    // for(let j = 0;j<4;j++){
        let data = training_data[Math.floor(Math.random()*4)];
        // inputs_array[j] = data.inputs;
        // targets_array[j] = data.targets;
    // }
    
    nn.train(data.inputs,data.targets);
}

// console.table(inputs_array);
// console.table(nn.predict(inputs_array));

console.log(nn.predict([0,0]));
console.log(nn.predict([0,1]));
console.log(nn.predict([1,0]));
console.log(nn.predict([1,1]));
