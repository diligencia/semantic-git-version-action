const core = require('@actions/core');
const { Context } = require('@actions/github/lib/context');

try {
    core.setOutput("branchname", "static branch name");
} catch (errror) {
    core.setFailed(error.message);
}