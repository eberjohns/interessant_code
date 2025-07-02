let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.style.background = "black";

let arm_length_1 = 100;
let arm_length_2 = 50;
let angle = 90;

let rad_angle = angle*Math.PI/180;

document.addEventListener('mousemove',function(event){
    // angle = (event.clientX / width) * 360;
    // rad_angle = angle*Math.PI/180;

    let dx = event.clientX - center_x;
    let dy = event.clientY - center_y;
    // dx and dy forms a right-angles triangle. Then,
    // rad_angle = arctangent(opposite / adjacent) = atan2(dy, dx)
    rad_angle = Math.atan2(dy, dx);
});

let center_x = width/2;
let center_y = height/2;

function draw(){
    let x1_offset = arm_length_1 * Math.cos(rad_angle);
    let y1_offset = arm_length_1 * Math.sin(rad_angle);

    let x2_offset = arm_length_2 * Math.cos(rad_angle);
    let y2_offset = arm_length_2 * Math.sin(rad_angle);
    
    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(center_x,center_y); //pinned to center
    context.lineTo(center_x  + x1_offset,center_y + y1_offset);
    context.closePath();
    context.stroke();

    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(center_x + x1_offset,center_y + y1_offset); //pinned to first line end
    context.lineTo(center_x + x2_offset,center_y + y2_offset);
    context.closePath();
    context.stroke();
}

// draw();
function loop(){
    context.clearRect(0,0,canvas.width,canvas.height);

    draw();

    requestAnimationFrame(loop);
}

loop();
