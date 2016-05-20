const nano = require('nanomsg')

const addr = 'tcp://127.0.0.1:7789'
const push = nano.socket('push')
const pull = nano.socket('pull')

push.bind(addr)
pull.connect(addr)

var counter = 0
pull.on('data', function (data) {
  const num = Number(data)
  pull.pause()

  setTimeout(() => {
    pull.resume()
    console.log(counter += num)

    if (num === 100) {
      push.close()
      pull.close()
      console.log('done!')
    }
  }, 20)
})

for (var i = 1; i <= 100; i++) {
  push.send(i)
}
