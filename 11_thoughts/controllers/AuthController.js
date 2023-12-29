import flash from 'express-flash'

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
      req.flash('message', 'Erro: as senhas devem coincidir!')
      res.render('auth/register')
      return
    }
  }
}

export { AuthController }