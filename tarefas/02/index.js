const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
  {
    name: 'p1',
    message: 'Qual seu nome?'
  },
  {
    name: 'p2',
    message: 'Qual sua idade?'
  }
]).then(ans => {
  if (!ans.p1 || !ans.p2) {
    throw new Error('Nome e idade obrigatórios')
  }
  
  console.log(chalk.bgYellow.black(`Nome: ${ans.p1}, idade: ${ans.p2}`))
}).catch(err => {
  console.log(err)
})