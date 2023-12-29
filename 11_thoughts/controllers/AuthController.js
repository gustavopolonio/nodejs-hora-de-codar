import bcrypt from 'bcryptjs'

import { User } from '../models/User.js'

const AuthController = class AuthController {
  static login(req, res) {
    res.render('auth/login')
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
}

export { AuthController }