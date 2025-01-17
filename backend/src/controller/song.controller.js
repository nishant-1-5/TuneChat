import {Song} from '../models/song.model.js';

//::TODO -Add Recommendor Syastem later, currently just fetching random songs

export const getAllSongs = async (req, res, next) => {
    try{
        //-1 : Descending => latest songs first
        const songs = await Song.find().sort({createdAt: -1});
        res.status(200).json(songs);
    }
    catch(error){
        console.error(error);
        next(error);
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try{
        //fetch some random music using mongodb's aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {
                title: 1,
                artist: 1, 
                imageUrl: 1, 
                audioUrl: 1
            }}]);
        res.status(200).json(songs);
    }
    catch(err){
        next(err);
    }
}

export const getMadeForYouSongs = async (req, res, next) => {
    try{
        //fetch some random music using mongodb's aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {
                title: 1,
                artist: 1, 
                imageUrl: 1, 
                audioUrl: 1
            }}]);
        res.status(200).json(songs);
    }
    catch(err){
        next(err);
    }
}

export const getTrendingSongs = async (req, res, next) => {
    try{
        //fetch some random music using mongodb's aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {
                title: 1,
                artist: 1, 
                imageUrl: 1, 
                audioUrl: 1
            }}]);
        res.status(200).json(songs);
    }
    catch(err){
        next(err);
    }
}