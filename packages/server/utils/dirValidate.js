const fs = require('fs').promises;
const path = require('path');
const { log } = require('../logger');

// Define the directories to be validated and created if they don't exist
const dir = [
  "../public/images/",
  "../public/images/activities/",
  "../public/images/corousels/",
  "../public/images/personnels/",
  "../files/",
  "../log/"
];

async function ensureDirectoriesExist(directories = dir) {
  try {
    log("Dir Validation", "Validating important directories...", "info");
    for (const dir of directories) {
      const pathtoDir = path.resolve(__dirname, dir);
      await fs.mkdir(pathtoDir, { recursive: true });
      log("Dir Validation", `Directory validated ${pathtoDir} !`);
    }
  } catch (error) {
    log("Dir Validation", `Error validating directory ${error.message}`, "error");
  }
};

module.exports = { ensureDirectoriesExist };