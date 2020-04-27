const glob = require('glob')
const fs = require('fs')
const colors = require('colors')


const changeNpmPassword = password => {
    // TODO: create a universal path
    glob('C:\\Users\\*\\\.npmrc', (err, filePath) => {
        if (err) {
            console.log(`${err}`.red)
            return
        }

        if (filePath.length === 0) {
            console.log('.npmrc is not found'.red)
            return 
        }

        const npmConfig = fs.readFileSync(filePath[0], 'utf-8')
        const authMatch = matchAuthString(npmConfig)
        const userMatch = extractUserName(npmConfig)

        if (authMatch && userMatch) {
            
            console.log('Encrypt npm password: START'.yellow)
            const newEncodedPassword = Buffer.from(`${userMatch[0]}:${password}`).toString('base64')
            console.log(newEncodedPassword)
            console.log('Encrypt npm password: DONE'.green)
            const newAuthString = `_auth="${newEncodedPassword}"`

            const newConfigString = authMatch['input'].replace(authMatch[0], newAuthString)
            fs.writeFileSync(filePath[0], newConfigString)

            console.log('Update .npmrc: DONE'.green)
        }
    })
}

const matchAuthString = npmConfig => {
    const passRegExp = /_auth="(.*?[^\\])"/
    return npmConfig.match(passRegExp)
}

const extractUserName = npmConfig => {
    const userRegExp = /(?<=email=)(.*?)(?=@)/
    return npmConfig.match(userRegExp)
}

module.exports = changeNpmPassword
