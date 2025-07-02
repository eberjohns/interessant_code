let canvas = document.getElementById("canvas");

let grid_size = 50;

// let length = window.innerHeight - window.innerHeight%grid_size;

let width = window.innerWidth - window.innerWidth%grid_size;;
let height = window.innerHeight - window.innerHeight%grid_size;//window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.style.background = "black";

/** @type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d");

let angle = 0;
let angle_in_rad = (angle * Math.PI)/180;

// document.addEventListener("mousemove",function(event){
//     angle = event.clientX/width * 360;
//     angle_in_rad = (angle * Math.PI)/180;
// });

let zoom_step = 1.1;
let min_zoom = 0.7;
let max_zoom = 7;
let zoom = (min_zoom+max_zoom)/2;

document.addEventListener("keydown",function(event){
    if(event.key === '+') zoom*=zoom_step;
    else if(event.key === '-') zoom/= zoom_step;

    if(zoom<min_zoom) zoom = min_zoom;
    else if(zoom>max_zoom) zoom = max_zoom;
});

let cx = width / 2;
let cy = height / 2;

//grid line color
context.strokeStyle = "green";

let dot_size = 6;

function draw() {
    context.fillStyle = "red";
    context.fillRect(cx-dot_size/2,cy-dot_size/2,dot_size,dot_size);

    // Vertical lines
    for (let i = -width; i <= width; i += grid_size) {
        let x1 = i*zoom;
        let y1 = -height*zoom;
        let x2 = i*zoom;
        let y2 = height*zoom;

        let rx1 = Math.cos(angle_in_rad) * (x1) - Math.sin(angle_in_rad) * (y1);
        let ry1 = Math.sin(angle_in_rad) * (x1) + Math.cos(angle_in_rad) * (y1);

        let rx2 = Math.cos(angle_in_rad) * (x2) - Math.sin(angle_in_rad) * (y2);
        let ry2 = Math.sin(angle_in_rad) * (x2) + Math.cos(angle_in_rad) * (y2);

        context.beginPath();
        context.moveTo(rx1 + cx, ry1 + cy);
        context.lineTo(rx2 + cx, ry2 + cy);
        context.stroke();
    }

    // Horizontal lines
    for (let i = -height; i <= height; i += grid_size) {
        let y1 = i*zoom;
        let x2 = width*zoom;
        let y2 = i*zoom;
        let x1 = -width*zoom;
    
        let rx1 = Math.cos(angle_in_rad) * (x1) - Math.sin(angle_in_rad) * (y1);
        let ry1 = Math.sin(angle_in_rad) * (x1) + Math.cos(angle_in_rad) * (y1);

        let rx2 = Math.cos(angle_in_rad) * (x2) - Math.sin(angle_in_rad) * (y2);
        let ry2 = Math.sin(angle_in_rad) * (x2) + Math.cos(angle_in_rad) * (y2);

        context.beginPath();
        context.moveTo(rx1 + cx, ry1 + cy);
        context.lineTo(rx2 + cx, ry2 + cy);
        context.stroke();
    }
}


let speed = 1;
function update(){
    angle+=speed;
    if(angle>360){
        angle = 0;
    }
    angle_in_rad = (angle * Math.PI)/180;
}

function loop(){
    context.clearRect(0,0,width,height);

    update();
    draw();

    requestAnimationFrame(loop);
}

loop();

