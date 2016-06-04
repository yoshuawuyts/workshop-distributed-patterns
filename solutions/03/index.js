const nano = require('nanomsg')

const addr = 'tcp://127.0.0.1:7789'
const pub = nano.socket('pub')
const sub = nano.socket('sub')

pub.bind(addr)
sub.connect(addr)

sub.on('data', function (buf) {
  console.log(String(buf))
  pub.close()
  sub.close()
})

pub.send('hello world')
