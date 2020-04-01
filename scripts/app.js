/* eslint-disable no-extra-parens */
/* eslint no-extra-parens: "error" */

const container = document.querySelector("#container");
const columnSize = 16;
const rowSize = 16;
const sum = columnSize * rowSize;
container.style.gridTemplateColumns = `repeat(${columnSize},1fr)`;
container.style.gridTemplateRows = `repeat(${rowSize},1fr)`;

function createElements() {
  for (let i = 0; i < sum; i++) {
    const gridElements = document.createElement("div");
    gridElements.classList.add("blocks");
    container.appendChild(gridElements);
  }
}

createElements();

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)},${Math.floor(
    Math.random() * 100
  )}%,${Math.floor(Math.random() * 100)}%`;
}

function darkerShade(rgb) {
  const sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);
  console.log(rgb);

  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

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

const blocks = document.querySelectorAll(".blocks");
blocks.forEach(block => {
  block.addEventListener("mouseover", e => {
    if (!e.target.classList.contains(".colored")) {
      e.target.style.backgroundColor = randomColor();
    } else {
      e.target.style.backgroundColor = darkerShade(
        e.target.style.backgroundColor
      );
      console.log(darkerShade(e.target.style.backgroundColor));
    }
    e.target.classList.add(".colored");
  });
});
