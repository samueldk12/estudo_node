

(async () => {
    const fs = require("node:fs/promises")

    const fileHandleRead = await fs.open("giant-file.txt","r")
    const fileHandleWrite = await fs.open('dest.txt','w')

    const streamRead = fileHandleRead.createReadStream({ highWaterMark: 1024*100})
    const streamWrite = fileHandleWrite.createWriteStream()

    streamRead.on("data", (chunk) => {
        
        if(!streamWrite.write(chunk)){
            streamRead.pause();
        }

        console.log(chunk)
        console.log(chunk.length)
    })

    streamWrite.on("drain", () => {
        streamRead.resume()
    })
})()