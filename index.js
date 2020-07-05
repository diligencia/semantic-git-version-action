const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    getBranchName()
        .then(name => {
            console.log(name);
            core.setOutput("branchname", name)
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

    if (output) {
        console.log('Got some sweet output...' + output);
    }

    return output;
}