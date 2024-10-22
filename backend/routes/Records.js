import express from "express";
import {getRecords, createRecord, deleteRecord, searchRecords, viewRecord, editRecord , getFields, getSortedRecords} from "../controllers/Record.js";
import multer from 'multer';
import checkFile from "../controllers/File.js";
import uploadFile from "../controllers/File2.js";

const upload = multer({ dest: 'uploads/' });



const app = express.Router();


app.post("/getRecords",getRecords);
app.post("/createRecord",createRecord);
app.post("/deleteRecord",deleteRecord);
app.post("/searchRecords",searchRecords);
app.post("/editRecord", editRecord);
app.post("/viewRecord", viewRecord);
app.post("/checkFile", upload.single('file'), checkFile);
app.post("/uploadFile", upload.single('file'), uploadFile);
app.post("/getFields", getFields);
app.post("/getSortedRecords",getSortedRecords);




export default app;
