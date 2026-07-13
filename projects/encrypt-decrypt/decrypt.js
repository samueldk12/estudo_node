const {Transform } = require("node:stream");
const fs = require("node:fs/promises")

class Decrypt extends Transform {
    _transform(chunk, encoding, callback){
        console.log(chunk.toString("utf-8"))
        
        for (let i = 0; i < chunk.length; ++i){
            if (chunk[i] !== 255) {chunk[i] = chunk[i] + 1}
        }

        this.push(chunk)
    }
}

(async () => {
    const {Transform } = require("node:stream");
    const fs = require("node:fs/promises")
    
    const readFileHandle = await fs.open("write.txt", "r")
    const writeFileHandle = await fs.open("decrypt.txt", "w")

    const readStream = readFileHandle.createReadStream()
    const writeStream = writeFileHandle.createWriteStream()
    
    const decrypt = new Decrypt();
    
    readStream.pipe(decrypt).pipe(writeStream)
})()