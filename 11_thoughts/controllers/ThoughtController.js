import { Thought } from '../models/Thought.js'
import { User } from '../models/User.js'

import { Op } from 'sequelize'

const ThoughtController = class ThoughtController {
  static async showThoughts(req, res) {
    let userSearch = ''

    if (req.query.search) {
      userSearch = req.query.search
    }

    const thoughtsData = await Thought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${userSearch}%` }
      }
    })
    const thoughts = thoughtsData.map(thought => thought.get({ plain: true }))

    let thoughtsQty = thoughts.length
    if (!thoughtsQty) thoughtsQty = false

    res.render('thoughts/home', { thoughts, userSearch, thoughtsQty })
  }

  static async dashboard(req, res) {
    const user = await User.findOne({
      where: {
        id: req.session.userId
      },
      include: Thought,
      plain: true
    })

    if (!user) res.redirect('/login')

    const thoughts = user.Thoughts.map(thought => thought.dataValues)

    res.render('thoughts/dashboard', { thoughts, haveThoughts: thoughts.length })
  }

  static createThought(req, res) {
    res.render('thoughts/create')
  }

  static async createThoughtPost(req, res) {
    const { title } = req.body

    try {
      await Thought.create({ title, UserId: req.session.userId })
      req.flash('message', 'Thought created!')
      req.session.save(() => res.redirect('/thoughts/dashboard'))
    } catch(err) {
      console.log(`Error creating thought: ${err}`)
    }
  }

  static async updateThought(req, res) {
    const { id } = req.params

    const thought = await Thought.findOne({
      where: {
        id
      },
      raw: true
    })

    res.render('thoughts/edit', { thought })
  }

  static async updateThoughtPost(req, res) {
    const { id, title } = req.body

    try {
      await Thought.update({
        title
      }, {
        where: {
          id
        }
      })

      req.flash('message', 'Thought edited!')
      req.session.save(() => res.redirect('/thoughts/dashboard'))
    } catch(err) {
      console.log(`Error editing thought: ${err}`)
    }
  }

  static async removeThought(req, res) {
    const { id } = req.body

    try {
      await Thought.destroy({
        where: {
          id,
          UserId: req.session.userId
        }
      })
  
      req.flash('message', 'Thought removed!')
      req.session.save(() => res.redirect('/thoughts/dashboard'))
    } catch(err) {
      console.log(`Error deleting thought: ${err}`)
    }
  }
}

export { ThoughtController }