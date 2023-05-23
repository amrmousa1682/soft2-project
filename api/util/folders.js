const fs = require("fs");
const path = require("path");

exports.addDataFolder = () => {
  let classesFolder = path.join(__dirname, "..", "data");
  try {
    fs.rmSync(classesFolder, { recursive: true, force: true });
    fs.mkdirSync(classesFolder);
  } catch (err) {}
};
