const core = require('@actions/core')
const github = require('@actions/github')

try {
    // 'base-version' input defined in action metadata file
    const baseVersion = core.getInput('base-version')
    console.log(`Base version: ${baseVersion}`)
    
    // 'version' output defined in action metadata file
    const version = `v${baseVersion}-beta`
    core.setOutput('version', version)

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)

} catch (error) {
    core.setFailed(error.message)
}
