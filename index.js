const core = require('@actions/core');
const execlib = require('@actions/exec');

try {
    getBranchName()
        .then(name => {
            core.setOutput("branchname", name)

            const versionNumber = extractVersion(name);

            if (versionNumber) {
                core.setOutput('VERSION', versionNumber.version);
                core.setOutput('MAJOR_VERSION', versionNumber.major);
                core.setOutput('MINOR_VERSION', versionNumber.minor);
                core.setOutput('PATCH_VERSION', versionNumber.patch);
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

    var versions = null;
    
    if (matches) {
        const version = matches.shift();
        const versionParts = version.split('.');

        const major = versionParts[0];
        const minor = versionParts.length >= 2 ? versionParts[1] : null;
        const patch = versionParts.length >= 3 ? versionParts[2] : null;

        versions = {
            version: version,
            major: major,
            minor: minor,
            patch: patch
        }
    }
    
    return versions
}