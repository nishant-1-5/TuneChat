import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { createServer } from 'http';
import fs from 'fs';
import cron from 'node-cron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stats.route.js';

import { initializeSocket } from './lib/socket.js';
import connectDB from './lib/db.js';
dotenv.config();

const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

//middleware

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json()); //parse json data in request body
app.use(clerkMiddleware()); //add auth to req obj i.e can get user id from req obj req.auth.userId etc
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024} // 10 MB max file(s) size},
})); //parse file uploads

const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/album', albumRoutes);
app.use('/api/stats', statsRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (req, res) => {  
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
  });
}

//Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Something went wrong": err.message});
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

//socket.io