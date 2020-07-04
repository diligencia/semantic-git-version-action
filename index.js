const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    let output = '';
    const options = {
        listeners: {
            stdout: (data) => output += data.toString()
        }
    };

    yield execlib.exec('git', ['branch'], options)
    core.setOutput("branchname", output);
} catch (error) {
    core.setFailed(error.message);
}