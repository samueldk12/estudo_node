const fs = require('fs/promises');

(async () => {
    const CREATE_FILE = "create a file"
    const DELETE_FILE = "delete the file"
    const RENAME_FILE = "rename the file"
    const ADD_TO_FILE = "add to file"


    const createFile = async (path) => {
        try{
            const existingFileHandle = await fs.open(path, "r");
            existingFileHandle.close();
            return console.log("the file already exists")
        }catch(e){
            const newFileHandle = await fs.open(path,'w')
            console.log('A new file was successfully created.')
            newFileHandle.close() 
        }
    };

    const deleteFile = async (path) => {
        try{
            await fs.rm(path)
            return console.log("the file deleted!")
        }catch(e){
            console.log('Problem to delete the file', e)
        }
    }


    const renameFile = async (oldPath, newPath) => {
        try{
            await fs.rename(oldPath, newPath)
            console.log('rename ' + oldPath + '  ;  ' + newPath)
            return console.log("rename File name!")

        }catch(e){
            console.log('Problem to rename the file', e)
        }
    } 

    const addToFile = async (path, text) => {
        try{
            const newFileHandle = await fs.open(path,'a')
            console.log('A text was add to the file.')
            await newFileHandle.appendFile(text)
            newFileHandle.close() 
        }catch(e){
            console.log('Problem to add the text to the file', e)
        }
    }

    const commandFileHandler = await fs.open("./command.txt", "r")

    commandFileHandler.on("change", async () => {
            const size = (await commandFileHandler.stat()).size;
            const buff = Buffer.alloc(size);

            const offset = 0;
            const length = size;
            const position = 0;


            await commandFileHandler.read(buff, offset, length, position)
            const command = buff.toString('utf-8')

            if (command.includes(CREATE_FILE)){
                const filePath = command.substring(CREATE_FILE.length + 1)

                createFile(filePath)
            }

            if (command.includes(DELETE_FILE)){
                const filePath = command.substring(DELETE_FILE.length + 1)
                console.log('DELETE', filePath)
                deleteFile(filePath)
            }

            if (command.includes(RENAME_FILE)){
                const rename_paths =  command.substring(RENAME_FILE.length + 1)
                const oldPath = rename_paths.split(' to ')[0]
                const newPath = rename_paths.split(' to ')[1]

                renameFile(oldPath, newPath)
            }

            
            if (command.includes(ADD_TO_FILE)){
                const addFilesCommand = command.substring(ADD_TO_FILE.length + 1)
                const filePath = addFilesCommand.split(' ')[0]
                const text =  addFilesCommand.split(' ').slice(1).toString()


                addToFile(filePath, text)
            }


            console.log(buff.toString('utf-8'))
    })

    const watcher = fs.watch("./command.txt")

    for await(const event of watcher){
        if(event.eventType == 'change'){
          commandFileHandler.emit("change")
        }
    }
})();