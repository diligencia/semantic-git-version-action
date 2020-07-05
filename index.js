const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    const branchName = getBranchName();
    core.setOutput("branchname", branchName);

    if (branchName) {
        console.log('We got it! : ' + branchName);
    }
} catch (error) {
    core.setFailed(error.message);
}

async function getBranchName() {
    let output = '';
    const options = {
        listeners: {
            stdout: (data) => {
                output += data.toString();
                console.log(data);
            }
        }
    };

    await execlib.exec('git', ['branch'], options);

    if (output) {
        console.log('Got some sweet output...' + output);
    }

    return output;
}