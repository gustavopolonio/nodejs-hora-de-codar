import { DataTypes } from 'sequelize'

import { sequelize } from '../db/conn.js'

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    required: true
  }
})

export { User }