const glob = require('glob')
const parser = require('fast-xml-parser')
const fs = require('fs')
const shell = require('shelljs')
const traverse = require('traverse')
const Js2XmlParser = require("fast-xml-parser").j2xParser
const colors = require('colors')

const passwordArg = process.argv[2]


// TODO: create a universal path
glob('C:\\Users\\*\\.m2\\*.xml', (err, filesPaths) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Looking for maven settings files: DONE'.green)

    const {securityPass, pass} = encodeMvnPasses(passwordArg)

    const mavenSettings = getParsedMavenSettings(filesPaths)

    updateMvnPass(mavenSettings['settings-security.xml'], securityPass, 'master')
    console.log('Update settings-security.xml: DONE'.green)

    updateMvnPass(mavenSettings['settings.xml'], pass)
    console.log('Update settings.xml: DONE'.green)
})


const updateMvnPass = (settings, encodedPassword, customPassPropertyName) => {
    const js2XmlParser = new Js2XmlParser()
    const passObj = updatePassInObj(settings.data, encodedPassword,  customPassPropertyName)
    const xmlContent = js2XmlParser.parse(passObj)
    fs.writeFileSync(settings.path, xmlContent)
}

const getParsedMavenSettings = filesPaths => {
    const settingsRegExp = /settings(-security)?.xml$/

    return filesPaths
        .filter(path => settingsRegExp.test(path))
        .reduce((acc, path) => {
            const fileName = [path.match(settingsRegExp)[0]]

            return {
                ...acc,
                [fileName]: {
                    path,
                    data: xmlToObj(path)
                }
            }
        }, {})
}

const xmlToObj = pathToXml => {
    const xmlContent = fs.readFileSync(pathToXml, {encoding: 'utf-8'})
    return parser.parse(xmlContent)
}

const updatePassInObj = (obj, password, passwordPropName = 'password') => traverse(obj).map(function(node) {
    if (node[passwordPropName]) {
        this.update({...node, [passwordPropName]: password})
    }
})

const encodeMvnPasses = password => {
    if (!shell.which('mvn')) {
        shell.echo('Mvn is not installed')
        shell.exit(1)
      }

      console.log('Encript passwords: START'.yellow)
      const securityPass = shell.exec(`mvn --encrypt-master-password "${password}"`).toString()
      const pass = shell.exec(`mvn --encrypt-password "${password}"`).toString()
      console.log('Encript passwords: DONE'.green)

    return {securityPass, pass}
}
