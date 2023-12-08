import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('nodemvc', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Connected to MySQL!')
} catch (e) {
  console.log(e)
}

export default sequelize