import { Thought } from '../models/Thought.js'
import { User } from '../models/User.js'

const ThoughtController = class ThoughtController {
  static showThoughts(req, res) {
    res.render('thoughts/home')
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

    res.render('thoughts/dashboard', { thoughts })
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