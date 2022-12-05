// Part 1
const input = require("./input");

const FIRST_LOWER_CASE_CHAR_CODE = 97;
const LOWER_CASE_OFFSET = 96;
const UPPER_CASE_OFFSET = 38;

const getItemValue = (charCode) =>
  charCode >= FIRST_LOWER_CASE_CHAR_CODE
    ? charCode - LOWER_CASE_OFFSET
    : charCode - UPPER_CASE_OFFSET;

const parsedInput = input
  .split("\n")
  .map((current) => [
    current.substring(0, current.length / 2),
    current.substring(current.length / 2),
  ]);

const answer = parsedInput.reduce((all, [first, second]) => {
  const regExp = new RegExp(`[${first}]`);
  const match = second.match(regExp)?.[0];
  if (match) {
    const charCode = match.charCodeAt(0);
    const value = getItemValue(charCode);
    all += value;
  }
  return all;
}, 0);

console.log(answer);

// Part 2
const parsedInput2 = input.split("\n").reduce((all, current, index) => {
  if (index % 3 === 0) {
    all.unshift([current]);
  } else {
    all[0].push(current);
  }
  return all;
}, []);

const answer2 = parsedInput2.reduce((all, [first, second, third]) => {
  const regExp = new RegExp(`[${first}]`, "g");
  const match = second.match(regExp);
  const regExp2 = new RegExp(`[${match}]`, "g");
  const match2 = third.match(regExp2)?.[0];
  if (match2) {
    const charCode = match2.charCodeAt(0);
    const value = getItemValue(charCode);
    all += value;
  }
  return all;
}, 0);

console.log(answer2);
