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
assert.equal(argv.length, 1, 'usage: decode <file>')

const file = argv[0]

const buf = fs.readFileSync(file)
const msg = schema.Foo.decode(buf)
console.log(msg)
