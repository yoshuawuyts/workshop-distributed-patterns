const pbuf = require('protocol-buffers')
const assert = require('assert')
const fs = require('fs')

const schema = pbuf(`
  message Foo {
    string name = 1;
    float age = 2;
  }
`)

const argv = process.argv.slice(2)
assert.equal(argv.length, 2, 'usage: msg <name> <age>')

const name = argv[0]
const age = argv[1]

const buf = schema.Foo.encode({
  name: name,
  age: age
})

const ws = fs.createWriteStream('./user.message')
ws.end(buf)
