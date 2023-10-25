// Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// Core modules
const fs = require('fs')


operation()

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'Create Account',
        'Check Balance',
        'Deposit',
        'Withdraw',
        'Exit'
      ]
    }
  ])
  .then(answer => {
    const action = answer['action']

    if (action === 'Create account') {
      createAccount(action)
    }

    switch (action) {
      case 'Create Account':
        createAccount()
        break
      case 'Check Balance':
        checkBalance()
        break
      case 'Deposit':
        deposit()
        break
      case 'Withdraw':
        withdraw()
        break
      case 'Exit':
        console.log(chalk.bgBlue.black('Thank you for using Accounts :)'))
        process.exit()
      default:
        console.log('Sorry, internal error.')
    }
  })
  .catch(err => console.log(err))
}


// Creating an account
function createAccount() {
  console.log(chalk.bgGreen.black('Thank you for choosing our bank!'))
  console.log(chalk.green('Define your account options below'))

  buildAccount()
}

// Building account
function buildAccount() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: "Type your account's name"
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    console.log(accountName)

    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.black('Account name is already in use. Please choose another.'))
      buildAccount()
      return
    }

    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err) {
      console.log(err)
    })

    console.log(chalk.green('Congratulations, your account was created!'))
    operation()
  })
  .catch(err => console.log(err))
}

function deposit() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: "Type your account's name"
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']
    if (!checkIfAccountAlreadyExists(accountName)) {
      return deposit()
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'How much do you want to deposit?'
      }
    ])
    .then(answer => {
      const amount = answer['amount']
      addAmount(accountName, amount)
      operation()
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

function checkIfAccountAlreadyExists(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("This account doesn't exist"))
    return false
  }

  return true
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)
  if (Object.is(NaN, parseFloat(amount))) {
    console.log(chalk.bgRed.black('Internal error'))
    return
  }

  accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(chalk.green(`Foi depositado o valor de: R$${amount}`))
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })

  return JSON.parse(accountJSON)
}

function checkBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: "What's your account name?"
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    if (!checkIfAccountAlreadyExists(accountName)) {
      return checkBalance()
    }

    const accountData = getAccount(accountName)
    console.log(chalk.bgBlue.black(`Seu saldo é de: R$${accountData.balance}`))
    return operation()
  })
  .catch(err => console.log(err))
}

function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: "What's your account name?"
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    if (!checkIfAccountAlreadyExists(accountName)) {
      return withdraw()
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: "How much do you want to withdraw?"
      }
    ])
    .then(answer => {
      const amount = answer['amount']

      removeAccount(accountName, amount)
      operation()
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

function removeAccount(accountName, amount) {
  const accountData = getAccount(accountName)
  if (Object.is(NaN, parseFloat(amount))) {
    console.log(chalk.bgRed.black('Internal error'))
    return
  }

  if (parseFloat(accountData.balance) < parseFloat(amount)) {
    console.log(chalk.bgRed.black('Insufficient funds'))
    return
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(chalk.green(`Withdraw of R$:${amount}`))
}