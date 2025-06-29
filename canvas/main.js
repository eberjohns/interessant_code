let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "black";

class Circle {
    constructor(xpos,ypos,radius,color,lineWidth) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false);
        context.stroke();
        context.closePath();
    }

    update(context){
        context.clearRect(0,0,window_width,window_height);
        this.draw(context);
    }
}

class Rectangle {
    constructor(xpos,ypos,width,height,color){
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.xpos,this.ypos,this.width,this.height);
    }

    update(context){
        context.clearRect(0,0,window_width,window_height);
        this.draw(context);
    }
}

// let circles = [];

// function createCircle(temp_circle){
//     temp_circle.draw(context);
// }

// context.clearRect(0,0,window_width,window_height);

// for(var numbers = 0;numbers<10;numbers++){
//     var x = Math.random()*window_width;
//     var y = Math.random()*window_height;
//     let temp_circle = new Circle(x,y,50,"white",5);
//     circles.push(temp_circle);
//     createCircle(circles[numbers]);
// }

var x = Math.random()*window_width;
var y = Math.random()*window_height;
var c_radius = 50;
let temp_circle1 = new Circle(x,y,c_radius,"white",5);
x = Math.random()*window_width;
y = Math.random()*window_height;
let temp_circle2 = new Circle(x,y,c_radius,"white",5);

const speed = 1;

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// ---
// **The correct way to handle animation and user input**
// Use an animation loop with requestAnimationFrame.
function animate() {
    // Clear the canvas in each frame.
    context.clearRect(0, 0, window_width, window_height);

    // 2. Update the circle's position based on the state of the keys
    if (keys.ArrowUp) { temp_circle1.ypos -= speed; }
    if (keys.ArrowDown) { temp_circle1.ypos += speed; }
    if (keys.ArrowLeft) { temp_circle1.xpos -= speed; }
    if (keys.ArrowRight) { temp_circle1.xpos += speed; }

    // --- Procedural attachment logic ---
    
    // 1. Calculate the distance between the centers
    let dx = temp_circle2.xpos - temp_circle1.xpos;
    let dy = temp_circle2.ypos - temp_circle1.ypos;
    let squared_distance = dx * dx + dy * dy;

    // 2. Define the target distance (sum of radii)
    let targetDistance = temp_circle1.radius + temp_circle2.radius;
    let squared_target_distance = targetDistance * targetDistance;

    // 3. Check if they are not touching
    if (squared_distance > squared_target_distance) {
        let distance = Math.sqrt(squared_distance);
        // Move temp_circle2 towards temp_circle1
        // Normalize the vector (dx, dy) to get a direction
        let directionX = dx / distance;
        let directionY = dy / distance;

        // Move a small step towards the other circle
        // let speed = 2; // Adjust this for faster/slower movement
        
        // Subtract from temp_circle2's position to move towards temp_circle1
        temp_circle2.xpos -= directionX * speed;
        temp_circle2.ypos -= directionY * speed;
    }else if (squared_distance < squared_target_distance){
        let distance = Math.sqrt(squared_distance);
        // Move temp_circle2 away from temp_circle1
        // Normalize the vector (dx, dy) to get a direction
        let directionX = dx / distance;
        let directionY = dy / distance;

        // Move a small step away from the other circle
        // let speed = 2; // Adjust this for faster/slower movement
        
        // Subtract from temp_circle2's position to move away from temp_circle1
        temp_circle2.xpos += directionX * speed;
        temp_circle2.ypos += directionY * speed;
    }

    // --- Drawing the circles ---
    temp_circle1.draw(context);
    temp_circle2.draw(context);

    // Request the next animation frame.
    requestAnimationFrame(animate);
}

// Start the animation loop.
animate();

// ---
// **The correct way to handle key presses.**
// Attach a 'keydown' event listener to the document.
// document.addEventListener('keydown', function(event) {
//     // Change the circle's position based on the key pressed.
//     // We update the position here, and the animate loop handles the drawing.
//     const speed = 2; // Adjust the speed of movement.

//     if (event.key === 'ArrowUp') {
//         temp_circle1.ypos -= speed;
//     } else if (event.key === 'ArrowDown') {
//         temp_circle1.ypos += speed;
//     } else if (event.key === 'ArrowLeft') {
//         temp_circle1.xpos -= speed;
//     } else if (event.key === 'ArrowRight') {
//         temp_circle1.xpos += speed;
//     }
// });

// When a key is pressed down, set its state to true
document.addEventListener('keydown', function(event) {
    if (keys.hasOwnProperty(event.key)) { // Check if the key is one we care about
        keys[event.key] = true;
    }
});

// When a key is released, set its state to false
document.addEventListener('keyup', function(event) {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }
});

// let my_rect = new Rectangle(200,200,200,400,"red");

// my_rect.draw(context);

// Indian flag
// var box_width = window_width, box_height = box_width*0.75;
// box_height = box_height/3;
// var flag_x = 0, flag_y = 0;

// context.fillStyle = "orange";
// context.fillRect(flag_x,flag_y + box_height*0,box_width,box_height);

// context.fillStyle = "white";
// context.fillRect(flag_x,flag_y + box_height*1,box_width,box_height);

// context.fillStyle = "green";
// context.fillRect(flag_x,flag_y + box_height*2,box_width,box_height);

// context.beginPath();
// context.lineWidth = box_width/160;
// context.strokeStyle = "blue";
// context.arc(flag_x + box_width/2,flag_y + box_height*1.5,box_height*0.4,0,Math.PI*2,false);
// context.stroke();
// context.closePath();

