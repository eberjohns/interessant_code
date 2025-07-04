let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.style.background = "black";

let x1 = 100;
let y1 = 100;

let x2 = 300;
let y2 = 300;

let  r = 10;

let speed = 10;

let no_of_objects = 100;

class Object{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(){
        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        context.beginPath();
        context.arc(this.x,this.y,r,0,Math.PI*2);
        context.closePath();
        // context.stroke();
        context.fill();
    }
}

const objects = [];

for(let i=0;i<no_of_objects;i++){
    objects[i] = new Object(Math.random()*width,Math.random()*height,`hsl(${Math.random() * 360}, 100%, 80%)` );
}

document.addEventListener("mousemove", function(event){
    objects[0].x = event.clientX;
    objects[0].y = event.clientY;
});

// document.addEventListener("mousedown",function(event){
//     objects[0].x = event.clientX;
//     objects[0].y = event.clientY;
// });

function draw_objects(){
    for(let i=0;i<no_of_objects;i++){
        objects[i].draw();
    }
}

function update(){
    for(let i=1;i<no_of_objects;i++){
        let dx = objects[i].x - objects[i-1].x;
        let dy = objects[i].y - objects[i-1].y;

        let d = Math.sqrt((dx*dx)+(dy*dy));
        
        let tr = (2*r) / d;
        
        let x_offset = dx * tr;
        let y_offset = dy * tr;

        objects[i].x = objects[i-1].x + x_offset;
        objects[i].y = objects[i-1].y + y_offset;
    }
}

function collision_check(){
    for(let i=0;i<no_of_objects-2;i++){
        for(let j=i+2;j<no_of_objects;j++){
            let dx = objects[i].x - objects[j].x;
            let dy = objects[i].y - objects[j].y;

            let distSq = dx * dx + dy * dy;
            if (distSq < (4 * r * r)) {
                // console.log("collision detected!");

                let d = Math.sqrt(distSq);
                let overlap = (2 * r - d) / d;

                let x_offset = dx * overlap * 0.5;
                let y_offset = dy * overlap * 0.5;

                objects[i].x += x_offset;
                objects[i].y += y_offset;
                objects[j].x -= x_offset;
                objects[j].y -= y_offset;
            }
        }
    }
}

// context.strokeStyle = "white";
// context.fillStyle = "yellow";

function loop(){
    context.clearRect(0,0,width,height);

    update();
    collision_check();
    draw_objects();

    requestAnimationFrame(loop);
}

loop();
