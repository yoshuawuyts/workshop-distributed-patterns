const http = require('http')
const fs = require('fs')

const LOGFILE = '/tmp/patterns-workshop.db'

http.createServer(function (req, res) {
  const ws = fs.createWriteStream(LOGFILE, { flags: 'a', encoding: 'utf8' })
  req.pipe(ws)
  res.statusCode = 200
  res.end()
}).listen(8080)
