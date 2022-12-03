// Part 1
const input = require("./input");
const map = {
  A: { value: 1, win: "Z", draw: "X", lose: "Y" }, //  Rock
  B: { value: 2, win: "X", draw: "Y", lose: "Z" }, //  Paper
  C: { value: 3, win: "Y", draw: "Z", lose: "X" }, //  Scissors
  X: { value: 1, win: "C", draw: "A" }, //  Rock
  Y: { value: 2, win: "A", draw: "B" }, //  Paper
  Z: { value: 3, win: "B", draw: "C" }, //  Scissors
};

const calculatePoints = (all, current) => {
  const [them, me] = current.split(" ");
  if (map[me].win === them) {
    // Win
    all += 6 + map[me].value;
  } else if (map[me].draw === them) {
    // Draw
    all += 3 + map[me].value;
  } else {
    // Lose
    all += map[me].value;
  }
  return all;
};

const score = input.reduce(calculatePoints, 0);
console.log("SCORE:", score);

// Part 2
const score2 = input
  .map((choices) => {
    const [them, me] = choices.split(" ");
    switch (me) {
      case "X":
        // Should Lose
        return `${them} ${map[them].win}`;
      case "Y":
        // Should Draw
        return `${them} ${map[them].draw}`;
      // Should Win
      default:
        return `${them} ${map[them].lose}`;
    }
  })
  .reduce(calculatePoints, 0);
console.log("SCORE:", score2);
