

(async () => {
    const fs = require("node:fs/promises")

    const fileHandleRead = await fs.open("giant-file.txt","r")
    const fileHandleWrite = await fs.open('dest.txt','w')

    const streamRead = fileHandleRead.createReadStream({ highWaterMark: 1024*100})
    const streamWrite = fileHandleWrite.createWriteStream()
    let split = "";
    streamRead.on("data", (chunk) => {
        const numbers = chunk.toString('utf-8').split(' ')
        
        if(Number(numbers[numbers.length -2 ]) +1 !== Number(numbers[numbers.length-1])){
            split = numbers.pop()
        }

        if(Number(numbers[0]) !== Number(numbers[1] -1)){
            if (split) numbers[0] = split.trim() + numbers[0].trim();
        }
        
        numbers.forEach((number)=>{
            let n = Number(number);

            if (n % 2 === 0){
                if(!streamWrite.write(" " + n + " ")){
                    streamRead.pause();
                }
            }
        })

        console.log(chunk)
        console.log(chunk.length)
    })

    streamWrite.on("drain", () => {
        streamRead.resume()
    })
})()