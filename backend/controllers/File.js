import express from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import Data from '../models/Data.js';
import _ from 'lodash';


const checkFile = (req, res) => {
  let results = [];
  let columns = [];
  const filePath = req.file.path;
  const user = req.body.user;

  const MAX_FILE_SIZE = 98 * 1024 * 1024; // 2MB
  const fileStats = fs.statSync(filePath);
  if (fileStats.size > MAX_FILE_SIZE) {
    console.log('File size exceeds the allowed limit of 5MB.');
    return res.status(400).json({ message: 'File size exceeds the allowed limit of 5MB.' });
  }

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('headers', (headers) => {
      try {
        columns = headers;
        columns = columns.filter(column => column !== 'person_phone' && column !== 'person_personal_email');
        return res.status(200).json({ columns });
      }
      catch (error) {
        console.log("error")
        res.status(500).json({ message: 'Error reading columns' });
      } finally {
        fs.unlinkSync(filePath);
      }
    });

};

export default checkFile;