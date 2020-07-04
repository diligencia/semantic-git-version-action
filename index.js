const core = require('@actions/core');
const exec = require('@actions/exec');

try {
    const options ={};
    let output = '';
    options.listeners = {
        stdout: (data) => {
            output += data.toString();
        } 
    }
    exec('git', 'branch', options)
    core.setOutput("branchname", output);
} catch (errror) {
    core.setFailed(error.message);
}