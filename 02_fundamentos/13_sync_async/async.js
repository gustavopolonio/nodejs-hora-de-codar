const fs = require('fs')

console.log('Inicio')

fs.writeFile('sync.txt', 'oi', (err) => {
  console.log('Arquivo criado')
})

console.log('Fim')