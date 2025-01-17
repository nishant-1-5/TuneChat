import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";
const router = Router();

//Not adding authentication to get albums

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);


export default router;