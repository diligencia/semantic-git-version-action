const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    getBranchName()
        .then(name => {
            core.setOutput("branchname", name)

            const versionNumber = extractVersion(name);

            if (versionNumber) {
                core.setOutput('version', versionNumber);
            }
        });
} catch (error) {
    core.setFailed(error.message);
}

async function getBranchName() {
    let output = '';
    const options = {
        listeners: {
            stdout: (data) => {
                output += data.toString();
            }
        }
    };

    await execlib.exec('git', ['branch'], options);

    return output;
}

function extractVersion(branch) {
    const regexp = /^([0-9]\.[0-9]\.[0-9])|([0-9]\.[0-9])|([0-9])$/;
    return branch.match(regexp);
}