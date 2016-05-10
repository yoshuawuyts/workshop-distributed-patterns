const concat = require('concat-stream')
const eol = require('os').EOL
const http = require('http')
const fs = require('fs')

const LOGFILE = '/tmp/patterns-workshop.db'

http.createServer(function (req, res) {
  const ws = fs.createWriteStream(LOGFILE, { flags: 'a' })

  req.pipe(concat(req, function (buf) {
    // we're using the system line delimiter here;
    // on most systems this is '\n'
    const str = String(buf) + eol
    ws.end(str)

    // in async systems it's usually alright to send back
    // a 200 once the request has been accepted. It might
    // be a while before it's handled by the system, so
    // once the message is validated and put on the queue
    // we can send back an ACK
    res.statusCode = 200
    res.end()
  }))
}).listen(8080)
