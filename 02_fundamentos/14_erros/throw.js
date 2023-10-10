const x = 10

if (!Number.isInteger(x)) {
  throw new Error('Valor de x não aceito')
}

console.log('Continuando código..')