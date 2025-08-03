const canvas = document.getElementById("canvas");

const size = 10;

let world_color = "white";
let clr_iter = Math.random()*350;

let width = window.innerWidth - size - (window.innerWidth%size);
let height = window.innerHeight - size - (window.innerHeight%size) - 80;

canvas.width = width;
canvas.height = height;

canvas.style.background = "black";

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let data = [];

let row = height/size;
let col = width/size;

//initialising world data
let i=0;
for(;i<row-1;i++){
    data[i] = [];
    for(let j=0;j<col;j++){
        data[i][j] = 0;
    }
}
data[i] = [];
for(let j=0;j<col;j++){
    data[i][j] = 360;
}
clr_iter++;

let isMouseDown = false;
let isRMouseDown = false;

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});


// Mouse Down (start holding)
canvas.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        isMouseDown = true;
        updateMouseGridPosition(event);
    } else if (event.button === 2) {  // Right click to place wall
        isRMouseDown = true;
        updateMouseGridPosition(event);
        data[mouseGridY][mouseGridX] = 360;  // 360 for wall block
    }
});

// Mouse Up (stop holding)
document.addEventListener('mouseup', function(event) {
    if (event.button === 0) {
        isMouseDown = false;
    } else if (event.button === 2) {  // Right click to place wall
        isRMouseDown = false;
    }
});

// Mouse Move (track current grid cell)
canvas.addEventListener('mousemove', function(event) {
    if (isMouseDown) {
        updateMouseGridPosition(event);
    }
    if (isRMouseDown) {
        updateMouseGridPosition(event);
        data[mouseGridY][mouseGridX] = 360;
    }
});

function updateMouseGridPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    mouseGridX = Math.floor(mouseX / size);
    mouseGridY = Math.floor(mouseY / size);
}

// Gravity Update + Spawn new grain if mouse is down
function update() {
    if(clr_iter>359) clr_iter = 2;
    // Place sand grain while mouse is held down
    if (isMouseDown) {
        if (data[mouseGridY][mouseGridX] === 0) {
            data[mouseGridY][mouseGridX] = clr_iter++;
        }
    }

    // Gravity logic
    for (let i = row - 2; i >= 0; i--) {
        for (let j = 0; j < col; j++) {
            //get grain cell to move
            if (data[i][j] > 0 && data[i][j]<360) {
                // Try to fall straight down
                if (data[i + 1][j] === 0) {
                    data[i + 1][j] = data[i][j];
                    data[i][j] = 0;
                } else {
                    // Prepare for sideways spreading
                    let directions = [];
                    // Check right boundary & availability
                    if (j < col - 1 && data[i + 1][j + 1] === 0) directions.push(1);
                    // Check left boundary & availability
                    if (j > 0 && data[i + 1][j - 1] === 0) directions.push(-1);

                    if (directions.length > 0) {
                        // Randomly pick a direction to spread
                        let dir = directions[Math.floor(Math.random() * directions.length)];
                        data[i + 1][j + dir] = data[i][j];
                        data[i][j] = 0;
                    }
                }
            }
        }
    }
}

ctx.strokeStyle = "black";

function draw(){
    for(i=0;i<row;i++){
        for(let j=0;j<col;j++){
            if(data[i][j]) ctx.fillStyle = `hsl(${data[i][j]}, 100%, 50%)`;
            else ctx.fillStyle = world_color;
            ctx.fillRect(j*size, i*size, size, size);
            // ctx.strokeRect(j*size, i*size, size, size);//to visualise grid
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    update();

    requestAnimationFrame(animate);
}

animate();

//add velocity to sand particles and make it interactable also make it more smooth
