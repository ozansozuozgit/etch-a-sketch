const container = document.querySelector("#container");
const btnReset = document.querySelector("#btn-reset");
let userInput = 16;
let gridSize = userInput ** 2;

function createElements() {
  container.style.gridTemplateColumns = `repeat(${userInput},1fr)`;
  container.style.gridTemplateRows = `repeat(${userInput},1fr)`;
  for (let i = 0; i < gridSize; i++) {
    const gridElements = document.createElement("div");
    gridElements.classList.add("blocks");
    container.appendChild(gridElements);
  }
}

createElements();
let blocks = document.querySelectorAll(".blocks");
addEventListener();

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)},${Math.floor(
    Math.random() * 100
  )}%,${Math.floor(Math.random() * 100)}%`;
}

function darkerShade(rgb) {
  rgb = rgb.substring(4).split(")")[0].split(","); // make an array of each color

  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

  // subtract values by 20% to get a darker shade
  if (r >= 0) {
    r -= r * 0.2;
  }
  if (g >= 0) {
    g -= g * 0.2;
  }
  if (b >= 0) {
    b -= b * 0.2;
  }

  return `rgb(${r},${g},${b})`;
}

function addEventListener() {
  blocks.forEach(block => {
    block.addEventListener("mouseover", e => {
      // Only color blocks that have not been colored
      if (!e.target.classList.contains(".colored")) {
        e.target.style.backgroundColor = randomColor();
      } else {
        e.target.style.backgroundColor = darkerShade(
          e.target.style.backgroundColor
        );
      }
      // Tag block as colored
      e.target.classList.add(".colored");
    });
  });
}

btnReset.addEventListener("click", () => {
  userInput = prompt("Enter size. Ex:(4)=4x4 container");
  gridSize = userInput ** 2;
  container.innerHTML = "";
  createElements();
  blocks = document.querySelectorAll(".blocks");
  addEventListener();
});
