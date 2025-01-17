import {Server} from "socket.io";
import {Message} from "../models/message.model.js"

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors:{
            origin:"http://localhost:3000",
            credentials: true,
        }
    });
    const userSockets = new Map(); //userid : socketId
    const userActivities = new Map(); //userid : activity

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");
            io.emit("user_connected", userId);//to tell all other users
            socket.emit("users_online", Array.from(userSockets.keys()));
            io.emit("activities", Array.from(userActivities.keys()));
        });

        socket.on("update_activity", ({userId, activity}) => {
            userActivities.set(userId, activity);
            io.emit("activity_updated", {userId, activity});
        });

        socket.on("send_message", async (data) => {
            try{
                const {senderId, receiverId, content} = data;
                
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                });
                const recieverSocketId = userSockets.get(receiverId);
                if(recieverSocketId){
                    io.to(recieverSocketId).emit("message_recieved", message);
                }
                socket.emit("message_sent", message);
            } 
            catch (error) {
                console.log("Message Error: ", error);
                socket.emit("message_error", error.message) ;
            }
        });
        socket.on("disconnect", async(data) => {
            let disconnectUserId;
            for(const [userId, socketId] of userSockets.entries()){
                //find disconnected user
                if(socketId === socket.id){
                    disconnectUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if(disconnectUserId){
                io.emit("user_disconnected", disconnectUserId);
                // io.emit("users_online", Array.from(userSockets.keys()));
                // io.emit("acitivities", Array.from(userActivities.keys()));
            }
        });

    });
}
