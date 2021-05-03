module.exports = {
    apps: [
        {
            name: 'frontend',
            cwd: './frontend',
            script: 'npm',
            args: 'run serve'
        },
        {
            name: 'backend',
            cwd: './backend',
            script: 'npm',
            args: 'run serve'
        }
    ]
}