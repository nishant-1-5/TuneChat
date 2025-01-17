import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
    try{
        const allAlbums = await Album.find({});
        res.status(200).json(allAlbums);
    }
    catch(err){
        console.log("Error fetching albums: ", err);
        next(err)
    }

};

export const getAlbumById = async (req, res, next) => {
    try{
        const {albumId} = req.params;
        const album = await Album.findById(albumId).populate("songs");
        if(!album){
            return res.status(404).json({message: "Album not found"});
        }
        res.status(200).json(album);
    }
    catch(err){
        console.log("Error fetching album by id: ", err);
        next(err)
    }
};

