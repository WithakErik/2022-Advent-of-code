// Part 1
const input = require("./input");
const { 0: base, 2: moves } = input.split(/([\s\d]*\n\n)/);
const parsedBase = base
  .replace(/[\[\]]/g, " ")
  .split("\n")
  .filter(Boolean)
  .map((row) => row.match(/.{1,4}/g).map((letter) => letter.trim()))
  .reduce((all, current) => {
    current.forEach((letter, index) => {
      if (letter === "") return;
      all[index + 1]
        ? all[index + 1].push(letter)
        : (all[index + 1] = [letter]);
    });
    return all;
  }, {});

const parsedMoves = moves.split("\n").reduce((all, current) => {
  const { 1: size, 3: fromStack, 5: toStack } = current.split(" ");
  all.push({ size, fromStack, toStack });
  return all;
}, []);

const finalStacks = parsedMoves.reduce((all, { size, fromStack, toStack }) => {
  all[toStack].unshift(...all[fromStack].splice(0, size).reverse());
  return all;
}, JSON.parse(JSON.stringify(parsedBase)));

const answer = Object.values(finalStacks)
  .map((value) => value[0])
  .join("");

console.log(answer);

// Part 2
const finalStacks2 = parsedMoves.reduce((all, { size, fromStack, toStack }) => {
  all[toStack].unshift(...all[fromStack].splice(0, size));
  return all;
}, JSON.parse(JSON.stringify(parsedBase)));

const answer2 = Object.values(finalStacks2)
  .map((value) => value[0])
  .join("");

console.log(answer2);
