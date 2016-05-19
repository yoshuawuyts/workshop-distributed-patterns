const concat = require('concat-stream')
const http = require('http')
const fs = require('fs')

const LOGFILE = '/tmp/patterns-workshop.db'
const PORT = 8080

const server = http.createServer(function (req, res) {
  req.pipe(concat({ string: true }, function (str) {
    const ws = fs.createWriteStream(LOGFILE, { flags: 'a' })
    ws.end(str + '\n')
    res.statusCode = 200
    res.end()
  }))
})

server.listen(PORT, function () {
  console.log('server started on ' + PORT)
})
