const { CLIEngine } = require('@commitlint/cli');
const path = require('path');

const lintCommits = () => {
    console.log("Checking commit messages...");
    const cli = new CLIEngine({
        config: path.resolve(__dirname, 'commitlint.config.js')
    });

    // This assumes commit messages are passed in as an argument
    const messages = process.argv.slice(2);
    const results = cli.executeOnFiles(messages);

    if (results.errorCount > 0) {
        console.error('Commitlint errors found!');
        process.exit(1);
    } else {
        console.log('Commitlint passed!');
    }
};

module.exports = lintCommits;
