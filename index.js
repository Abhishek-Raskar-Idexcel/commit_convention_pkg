const { lint } = require('@commitlint/lint');
const load = require('@commitlint/load');
const path = require('path');

const lintCommits = async () => {
    console.log("Checking commit messages...");
    const config = await load({
        extends: ['@commitlint/config-conventional']
    });

    // This assumes commit messages are passed in as an argument
    const messages = process.argv.slice(2);

    for (const message of messages) {
        const result = await lint(message, config.rules);
        if (result.errors.length > 0) {
            console.error('Commitlint errors found!');
            console.error(result.errors);
            process.exit(1);
        }
    }

    console.log('Commitlint passed!');
};

module.exports = lintCommits;