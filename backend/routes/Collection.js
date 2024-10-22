import { uploadFile,getFile } from "../controllers/Collection.js";
import express from "express";
import multer from 'multer';
import authMiddleware from "../controllers/authMiddleware.js";


const router = express.Router();

// Use multer to handle the incoming file in memory
const storage = multer.memoryStorage();  // Store file temporarily in memory
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), uploadFile);  // Upload file using GridFSBucket
router.get('/file/:filename', getFile);  // Stream (download) file from GridFSBucket

export default router;




// const app = express.Router();
// // app.use(authMiddleware);
// app.post("/uploadFile",uploadFile);
// app.get("/getFile/:filename",getFile);
// app.delete("/deleteFile/:filename",deleteFile);
// app.put("/moveFile",moveFile);
// app.put("/renameFile",renameFile);
// app.post("/createDirectory",createDirectory);
// app.put("/updateDirectory/:id",updateDirectory);
// app.put("/renameDirectory",renameDirectory);
// app.get("/getDirectory/:id",getDirectory);
// app.delete("/deleteDirectory/:id",deleteDirectory);
// app.get("/listFilesInDirectory/:id",listFilesInDirectory);
// export default app;


