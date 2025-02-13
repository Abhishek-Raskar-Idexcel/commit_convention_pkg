const { CLIEngine } = require('@commitlint/cli');
const fs = require('fs');
const path = require('path');

const lintCommits = () => {
    console.log("Checking commit messages...");
    const cli = new CLIEngine({
        config: path.resolve(__dirname, 'commitlint.config.js')
    });

    // Read commit messages from a file instead of process.argv
    const messages = fs.readFileSync(process.argv[2], 'utf-8')
        .split('\n')
        .filter(Boolean); // Remove any empty lines

    const results = cli.executeOnText(messages.join('\n')); // Use executeOnText

    if (results.errorCount > 0) {
        console.error('Commitlint errors found!');
        process.exit(1);
    } else {
        console.log('Commitlint passed!');
    }
};

module.exports = lintCommits;
