const glob = require('glob')
const fs = require('fs')
const shell = require('shelljs')
const traverse = require('traverse')
const colors = require('colors')

glob('C:\\Users\\*\\\.npmrc', (err, filePath) => {
    if (err) {
        console.log(err)
        return
    }

    const npmConfig = fs.readFileSync(filePath[0], 'utf-8')
    const passRegExp = /_auth="(.*?[^\\])"/
    const match = npmConfig.match(passRegExp)

    //TODO: extract user from the config, not from arguments

    if (match) {
        const [user, password] = process.argv.slice(2)
        const newEncodedPassword = Buffer.from(`${user}:${password}`).toString('base64')
        const newAuthString = `_auth="${newEncodedPassword}"`

        const newConfigString = match['input'].replace(match[0], newAuthString)

        fs.writeFileSync(filePath[0], newConfigString)
    }


    // console.log(npmConfig)
    // console.log(npmConfig.match(passRegExp))
})
