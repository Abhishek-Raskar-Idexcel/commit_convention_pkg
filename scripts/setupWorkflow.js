const fs = require('fs');
const path = require('path');

// Source: Location of the files in your package (commitlint.config.js, .github folder, etc.)
const commitlintConfigSrc = path.resolve(__dirname, '../commitlint.config.js');
const workflowSrcDir = path.resolve(__dirname, '../.github/workflows');

// Destination: Ensure it's at the root of the user's repository (outside of node_modules)
const commitlintConfigDest = path.resolve(process.cwd(), '../../commitlint.config.js');
const workflowDestDir = path.resolve(process.cwd(), '../../.github/workflows');

// Ensure the destination directory for workflows exists (in the root of the project)
if (!fs.existsSync(workflowDestDir)) {
  fs.mkdirSync(workflowDestDir, { recursive: true });
  console.log(`Created directory: ${workflowDestDir}`);
}

// Copy commitlint.config.js to the root of the user's project if not already present
if (!fs.existsSync(commitlintConfigDest)) {
  fs.copyFileSync(commitlintConfigSrc, commitlintConfigDest);
  console.log('Copied commitlint.config.js to the root of the repository');
} else {
  console.log('commitlint.config.js already exists, skipping copy');
}

// Copy workflow files from your package to the user's project (under .github/workflows)
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
