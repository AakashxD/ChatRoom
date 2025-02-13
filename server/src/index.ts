import { WebSocketServer ,WebSocket} from "ws";

const ws= new WebSocketServer({port:9999});
let userCount=0;
let allSocket=[];
console.log("server started");
ws.on("connection",(socket)=>{
    allSocket.push(socket);
    userCount=userCount+1;
    console.log(userCount)
    socket.on("message",(msg)=>{
        console.log("user from client"+msg.toString())
        for(let i=0;i<allSocket.length;i++){
            let ss=allSocket[i];
            ss.send("server msg"+msg.toString() +"send from the server");
     } 
    })
})