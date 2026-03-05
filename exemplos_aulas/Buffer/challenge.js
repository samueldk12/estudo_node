const { Buffer }  = require('buffer')

const buffer = Buffer.alloc(3)

buffer[0] = 0x48
buffer[1] = 0x69
buffer[3] = 0x21

console.log(buffer.toString('utf-8'))