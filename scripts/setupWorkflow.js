const fs = require('fs');
const path = require('path');

// Paths for the source (in the package) and destination (in the user's repo)
const workflowSrcDir = path.resolve(__dirname, '../.github/workflows'); // Path to workflows in your package
const workflowDestDir = path.resolve(process.cwd(), '.github/workflows'); // Path to workflows in the user's repo

// Create the destination directory if it doesn't exist
if (!fs.existsSync(workflowDestDir)) {
  fs.mkdirSync(workflowDestDir, { recursive: true });
}

// Copy each workflow file from the package to the user's repository
fs.readdirSync(workflowSrcDir).forEach(file => {
  const srcFile = path.join(workflowSrcDir, file);
  const destFile = path.join(workflowDestDir, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied workflow file: ${file}`);
});
