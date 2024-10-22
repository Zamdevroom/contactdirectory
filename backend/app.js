import { config } from 'dotenv';
config(); // Load environment variables from .env file
import express from 'express';
import cors from 'cors';
import UserRoutes from './routes/User.js';
import RecordRoutes from './routes/Records.js';
import CollectionRoutes from './routes/Collection.js';



export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/user', UserRoutes);
app.use('/record', RecordRoutes);
app.use('/file', CollectionRoutes);


