import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin} from "../controller/admin.controller.js";
const router = Router();
//write once instead of many time :)
router.use(protectRoute, requireAdmin);

router.get('/check',checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums:id", deleteAlbum);

// router.get("/debug", protectRoute, async (req, res) => {
//     try {
//       console.log("Session:", req.session);
//       console.log("Auth:", req.auth);
//       res.json({ message: "Debug route accessed successfully!" });
//     } catch (err) {
//       res.status(500).json({ message: "Error in debug route", error: err });
//     }

//   });
  

export default router;