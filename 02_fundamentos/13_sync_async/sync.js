const fs = require('fs')

console.log('Inicio')

fs.writeFileSync('sync.txt', 'oi')

console.log('Fim')