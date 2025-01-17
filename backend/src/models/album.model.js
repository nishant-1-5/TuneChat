import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        //Support for single artist can do more in Future //::TODO
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,  
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: true,
    }],

}, {timestamps: true});

export const Album = mongoose.model("Album", albumSchema);