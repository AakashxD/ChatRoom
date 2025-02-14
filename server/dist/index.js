"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 9999 });
let allSocket = [];
console.log("server started");
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        // socket only send data in string format so we need to change the string into obj to push it into allSocket
        // data comming in format { type : join or chat and payload " roomID and msg"}
        // @ts-ignore
        let parseMessage = JSON.parse(message.toString());
        if (parseMessage.type == "join") {
            console.log("user created a chat room" + parseMessage.payload.roomId);
            allSocket.push({
                socket: socket,
                room: parseMessage.payload.roomId
            });
        }
        let currentRoom = null;
        if (parseMessage.type == "chat") {
            console.log("user wants to chat");
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].socket == socket) {
                    currentRoom = allSocket[i].room;
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                if (currentRoom == allSocket[i].room) {
                    allSocket[i].socket.send(`message from room ID ${currentRoom} +${parseMessage.payload.message}`);
                }
            }
        }
    });
});
