import { Song } from "../models/song.model.js";
import {Album} from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";


const uploadToCloudinary = async (file) =>{
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        });
        return result.secure_url;
    }
    catch(error){
        console.error(error);
        throw new Error("Could not upload file to cloudinary");
    }
} 

export const checkAdmin = (req, res) =>{
    res.status(200).json({admin: true});
}

export const createSong = async (req, res, next) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please upload all files"});
        }
        const {title, artist, albumId, duration} = req.body;
        const audio = req.files.audioFile;
        const image = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audio);
        const imageUrl = await uploadToCloudinary(image);
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        })

        await song.save();

        // if album in db
        if (albumId) {
            const album = await Album.findById(albumId);
            if (!album) {
              return res.status(404).json({ message: "Album not found" });
            }
          
            await Album.findByIdAndUpdate(albumId, {
              $push: { songs: song._id },
            });
          }
          
        res.status(201).json({song});

    }
    catch(error){
        console.error(error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try{
        const {id} = req.params;
        const song = await Song.findById(id);
        //delete from album
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: id}
            });
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({message: "Song deleted Successfully"});
    }
    catch(error){
        console.error("Error in deleting song ", error);
        next(error);
    }

};

export const createAlbum = async (req, res, next) => {
    try{
        const {title, artist, releaseYear} = req.body;
        const imageFile = req.files;
        
        const imageUrl = await uploadToCloudinary(imageFile); // Fix: added await
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await album.save();
        res.status(201).json("Saved the album")
    }
    catch(err){
        console.error(err);
        next(err);
    }
};

//ALL the songs are also deleted
export const deleteAlbum = async (req, res, next) => {
    try{
        const {id} = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Successfully deleted the Album"});
    }
    catch(err){
        console.error(err);
        next(err);
    }
};