const net = require("net")

const server = net.createServer()

const clients = []

server.on("connection", (socket)=>{
    console.log("A new connection to the server.")
    
    const clientId = clients.length + 1; 
    
    clients.map((s) => {
        s.socket.write(`A new user ${clientId} joined!`);
    })
    
    
    socket.write(`id-${clientId.toString()}`);
    
    socket.on("data", (data) => {
       clients.map((s) => {
            s.socket.write(data);
       })
    })

    socket.on("error", () => {
       clients.map((s) => {
            s.socket.write(`The client ${clientId} left!`);
       })
    })

    clients.push({id: clientId.toString(), socket})
});

server.listen(3008,"localhost", ()=>{
    console.log("opened server on:", server.address())
})