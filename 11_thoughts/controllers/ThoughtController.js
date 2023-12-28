const ThoughtController = class ThoughtController {
  static showThoughts(req, res) {
    res.render('thoughts/home')
  }
}

export { ThoughtController }