const canvas = document.getElementById("sketchPad");
const ctx = canvas.getContext("2d");
const redBtn = document.getElementById("redBtn");
const blueBtn = document.getElementById("blueBtn");
const eraserBtn = document.getElementById("eraserBtn");
const greenBtn = document.getElementById("greenBtn");
const blackBtn = document.getElementById("blackBtn");
let drawing = false;
let currentColorDisplay = "black";
const currentColor = document.getElementById("currentColor");

const setColor = (color) => {
  ctx.globalCompositeOperation = "source-over"; // reset drawing mode
  currentColorDisplay = color;
  if (color === "white") {
    currentColor.textContent = "White (Eraser)";
  } else {
    currentColor.textContent = (color.charAt(0).toUpperCase() + color.slice(1)).trim();
  }
};

blackBtn.addEventListener("click", () => setColor("black"));
redBtn.addEventListener("click", () => setColor("red"));
blueBtn.addEventListener("click", () => setColor("blue"));
greenBtn.addEventListener("click", () => setColor("green"));

eraserBtn.addEventListener("click", () => {
  ctx.globalCompositeOperation = "destination-out"; // true erase
  currentColor.textContent = "Eraser";
});

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// set initial background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// set initial color
setColor("black");

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = currentColorDisplay;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});
