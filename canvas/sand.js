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

    // Convert pixel to grid cell coordinates
    const gridX = Math.floor(mouseX / size) * size;
    const gridY = Math.floor(mouseY / size) * size;

    draw_grain(gridX,gridY);
}

// document.addEventListener('click',function(event){
//     //when left clicked get the x, y to draw a rect (sand grain)
//     if(event.button === 0){
//         console.log("Left mouse clicked");
//         const rect = canvas.getBoundingClientRect();
//         const mouseX = event.clientX - rect.left;
//         const mouseY = event.clientY - rect.top;

//         // Convert pixel to grid cell coordinates
//         const gridX = Math.floor(mouseX / size) * size;
//         const gridY = Math.floor(mouseY / size) * size;

//         // if(!data[gridY/size][gridX/size]) {
//         //     data[gridY/size][gridX/size] = 1;
//         // }
//         draw_grain(gridX,gridY);
//     }
// });

function draw_grain(x,y){
    //don't draw if the cell is already 1(1 represents ground and sand grain)
    if(data[y/size][x/size]) return;

    ctx.fillStyle = "red";//grain color
    ctx.fillRect(x, y, size, size);
    let dataY = y/size;
    let dataX = x/size;
    data[dataY][dataX] = 1;

    //update to fall if the bottom is not 1
    if(data[dataY+1][dataX]) return;
    data[dataY][dataX] = 0;
    ctx.fillStyle = "blue";//color is canvas color as the grain fell
    ctx.fillRect(x, y, size, size);
    draw_grain(x,y+size);//draw grain under current one
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

draw();

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    update();

    requestAnimationFrame(animate);
}

// animate();
