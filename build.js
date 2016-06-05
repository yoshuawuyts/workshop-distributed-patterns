#!/usr/bin/env node
var fs = require('fs')
var marked = require('marked')
var path = require('path')
var rimraf = require('rimraf')

var css = fs.readFileSync(path.join(__dirname, 'github-markdown.css'), 'utf-8')
var base = path.join(__dirname, 'problems')

rimraf.sync(path.join(__dirname, 'build'))
fs.readdirSync(base).forEach(function (name) {
  var input = path.join(base, name)
  var output = path.join(__dirname, 'build', name.replace('.md', '.html'))
  var html = marked(fs.readFileSync(input, 'utf-8'))
  console.log(html)
  var file = `
    <html>
      <head>
        <title>Problem ${name.replace('.md', '')}</title>
        <style> body { padding: 40px; } ${css} </style>
      </head>
      <body class="markdown-body" style="width: 500px; margin: auto;">${html}</body>
    </html>
  `

  try {
    fs.mkdirSync(path.join(__dirname, 'build'))
  } catch (err) {
    // do nothing
  }

  fs.writeFileSync(output, file)
})
