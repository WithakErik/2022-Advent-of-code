// Part 1
const input = require("./input");
const pairs = input.split("\n");

const oneContainsTheOther = (first, second) => {
  const [firstStart, firstEnd] = first.split("-").map(Number);
  const [secondStart, secondEnd] = second.split("-").map(Number);

  const firstContainsSecond =
    secondStart >= firstStart && secondEnd <= firstEnd;
  const secondContainsFirst =
    firstStart >= secondStart && firstEnd <= secondEnd;
  return firstContainsSecond || secondContainsFirst;
};

const answer = pairs.reduce((all, current) => {
  const [first, second] = current.split(",");
  if (oneContainsTheOther(first, second)) {
    all++;
  }
  return all;
}, 0);

console.log(answer);

// Part 2
const someOverlap = (first, second) => {
  const [firstStart, firstEnd] = first.split("-").map(Number);
  const [secondStart, secondEnd] = second.split("-").map(Number);

  return (
    (firstStart >= secondStart && firstStart <= secondEnd) ||
    (firstEnd >= secondStart && firstEnd <= secondEnd) ||
    (secondStart >= firstStart && secondStart <= firstEnd) ||
    (secondEnd >= firstStart && secondEnd <= firstEnd)
  );
};
const answer2 = pairs.reduce((all, current) => {
  const [first, second] = current.split(",");
  if (someOverlap(first, second)) {
    all++;
  }
  return all;
}, 0);

console.log(answer2);
