// Part 1
const input = require("./input.js");

const regularExpression = (length) => {
  const expression = new Array(length)
    .fill("")
    .map(
      (...{ 1: index }) =>
        `(` +
        new Array(index)
          .fill("")
          .map((...{ 1: index2 }) => `(?!\\${index2 + 1})`)
          .join("") +
        `.)`
    )
    .join("");
  return new RegExp(expression);
};

const answer = input.match(regularExpression(4)).index + 4;

console.log(answer);

// Part 2
const answer2 = input.match(regularExpression(14)).index + 14;

console.log(answer2);
