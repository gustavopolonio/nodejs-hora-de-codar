import { DataTypes } from 'sequelize'

import { sequelize } from '../db/conn.js'
import { User } from './User.js'

const Thought = sequelize.define('Thought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
})

Thought.belongsTo(User)
User.hasMany(Thought)

export { Thought }