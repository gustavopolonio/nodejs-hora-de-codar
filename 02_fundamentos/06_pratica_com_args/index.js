// Externo
const minimist = require('minimist')

// Interno
const somaModule = require('./soma')
const { soma } = somaModule

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a, b)