// Part 1

const input = require("./input.js");
const MAX_SIZE = 100_000;
const UNUSED_NEEDED = 30_000_000 - 21_618_835;
const structure = {};

const addFileSizeToDirectoryAndParentDirectories = ({ fileSize, path }) => {
  const parentDirectories = path.split("/");
  console.log(parentDirectories);

  parentDirectories.forEach((directory) => {
    // Grab the path name up to and including the directory
    const currentPath =
      path.substring(0, path.indexOf(directory) + directory.length) || "/";

    // Check if we already have this path in our structure object
    if (structure[currentPath]) {
      structure[currentPath] += fileSize;
    } else {
      structure[currentPath] = fileSize;
    }
  });
};

const calculateFolderStuff = ({ path, linesLeft }) => {
  if (!linesLeft.length) {
    return;
  }

  const [line] = linesLeft.splice(0, 1);

  if (line.match(/\d+/)) {
    // We have file size info
    const fileSize = Number(line.match(/\d+/)[0]);

    addFileSizeToDirectoryAndParentDirectories({ fileSize, path });

    return calculateFolderStuff({
      linesLeft,
      path,
    });
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

  // This is the fallback for lines we don't care about ("dir foo" and "$ ls")
  return calculateFolderStuff({ linesLeft, path });
};

calculateFolderStuff({ linesLeft: input.split("\n") });
console.log(structure);

const answer = Object.values(structure).reduce((total, size) => {
  return size <= MAX_SIZE ? total + size : total;
}, 0);

console.log(answer);

// Part 2
const answer2 = Object.values(structure).reduce((total, size) => {
  console.log(total, size);
  return size >= UNUSED_NEEDED && size < total ? size : total;
}, Infinity);

console.log(answer2);
