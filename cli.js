#!/usr/bin/env node
const inquirer = require('inquirer')
const changeMavenPassword = require('./maven')
const changeNpmPassword = require('./npm')

const actions = {
    npm: changeNpmPassword,
    maven: changeMavenPassword,
    both: pass => {
        changeMavenPassword(pass)
        changeNpmPassword(pass)
    }
}

inquirer.prompt([
    {
        name: 'type',
        message: 'What kind of password would you like to change?',
        type: 'list',
        choices: ['npm', 'maven', 'both']
    },
    {
        name: 'password',
        message: 'Please enter your password',
        type: 'password',
        mask: '*'
    }
]).then(({type, password}) => {actions[type](password)}).catch(err => console.log(err))



