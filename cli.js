const { program } = require('commander')
const changeMavenPassword = require('./maven')
const changeNpmPassword = require('./npm')

program
  .option('-m, --maven <password>', 'change maven password')
  .option('-n, --npm <password>', 'change npm password')
  .option('-b, --both <password>', 'change npm and maven passwords')
 
program.parse(process.argv);

if (program.maven) {
    changeMavenPassword(program.maven)
}

if (program.npm) {
    changeNpmPassword(program.npm)
}

if (program.both) {
    changeMavenPassword(program.maven)
    changeNpmPassword(program.npm)
}
