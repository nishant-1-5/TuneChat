import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        //Clerk Id 
        type: String,
        required: true,
    },
    receiverId:{
        //Clerk Id
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
}, {timestamps: true});

export const Message = mongoose.model("Message", messageSchema);