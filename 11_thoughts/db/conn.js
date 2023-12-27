import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('thoughts-project', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Connected to db')
} catch(err) {
  console.log(`Failed to connect to db: ${err}`)
}

export { sequelize }