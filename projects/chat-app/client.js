const net = require("net")

const client = net.createConnection({
    host: "localhost",
    port: "3008"
},
() => {
    console.log("Connected to the server!");
})

client.on("close",() => {
    console.log("Close")
})

client.on("end",()=>{
    console.log("Ended!")
});