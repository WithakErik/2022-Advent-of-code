// Part 1

const input = require("./input.js");
const MAX_SIZE = 100_000;

const structure = {};

const calculateFolderStuff = ({ path, linesLeft }) => {
  if (!linesLeft.length) {
    return;
  }
  const [line] = linesLeft.splice(0, 1);
  if (line.match(/\d+/)) {
    // We have file size info
    const fileSize = Number(line.match(/\d+/)[0]);
    if (structure[path]) {
      // We already have this top most directory
      structure[path].size += fileSize;
    } else {
      structure[path] = { size: fileSize };
    }
    return calculateFolderStuff({
      linesLeft,
      path,
    });
  }
  if (line.match(/dir/) || line.match(/\$\sls/)) {
    // noop
    return calculateFolderStuff({ linesLeft, path });
  }
  if (line.match(/\$\scd\s\.\./)) {
    // Go up a directory
    const directories = path.split("/");
    directories.pop();
    const newPath = directories.join("/");
    return calculateFolderStuff({ path: newPath, linesLeft });
  }
  if (line.match(/\$\scd\s\w*/)) {
    // Navigate to a directory
    const directory = line.split(" ")[2];
    const isRoot = directory === "/";
    const newPath = `${isRoot || path === "/" ? "" : path}/${
      isRoot ? "" : directory
    }`;
    return calculateFolderStuff({
      path: newPath,
      linesLeft,
    });
  }
};

calculateFolderStuff({ linesLeft: input.split("\n") });
console.log(structure);

const answer = Object.values(structure).reduce((total, { size }) => {
  if (size <= MAX_SIZE) {
    total += size;
  }
  return total;
}, 0);

console.log(answer); // 1538808 = incorrect

// Part 2
