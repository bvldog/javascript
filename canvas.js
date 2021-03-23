const canvas = document.getElementById('jsCanvas'); 
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const rangeBtn = document.getElementById('pencilWidth');
const changeMode = document.getElementById('changeMode');
const saveBtn = document.getElementById('saveBtn');


const DEFAULT_COLOR = "#212121"

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle =  DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR; 
ctx.lineWidth = 2.5;

let painting = false;
let isIn = false; 
let filling = false; 

function stopPainting() { 
        painting = false;
}

function startPainting() {
        console.log("mouseDown");
        painting = true;
}

function onMouseMove(e){
        console.log(e);
        const x = e.offsetX;
        const y = e.offsetY;
        if(painting !== true) {
                ctx.beginPath();
                ctx.moveTo(x, y);
        } else if(painting && isIn){ 
                ctx.lineTo(x, y);
                ctx.stroke();
        }
}

function mouseLeave() {
        isIn = false; 
        ctx.closePath();
}

function enterMouse() { 
        console.log("mouse entered");
        isIn = true;
        ctx.beginPath();
}

function handleColor(e) { 
        const color = e.target.style.backgroundColor
        ctx.strokeStyle =  color;
        ctx.fillStyle = color;
}
function rangeHandler(e) { 
        const rangeValue = e.target.value; 
        console.log(rangeValue);
        ctx.lineWidth = rangeValue;
}

function changeModeHandler() { 
        if(filling === true) {
                filling = false;
                changeMode.innerText = "Fill"
        } else { 
                filling = true; 
                changeMode.innerText = "Paint"
        }
}

function fillHandler(e) { 
        if(filling) { 

                ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
}

function saveImageHandler() { 
        const image = canvas.toDataURL("image/png"); 
        const link = document.createElement('a');
        link.href = image;
        link.download = "YourPaint";
        link.click();
}

if(canvas) {
        console.log("canvas on");
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", mouseLeave);
        canvas.addEventListener("mouseenter", enterMouse);
        canvas.addEventListener("click", fillHandler);
}

Array.from(colors).forEach(color => {
        color.addEventListener("click", handleColor);
        console.log(color);
});


if(rangeBtn) { 
        rangeBtn.addEventListener("input", rangeHandler);

}

if(changeMode) { 
        changeMode.addEventListener("click", changeModeHandler);
}

if(saveBtn) {
        saveBtn.addEventListener("click", saveImageHandler);
}
