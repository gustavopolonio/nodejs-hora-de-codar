const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readLine.question('Qual sua linguagem preferida? ', (language) => {
  console.log('Minha linguagem preferida é:' + language)
  readLine.close()
})
