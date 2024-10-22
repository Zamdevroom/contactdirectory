import { Readable } from 'stream';
import Directory from '../models/Directory.js'; // Ensure correct path to Directory model
import { pipeline } from 'stream/promises';
import { PassThrough } from 'stream';
import { finished } from 'stream';



export const uploadFile = async (req, res) => {
    const { bucket } = req.app.locals; // Accessing the GridFS bucket instance
    const { originalname: filename } = req.file;
    // const readableStream = Readable.from(req.file.buffer); // Converting file buffer to a readable stream
    const readableStream = new PassThrough();
    readableStream.end(req.file.buffer); // End the stream with the buffer
    
    console.log("We are here");
    // console.log("Buffer Content:", req.file.buffer.toString('utf-8'));
    // console.log("\n\n readable stream is:", readableStream);

    try {
        const uploadStream = bucket.openUploadStream(filename);

        
        // console.log("Uploading to GridFS, stream ID:", uploadStream.id);
        // console.log("We are here 1");

        // Log the file details for debugging
        // console.log("File received:", req.file);
        // console.log("uploadStream is:", uploadStream);

        try {
            console.log('Starting file upload process.');
        
            readableStream
                // .on('data', (chunk) => {
                //     console.log('Readable stream data chunk:', chunk.length);
                // })
                // .on('error', (err) => {
                //     console.error('Error in readable stream:', err);
                //     res.status(500).json({ error: 'Readable stream error: ' + err.message });
                // })
                .pipe(uploadStream);
                // .on('error', (err) => {
                //     console.error('Error during file upload:', err);
                //     res.status(500).json({ error: 'File upload error: ' + err.message });
                // })
                // .on('finish', async () => {
                //     console.log('Upload stream finished for file:', filename);
                    
                //     // Handle linking uploaded file to directory or data
                //     const { directoryId, dataId } = req.body;
        
                //     if (directoryId) {
                //         const directory = await Directory.findById(directoryId);
                //         if (!directory) {
                //             return res.status(404).json({ error: "Directory not found" });
                //         }
                //         directory.files.push(uploadStream.id); // Use uploadStream.id for GridFS file ID
                //         await directory.save();
                //         console.log("Directory updated");
                //     }
        
                //     if (dataId) {
                //         const data = await Data.findById(dataId);
                //         if (data) {
                //             data.files.push(uploadStream.id); // Use uploadStream.id for GridFS file ID
                //             await data.save();
                //             console.log("Data updated");
                //         }
                //     }
        
                //     return res.status(200).json({ message: 'File uploaded successfully!', fileId: uploadStream.id });
                // })
                // .on('close', () => {
                //     console.log('Upload stream closed.');
                // })
                // .on('end', () => {
                //     console.log('Readable stream ended.');
                // });
        

                finished(uploadStream, (err) => {
                    if (err) {
                        console.error('Error during file upload:', err);
                        return res.status(500).json({ error: 'File upload error: ' + err.message });
                    } else {
                        console.log('Upload stream finished for file:', filename);
                        return res.status(200).json({ message: 'File uploaded successfully!', fileId: uploadStream.id });
                    }
                });

                
        } catch (err) {
            console.error('Error during file upload:', err);
            return res.status(500).json({ error: 'File upload error: ' + err.message });
        }
        

       
    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).json({ error: err.message });
    }
};


// Stream (download) file from GridFSBucket
export const getFile = (req, res) => {
    const { bucket } = req.app.locals;
    const { filename } = req.params;

    try {
        const downloadStream = bucket.openDownloadStreamByName(filename);

        downloadStream.on('error', (err) => {
            return res.status(404).json({ error: 'File not found: ' + err.message });
        });

        res.setHeader('Content-Type', 'application/octet-stream'); // Set appropriate headers for downloading
        downloadStream.pipe(res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
