function part1(input) {
  const instructions = input.split("\n").map((v) => +v.slice(5));
  let strengths = 0;
  let x = 1;
  let t = 0;
  for (let i = 1; i <= 220; i++) {
    if (
      i === 20 ||
      i === 60 ||
      i === 100 ||
      i === 140 ||
      i === 180 ||
      i === 220
    ) {
      strengths += i * x;
    }
    if (t !== 0) [x, t] = [x + t, 0];
    else t = instructions.shift();
  }
  return strengths;
}

function part2(input) {
  const instructions = input.split("\n").map((v) => +v.slice(5));
  let raster = [[], [], [], [], [], []];
  let x = 1;
  let t = 0;
  for (let i = 0; i < 240; i++) {
    const row = Math.floor(i / 40);
    const column = i % 40;
    raster[row][column] =
      x === column || x - 1 === column || x + 1 === column ? "#" : ".";
    if (t !== 0) [x, t] = [x + t, 0];
    else t = instructions.shift();
  }
  return raster.map((row) => console.log(row.join(""))).join("\n");
}

const fs = require("fs");
const buffer = fs.readFileSync(0).toString();
console.log(part1(buffer));
console.log(part2(buffer));
