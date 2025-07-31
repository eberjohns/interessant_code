const canvas = document.getElementById("canvas");

const line_element = document.getElementById("line");
const predic_line_element = document.getElementById("predic-line");
const new_line_element = document.getElementById("new-line");

let width = 400;//window.innerWidth;
let height = 400;//window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.style.background = "black";

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

function transform_x(x){
    return x += width/2;
}
function transform_y(y){
    return y += height/2;
}

let m = 0;
let c = 0;

line_element.textContent = `Target line: m = ${m} | c = ${c}`;

function line(x){
    return m*x+c;
}

addEventListener('keydown',function(event){
    switch(event.key){
        case 'ArrowUp': m++; break;
        case 'ArrowDown': m--; break;
        case 'ArrowLeft': c+=10; break;
        case 'ArrowRight': c-=10; break;
        case 't': train(); return;
        default: return;
    }

    line_element.textContent = `m = ${m} | c = ${c}`;

    ctx.clearRect(0, 0, width, height);
    draw_line();
    draw_points();
});

class Point{
    constructor(x,y,color,label){
        this.x = x;
        this.y = y;
        this.color = color;
        this.label = label;
    }

    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(transform_x(this.x),transform_y(this.y),5,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

let point = [];
let noOfPoints = 100;

function draw_line(){
    let x1 = -width / 2;
    let x2 = width / 2;

    let y1 = m * x1 + c;
    let y2 = m * x2 + c;

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(transform_x(x1), transform_y(y1));
    ctx.lineTo(transform_x(x2), transform_y(y2));
    ctx.stroke();
    ctx.closePath();
}

function setup(){
    for(let i = 0; i < noOfPoints; i++){
        //get value between -1 & 1 and multiply with width or height by 2
        let x = (Math.random()*2 - 1) * (width/2);
        let y = (Math.random()*2 - 1) * (height/2);

        let color = "white";
        let label = 0;
        if(y-line(x)>=0) {
            label = 0;
            color = "green"
        }else{
            label = 1;
            color = "red";
        }

        // for passing as x & y for drawing trasform to the cartesian plane
        point[i] = new Point(x,y,color,label);
        point[i].draw();
    }
}

function draw_points(){
    for(let i = 0; i < noOfPoints; i++){
        //check where the point is relative to line
        point[i].color = (point[i].y -line(point[i].x)>=0) ? "green" : "red";
        point[i].label = (point[i].y -line(point[i].x)>=0) ? 0 : 1;
        point[i].draw();
    }
}

draw_line();
setup();

let w1 = Math.random();
let w2 = Math.random();
let bias = Math.random();

function train(){
    let lr = 0.05;
    let epoch = 100;

    new_line_element.textContent = `m = ${m} | c = ${c}`;
    while(epoch--){
        for(let i = 0; i < noOfPoints; i++){
            let z = w1*point[i].x + w2*point[i].y + bias;
            let prediction = (z > 0) ? 1 : 0;
            let error = point[i].label - prediction;

            w1 += lr * point[i].x * error;
            w2 += lr * point[i].y * error;
            bias += lr * error * 10;

            ctx.clearRect(0, 0, width, height);
            draw_line();
            draw_points();
            draw_predic_line();
        }
    }

    predic_line_element.textContent = `Values of perceptron: w1 = ${w1.toFixed(2)} | w2 = ${w2.toFixed(2)} | bias = ${bias.toFixed(2)}`;
    new_line_element.textContent = `Predicted line: m = ${(-w1 / w2).toFixed(2)} | c = ${(-bias / w2).toFixed(2)}`;
}

function draw_predic_line(){
    let m = -w1 / w2;
    let c = -bias / w2;

    let x1 = -width / 2;
    let x2 = width / 2;

    let y1 = m * x1 + c;
    let y2 = m * x2 + c;

    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(transform_x(x1), transform_y(y1));
    ctx.lineTo(transform_x(x2), transform_y(y2));
    ctx.stroke();
    ctx.closePath();
}

// function animate(){
//     context.clearRect(0,0,canvas.width,canvas.height);

//     draw_line();
//     draw_points();

//     requestAnimationFrame(animate);
// }

// animate();
