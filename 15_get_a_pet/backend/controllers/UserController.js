import { User } from '../models/User.js'

export class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body

    // Validations
    if (!name) {
      res.status(422).json({ message: 'Name is required!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'Email is required!' })
      return
    }

    if (!phone) {
      res.status(422).json({ message: 'Phone is required!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'Password is required!' })
      return
    }

    if (!confirmPassword) {
      res.status(422).json({ message: 'You need to confirm your password!' })
      return
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: "Passwords don't match" })
      return
    }

    // Check if user already exists
    const user = await User.findOne({ email })
    if (user) {
      res.status(422).json({ message: `Email: ${email} is already in use. Use another!` })
      return
    }
  }
}