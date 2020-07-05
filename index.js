const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    getBranchName()
        .then(name => {
            core.setOutput("branchname", name)

            const versionNumber = extractVersion(name);

            if (versionNumber) {
                core.setOutput('version', versionNumber);
                console.log(versionNumber);
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

    await execlib.exec('git', ['branch', '--show-current'], options);

    return output;
}

function extractVersion(branch) {
    const regexp = /([0-9]\.[0-9]\.[0-9])|([0-9]\.[0-9])|([0-9])/g;
    const matches = branch.match(regexp);
    
    return matches ? matches.shift() : null;
}