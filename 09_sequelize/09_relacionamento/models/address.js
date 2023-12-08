const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')
const User = require('./user')

const Address = sequelize.define('address', {
  street: {
    type: DataTypes.STRING,
    required: true
  },
  number: {
    type: DataTypes.STRING,
    required: true
  },
  city: {
    type: DataTypes.STRING,
    required: true
  }
})

Address.belongsTo(User)

module.exports = Address