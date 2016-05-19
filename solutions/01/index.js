const nano = require('nanomsg')

const addr = 'tcp://127.0.0.1:7789'
const req = nano.socket('req')
const rep = nano.socket('rep')

req.bind(addr)
rep.connect(addr)

rep.on('data', function (data) {
  console.log(String(data))
  rep.send('the real RPC?')
})

req.on('data', function (data) {
  console.log(String(data))
  rep.close()
  req.close()
})

req.send('is this')
