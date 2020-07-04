const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    const branchName = getBranchName();
    core.setOutput("branchname", branchName);
} catch (error) {
    core.setFailed(error.message);
}

async function getBranchName() {
    let output = '';
    const options = {
        listeners: {
            stdout: (data) => output += data.toString()
        },
        cwd: './'
    };

    await execlib.exec('git', ['branch'], options);

    return output;
}