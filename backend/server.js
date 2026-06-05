// import { config } from "dotenv";
// config({ path: "./config.env" });
// import http from "http";
// import { app } from "./app.js";
// import connect from "./utils/mongodb.js";
// import initializeGridFSBucket from "./utils/gridfsBucket.js";

// const server = http.createServer(app);

// console.log("Environment variables loaded:", process.env.MONGO_URI);

// // Connect to MongoDB and initialize GridFS bucket
// connect().then(async () => {
//   try {
//     // Initialize GridFS bucket
//     const bucket = await initializeGridFSBucket();
    
//     // Store bucket in app locals for later use
//     app.locals.bucket = bucket;

//     server.listen(8000, () => {
//       console.log("Server is running on port 8000");
//     });
//   } catch (err) {
//     console.error("Error initializing GridFS Bucket:", err);
//     process.exit(1); // Exit the process with failure
//   }
// }).catch(err => {
//   console.error("Database connection failed:", err);
//   process.exit(1); // Exit the process with failure
// });

import path from "path";
import { fileURLToPath } from "url";

import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("ENV Loaded:", !!process.env.MONGO_URI);
import http from "http";
import { app } from "./app.js";
import connect from "./utils/mongodb.js";
import initializeGridFSBucket from "./utils/gridfsBucket.js";

// Create HTTP server
const server = http.createServer(app);


// MongoDB connection and GridFSBucket initialization
connect().then(async (db) => {
  try {
    // Initialize GridFSBucket
    const bucket = await initializeGridFSBucket(db);

    // Store bucket in app.locals for later use (e.g., in file routes)
    app.locals.bucket = bucket;

    // Start the server
    server.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  } catch (err) {
    console.error("Error initializing GridFSBucket:", err);
    process.exit(1); // Exit the process on failure
  }
}).catch(err => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit the process on failure
});

