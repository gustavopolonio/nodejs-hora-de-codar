const fs = require('fs')

const antigo = 'arquivo.txt'
const novo = 'newFile.txt'

fs.rename(antigo, novo, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`O arquivo ${antigo} foi renomeado para ${novo}`)
})