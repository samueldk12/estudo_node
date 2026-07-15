const net = require("net")
const readline = require("readline/promises")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const clearLine = (dir) => {
    return new Promise((resolve, rejects) =>{
        process.stdout.clearLine(dir, () => {
            resolve();
        });
    })
}


const moveCursor = (dx, dy) => {
    return new Promise((resolve, rejects) => {
        process.stdout.moveCursor(dx, dy, ()=>{
            resolve();
        })
    })
}

let id;

const client = net.createConnection({
    host: "localhost",
    port: "3008"
},
async () => {
    console.log("Connected to the server!");

    const ask = async () => {
        const message = await rl.question("Enter a message > ")
        await moveCursor(0,-1);
        await clearLine(0);
        client.write(`User ${id}: ${message}`)
    }


    client.on("data", async (data)=> {
        if(data.toString('utf-8').substring(0,2) === "id"){
            id = data.toString('utf-8').substring(3);

            console.log(`Your Id is ${id}!`)
        }else{
            console.log();
            await moveCursor(0,-1);
            await clearLine(0);
            console.log(data.toString('utf-8'))

        }
        
        await ask();
    })

})


client.on("end",()=>{
    console.log("Ended!")
})
