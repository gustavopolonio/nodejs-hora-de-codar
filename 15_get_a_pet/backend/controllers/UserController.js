import bcrypt from 'bcrypt'

import { User } from '../models/User.js'
import { createUserToken } from '../helpers/create-user-token.js'

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

    // Checking if user already exists
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      res.status(422).json({ message: `Email: ${email} is already in use. Use another!` })
      return
    }
    
    // Creating a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Creating a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    })

    try {
      await user.save()
      await createUserToken(user, req, res)
    } catch(error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'Email is required!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'Password is required!' })
      return
    }

    const user = await User.findOne({ email })
    if (!user) {
      res.status(422).json({ message: `There isn't an account with this email: ${email}` })
      return
    }

    // Checking if password matches with db password
    const passwordsMatch = await bcrypt.compare(password, user.password)
    console.log(passwordsMatch)
    if (!passwordsMatch) {
      res.status(422).json({ message: 'Invalid password' })
      return
    }

    await createUserToken(user, req, res)
  }
}