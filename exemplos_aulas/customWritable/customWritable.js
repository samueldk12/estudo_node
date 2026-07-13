const { Writable } = require("node:stream")
const fs = require("node:fs")

class FileSystemWritableFileStream extends Writable {
    constructor({
        highWaterMark, 
        fileName
    }){
        super({highWaterMark});
        this.fileName = fileName;
        this.fd = null;
        this.chunks = [];
        this.chunkSize = 0;
        this.writesCount = 0;
    }

    _construct(callback){
        fs.open(this.fileName, 'w', (err, fd) => {
            if(err){
                callback(err)
            } else{
                this.fd = fd
                callback()
            }
        })
    }

    _write(chunk, encoding, callback){
        this.chunks.push(chunk)
        this.chunkSize += chunk.length;

        if(this.chunkSize > this.writableHighWaterMark){
            fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
                if(err){
                    return callback(err)
                } 
                this.chunks = [];
                this.chunkSize = 0;
                ++this.writesCount;
                callback();
            })
        }else{
            callback();
        }

    }

    _final(callback){
        fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
            if (err) return callback(err)
            ++this.writesCount
            this.chunks = [];
            callback();
        })
    }

    _destroy(error, callback){
        console.log("Number of writes: ", this.writesCount)
        if(this.fd){
            fs.close(this.fd, (err) => {
                callback(err || error)
            })
        }else{
            callback(error)
        }
    }
}

const stream = new FileSystemWritableFileStream({highWaterMark:1800,fileName:"text.txt"});
stream.write(Buffer.from("this is some string."));
stream.end(Buffer.from("Our last write."))

stream.on('finish', ()=>{
    console.log("Stream was finished.")
})