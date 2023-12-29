import bcrypt from 'bcryptjs'

import { User } from '../models/User.js'

const AuthController = class AuthController {
  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {
    const { email, password } = req.body

    // Check if user already exists
    const user = await User.findOne({ where: { email } })
    if (!user) {
      req.flash('message', 'Error: User not found!')
      res.render('auth/login')
      return
    }

    // Check if password match
    const isPasswordSimilar = bcrypt.compareSync(password, user.password)
    if (!isPasswordSimilar) {
      req.flash('message', 'Error: Invalid password')
      res.render('auth/login')
      return
    }

    // Sucessful login
    req.session.userId = user.id
    req.flash('message', `Welcome again, ${user.name}`)
    req.session.save(() => res.redirect('/'))
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const { name, email, password, confirm_password } = req.body

    if (password !== confirm_password) {
      req.flash('message', 'Error: passwords must match!')
      res.render('auth/register')
      return
    }

    // Check if user already exists
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      req.flash('message', `Error: email ${email} is already in use!`)
      res.render('auth/register')
      return
    }

    // Create passowrd hashed
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
      const user = await User.create({ name, email, password: hashedPassword })

      req.session.userId = user.id
      req.session.save(() => res.redirect('/'))
    } catch(e) {
      console.log(e)
    }
  }

  static logout(req, res) {
    req.session.destroy(() => res.redirect('/login'))
  }
}

export { AuthController }