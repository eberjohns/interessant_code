const canvas = document.getElementById("canvas");

const size = 10;

let width = window.innerWidth - size - (window.innerWidth%size);
let height = window.innerHeight - size - (window.innerHeight%size);

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
    data[i][j] = 1;
}

let isMouseDown = false;

// Mouse Down (start holding)
canvas.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        isMouseDown = true;
        updateMouseGridPosition(event);
    }
});

// Mouse Up (stop holding)
document.addEventListener('mouseup', function(event) {
    if (event.button === 0) {
        isMouseDown = false;
    }
});

// Mouse Move (track current grid cell)
canvas.addEventListener('mousemove', function(event) {
    if (isMouseDown) {
        updateMouseGridPosition(event);
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
    // Place sand grain while mouse is held down
    if (isMouseDown) {
        if (mouseGridY >= 0 && mouseGridY < row - 1 && data[mouseGridY][mouseGridX] === 0) {
            data[mouseGridY][mouseGridX] = 1;
        }
    }

    // Gravity logic
    for (let i = row - 2; i >= 0; i--) {
        for (let j = 0; j < col; j++) {
            if (data[i][j] === 1) {
                if (data[i + 1][j] === 0) {
                    data[i + 1][j] = 1;
                    data[i][j] = 0;
                }
            }
        }
    }
}

ctx.strokeStyle = "black";

function draw(){
    for(i=0;i<row;i++){
        for(let j=0;j<col;j++){
            if(data[i][j]) ctx.fillStyle = "red";//ground color
            else ctx.fillStyle = "blue";
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
