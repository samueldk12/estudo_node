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
               callback();
            })
        }else{
            
        }

    }

    _final(){

    }

    _destroy(){

    }
}

const stream = new FileSystemWritableFileStream({highWaterMark:1800,fileName:"text.txt"});
stream.write(Buffer.from("this is some string"));
stream.end(Buffer.from("Our last write."))

stream.on("drain", ()=>{

})