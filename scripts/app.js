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

function RGBToHSL(rgb) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);
  console.log(rgb);

  for (let R in rgb) {
    let r = rgb[R];
    if (r.indexOf("%") > -1)
      rgb[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255);
  }

  // Make r, g, and b fractions of 1
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  l -= 10;

  return "hsl(" + h + "," + s + "%," + l + "%)";
}

const blocks = document.querySelectorAll(".blocks");
blocks.forEach(block => {
  block.addEventListener("mouseover", e => {
    // console.log(e.target.classList.contains(".colored"));
    if (!e.target.classList.contains(".colored")) {
      e.target.style.backgroundColor = randomColor();
    } else {
      e.target.style.backgroundColor = RGBToHSL(e.target.style.backgroundColor);
      console.log(RGBToHSL(e.target.style.backgroundColor));
    }
    e.target.classList.add(".colored");
  });
});
