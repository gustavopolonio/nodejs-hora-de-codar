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
}

export { ThoughtController }