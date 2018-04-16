var Buffer = require('buffer')
var fs = require('fs')
var path = require('path')
var atob = require('atob')
var btoa = require('btoa')

fs.readFile(path.join(__dirname, 'test.png'), function (err,bytesRead) {
    if (err) throw err
    console.log(bytesRead.toString())
    console.log('================================================================================')
    console.log(btoa(bytesRead))
    console.log('================================================================================')
    console.log(atob(bytesRead))
    console.log('================================================================================')
    console.log('================================================================================')
    console.log('================================================================================')
})
