const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('user', {
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