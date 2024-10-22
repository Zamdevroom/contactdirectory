// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import { Directory, File } from '../models/file_mng.js';
// // import authMiddleware from '../controllers/authMiddleware.js';
// import mongoose from 'mongoose';



// const router = express.Router();

// // router.use(authMiddleware);

// // Helper function to build user-specific paths
// const getUserDirectoryPath = (userId, directoryName) => {
//     return path.join(process.cwd(), 'root-directory', 'user-uploads', userId, directoryName);
// };

// // Create a new directory - Works
// router.post('/directories', async (req, res) => {
//     try {
//         const { name, parent } = req.body;
//         const userId = req.body.userId; // Assuming user ID is part of the request body
        

//         let parentId = null;
//         if (parent) {
//             // Validate that the parent ID is a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(parent)) {
//                 return res.status(400).json({ error: 'Invalid parent directory ID' });
//             }

//             parentId = new mongoose.Types.ObjectId(parent);

//             // Check if the parent directory exists
//             const parentDirectory = await Directory.findById(parentId);
//             if (!parentDirectory) {
//                 return res.status(400).json({ error: 'Parent directory does not exist' });
//             }
//         }

//         const newDirectory = new Directory({ name, parent: parentId, userId });
//         await newDirectory.save();
//         res.status(201).json(newDirectory);
//     } catch (err) {
//         console.error(err); // Log error details
//         res.status(500).json({ error: 'Failed to create directory' });
//     }
// });

// // Rename a directory    - WORKS 
// router.put('/directories/:id', async (req, res) => {
//     try {
//         const { name } = req.body;
//         const userId = req.user._id;

//         const directory = await Directory.findOneAndUpdate(
//             { _id: req.params.id, userId },
//             { name },
//             { new: true }
//         );
//         if (!directory) {
//             return res.status(403).json({ error: 'Access denied or directory not found' });
//         }

//         res.status(200).json(directory);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to rename directory' });
//     }
// });

// // Move a directory  -  Works
// router.put('/directories/:id/move', async (req, res) => {
//     try {
//         const { newParentId } = req.body;
//         const userId = req.user._id;

//         const directory = await Directory.findOneAndUpdate(
//             { _id: req.params.id, userId },
//             { parent: newParentId },
//             { new: true }
//         );
//         if (!directory) {
//             return res.status(403).json({ error: 'Access denied or directory not found' });
//         }

//         res.status(200).json(directory);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to move directory' });
//     }
// });





// // Delete a directory   - Works
// router.delete('/directories/:id', async (req, res) => {
//     try {

//         const userId = req.user._id;
//         const directory = await Directory.findOneAndDelete({ _id: req.params.id, userId });
//         if (!directory) {
//             return res.status(403).json({ error: 'Access denied or directory not found' });
//         }

//         await File.deleteMany({ directory: req.params.id });
//         res.status(200).json({ message: 'Directory deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete directory' });
//     }
// });

// // Create a new file
// router.post('/files', async (req, res) => {
//     try {
//         const { name, directoryId, content } = req.body;
//         const userId = "668c536b5d356719e69867ce"; // Replace with your userId

//         const directory = await Directory.findOne({ _id: directoryId, userId });
//         if (!directory) {
//             return res.status(403).json({ error: 'Access denied or directory not found' });
//         }

//         const newFile = new File({
//             name,
//             content: Buffer.from(content, 'utf-8'), // Convert the content to Buffer
//             directory: directoryId,
//             userId,
//         });
//         await newFile.save();
//         res.status(201).json(newFile);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create file' });
//     }
// });


// // Rename a file
// router.put('/files/:id', async (req, res) => {
//     try {
//         const { name } = req.body;
//         const userId = req.user._id;

//         const file = await File.findOne({ _id: req.params.id, userId });
//         if (!file) {
//             return res.status(403).json({ error: 'Access denied or file not found' });
//         }

//         const newPath = path.join(path.dirname(file.path), name);

//         fs.rename(file.path, newPath, async (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to rename file' });
//             }

//             file.name = name;
//             file.path = newPath;
//             await file.save();
//             res.status(200).json(file);
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to rename file' });
//     }
// });

// // Move a file
// router.put('/files/:id/move', async (req, res) => {
//     try {
//         const { newDirectoryId } = req.body;
//         const userId = req.user._id;

//         const file = await File.findOne({ _id: req.params.id, userId });
//         if (!file) {
//             return res.status(403).json({ error: 'Access denied or file not found' });
//         }

//         const newDirectory = await Directory.findOne({ _id: newDirectoryId, userId });
//         if (!newDirectory) {
//             return res.status(403).json({ error: 'Access denied or new directory not found' });
//         }

//         const newPath = path.join(getUserDirectoryPath(userId, newDirectory.name), file.name);

//         fs.rename(file.path, newPath, async (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to move file' });
//             }

//             file.path = newPath;
//             file.directory = newDirectoryId;
//             await file.save();
//             res.status(200).json(file);
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to move file' });
//     }
// });

// // Delete a file
// router.delete('/files/:id', async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const file = await File.findOneAndDelete({ _id: req.params.id, userId });
//         if (!file) {
//             return res.status(403).json({ error: 'Access denied or file not found' });
//         }

//         fs.unlink(file.path, async (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to delete file' });
//             }

//             res.status(200).json({ message: 'File deleted successfully' });
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete file' });
//     }
// });

// export default router;
