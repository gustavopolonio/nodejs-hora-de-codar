const fs = require('fs')

if (!fs.existsSync('./meuDir')) {
  console.log('Não existe')
  fs.mkdirSync('meuDir')
} else {
  console.log('Já existe')
}