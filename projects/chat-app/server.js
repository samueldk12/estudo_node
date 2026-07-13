const net = require("net")

const server = net.createServer()

server.on("connection", (socket)=>{
    console.log("A new connection to the server.")
});

server.listen(3008,"localhost", ()=>{
    console.log("opened server on:", server.address())
})