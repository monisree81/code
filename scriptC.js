// Get canvas and context
const canvas = document.getElementById("sketchPad");
const ctx = canvas.getContext("2d");

// Get color buttons
const redBtn = document.getElementById("redBtn");
const blueBtn = document.getElementById("blueBtn");
const greenBtn = document.getElementById("greenBtn");
const eraserBtn = document.getElementById("eraserBtn");
const blackBtn = document.getElementById("blackBtn");
const clearBtn = document.getElementById("clearBtn");

// Track drawing state and color
let drawing = false;
let currentColorDisplay = "black";

// Show current color
const currentColor = document.getElementById("currentColor");

const setColor = (color) => {
  currentColorDisplay = color;
  if (color === "white") {
    currentColor.textContent = "White (Eraser)";
  } else {
    currentColor.textContent =
      color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
  }
};

// Button events
blackBtn.addEventListener("click", () => setColor("black"));
redBtn.addEventListener("click", () => setColor("red"));
blueBtn.addEventListener("click", () => setColor("blue"));
greenBtn.addEventListener("click", () => setColor("green"));
eraserBtn.addEventListener("click", () => setColor("white"));

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Drawing events
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
