var nano = require('nanomsg')

var addr = 'tcp://127.0.0.1:8976'

var pub = nano.socket('pub')
pub.bind(addr)

var sub1 = nano.socket('sub')
sub1.connect(addr)
sub1.chan(['foo', 'bar'])
sub1.on('data', (buf) => console.log(String(buf)))

var sub2 = nano.socket('sub')
sub2.connect(addr)
sub2.chan(['beep', 'boop'])
sub2.on('data', (buf) => console.log(String(buf)))

setTimeout(function () {
  pub.send('foo world')
  pub.send('bar world')
  pub.send('beep world')
  pub.send('boop world')
}, 1000)
