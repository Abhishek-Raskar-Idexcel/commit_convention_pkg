const fs = require('fs');
const path = require('path');

// Source: Location in the package itself
const workflowSrcDir = path.resolve(__dirname, '../.github/workflows');

// Destination: Force it to be at the root of the user's project
const workflowDestDir = path.resolve(process.cwd(), '../../.github/workflows');

// Ensure the destination directory exists
if (!fs.existsSync(workflowDestDir)) {
  fs.mkdirSync(workflowDestDir, { recursive: true });
  console.log(`Created directory: ${workflowDestDir}`);
}

// Copy workflow files from the package to the user's project root
fs.readdirSync(workflowSrcDir).forEach(file => {
  const srcFile = path.join(workflowSrcDir, file);
  const destFile = path.join(workflowDestDir, file);

  // Check if the file already exists at the destination
  if (!fs.existsSync(destFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied workflow file: ${file}`);
  } else {
    console.log(`Workflow file already exists and was not overwritten: ${file}`);
  }
});
