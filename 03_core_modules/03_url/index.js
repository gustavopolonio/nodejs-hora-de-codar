const url = require('url')

const address = 'https://www.meusite.com.br/catalogo?produtos=cadeira&valor=100'

const parsedUrl = new url.URL(address)

// console.log(parsedUrl)
// console.log(parsedUrl.searchParams)
// console.log(parsedUrl.searchParams.get('valor'))