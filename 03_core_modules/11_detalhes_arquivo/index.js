const fs = require('fs')

fs.stat('file.txt', (err, stats) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(stats.isFile())
  console.log(stats.size)
})