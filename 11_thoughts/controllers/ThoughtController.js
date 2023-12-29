const ThoughtController = class ThoughtController {
  static showThoughts(req, res) {
    res.render('thoughts/home')
  }

  static dashboard(req, res) {
    res.render('thoughts/dashboard')
  }
}

export { ThoughtController }