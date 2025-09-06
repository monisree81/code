// Canvas Setup
const canvas = document.getElementById("sketchPad");
const ctx = canvas.getContext("2d");

// Buttons
const redBtn = document.getElementById("redBtn");
const blueBtn = document.getElementById("blueBtn");
const greenBtn = document.getElementById("greenBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const currentColorDisplay = document.getElementById("currentColorDisplay");

// Initial Drawing Settings
let drawing = false;
let currentColor = "black";
ctx.strokeStyle = currentColor;
ctx.lineWidth = 3;
ctx.lineCap = "round";

// Helper: Update Current Color
function setColor(color) {
  currentColor = color;
  ctx.strokeStyle = currentColor;
  currentColorDisplay.textContent = color.charAt(0).toUpperCase() + color.slice(1);
}

// Drawing Functions
let lastX, lastY;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));

// Color Buttons Events
redBtn.addEventListener("click", () => setColor("red"));
blueBtn.addEventListener("click", () => setColor("blue"));
greenBtn.addEventListener("click", () => setColor("green"));
eraserBtn.addEventListener("click", () => setColor("white"));

// Clear Canvas
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setColor("black"); // Reset to black
});
