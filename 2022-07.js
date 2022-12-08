function peek(stack) {
  return stack[stack.length - 1];
}

function push(stack, value) {
  return stack.push(value), value;
}

function pop(stack) {
  return stack.pop();
}

function sum(collection) {
  return collection.reduce((total, next) => total + next, 0);
}

function du([size, entries], fn) {
  const total = size + sum(entries.map((entry) => du(entry, fn)));
  fn(total);
  return total;
}

function parse(line) {
  const [_, __, fst, snd] = line.match(/(\$ )?(\S+)\s?(.*)/);
  if (fst === "cd" && snd === "..") return "out";
  if (fst === "cd" && snd !== "..") return "in";
  if (Number.isInteger(+fst)) return +fst;
  return "noop";
}

function getDirectorySizes(lines) {
  const root = [0, []];
  const stack = [root];
  for (const line of lines.split("\n")) {
    const op = parse(line);
    if (op === "noop") continue;
    else if (op === "in") push(stack, push(peek(stack)[1], [0, []]));
    else if (op === "out") pop(stack);
    else peek(stack)[0] += op;
  }
  const sizes = [];
  du(root[1][0], (v) => sizes.push(v));
  return sizes;
}

function part1(lines) {
  const sizes = getDirectorySizes(lines);
  return sum(sizes.filter((size) => size < 100000));
}

function part2(lines) {
  const sizes = getDirectorySizes(lines);
  sizes.sort((a, b) => a - b);
  const unused = 70000000 - peek(sizes);
  const required = 30000000 - unused;
  return sizes.find((size) => size >= required);
}

const fs = require("fs");
const buffer = fs.readFileSync(0).toString();
console.log(part1(buffer));
console.log(part2(buffer));
