const elves = [
  /* elf data */
];

// Part I
elves
  .split("\n\n")
  .map((elf) => elf.split("\n").reduce((a, b) => a + Number(b), 0))
  .sort((a, b) => b - a);

// Part II
const [a, b, c] = elves
  .split("\n\n")
  .map((elf) => elf.split("\n").reduce((a, b) => a + Number(b), 0))
  .sort((a, b) => b - a);
a + b + c;
