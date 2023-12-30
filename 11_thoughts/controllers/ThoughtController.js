import { Thought } from '../models/Thought.js'

const ThoughtController = class ThoughtController {
  static showThoughts(req, res) {
    res.render('thoughts/home')
  }

  static dashboard(req, res) {
    res.render('thoughts/dashboard')
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
}

export { ThoughtController }