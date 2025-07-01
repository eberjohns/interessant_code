let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const maxDepth = Math.sqrt(width*width + height*height);

canvas.style.background = "black";

let speed = 1;
//to make canvas dynamically resize using the mouse position
//map speed to mouse X position and also sqeeze it into limit
document.addEventListener('mousemove', function(event) {
    speed = event.clientX/(width/64);
    // canvas.height = event.clientX;
    // canvas.height = event.clientY;
});

class Star{
    constructor(x,y,z,r,real_x,real_y,color){
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.real_x = real_x;
        this.real_y = real_y;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.real_x,this.real_y,this.r,0,Math.PI*2);
        context.fill();
        context.closePath();
    }
}

let stars = [];
let noOfStars = 10000;
let max_star_radi = 3;
// const speed = 3;

function setup(context){
    for(let i=0;i<noOfStars;i++){
        const x_pos = Math.random()*width;
        const y_pos = Math.random()*height;
        const z_pos = Math.random()*width;
        const r = (max_star_radi - z_pos/ (width/max_star_radi));
        const color = `hsl(${Math.random() * 360}, 100%, 80%)`;

        stars[i] = new Star(x_pos,y_pos,z_pos,r,x_pos,y_pos,color);
        stars[i].draw(context);
    }
}

function update(context){
    for(let i=0;i<noOfStars;i++){
        stars[i].z -= speed;
        // stars[i].z -= speed + (width - stars[i].z) * 0.01;
        
        if(stars[i].z <= 1){
            stars[i].z = width;
            stars[i].x = Math.random()*width;
            stars[i].y = Math.random()*height;
            stars[i].r = max_star_radi - (stars[i].z / (width / max_star_radi));
        }

        // stars[i].x = stars[i].x - (width/2);
        // stars[i].y = stars[i].y - (width/2);
        
        // stars[i].real_x = (stars[i].x / stars[i].z) * (width);
        // stars[i].real_y = (stars[i].y / stars[i].z) * (width);

        // stars[i].x = stars[i].x + (width/2);
        // stars[i].y = stars[i].y + (width/2);

        // stars[i].real_x = stars[i].real_x + (width/2);
        // stars[i].real_y = stars[i].real_y + (width/2);

        //alternative:
        let scale = width / stars[i].z;
        stars[i].real_x = (stars[i].x - width / 2) * scale + width / 2;
        stars[i].real_y = (stars[i].y - height / 2) * scale + height / 2;

        stars[i].r = max_star_radi - (stars[i].z / (width/max_star_radi));
    }
}

function show(context){
    for(let i=0;i<noOfStars;i++){
        stars[i].draw();
    }
}

setup(context);

// Use an animation loop with requestAnimationFrame.
function animate() {
    // Clear the canvas in each frame.
    // context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0, width, height);


    update(context);
    show(context);

    // Request the next animation frame.
    requestAnimationFrame(animate);
}

// Start the animation loop.
animate();
