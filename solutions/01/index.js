const http = require('http')
const fs = require('fs')

const server = http.createServer(function (req, res) {
  res.end('{ "message": "ACK" }')
})
server.listen(8080)
