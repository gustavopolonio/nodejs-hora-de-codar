const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING,
    required: true
  },
  newsletter: {
    type: DataTypes.BOOLEAN
  }
})

module.exports = User