import express from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import Data from '../models/Data.js';
import _ from 'lodash';


const uploadFile = (req, res) => {
  let results = [];
  const filePath = req.file.path;
  const user = req.body.user;
  console.log(req.body.selectedcolumns);
  let selectedcolumns = req.body.selectedcolumns;
  let newselectedcolumns = selectedcolumns.split(',');
  newselectedcolumns.push('phone_number');
  newselectedcolumns.push('email_address');

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        results = results.map((result) => _.pick(result, newselectedcolumns));
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          if (results[i].phone_number === "" && results[i].email_address === "") { //dont add records with no email and phone
            continue;

          }

          const exisitngUser = await Data.findOne({ user: user, phone_number: results[i].phone_number }); //check existing using phone number
          if (exisitngUser && results[i].phone_number !== "") {

            let change = false;
            for (let j = 0; j < selectedcolumns.length; j++) {

              if (exisitngUser[selectedcolumns[j]] === "" && results[i][selectedcolumns[j]] !== "") {
                exisitngUser[selectedcolumns[j]] = results[i][selectedcolumns[j]];
                change = true;
              }

            }


            if (change) {
              await exisitngUser.save();
            }
            continue;

          }
          else {
            const exisitngUser2 = await Data.findOne({ user: user, email_address: results[i].email_address }); //check existing using email
            if (exisitngUser2 && results[i].email_address !== "") {

              let change = false;
              for (let j = 0; j < selectedcolumns.length; j++) {

                if (exisitngUser2[selectedcolumns[j]] === "" && results[i][selectedcolumns[j]] !== "") {
                  exisitngUser2[selectedcolumns[j]] = results[i][selectedcolumns[j]];
                  change = true;
                }

              }

              if (change) {
                await exisitngUser2.save();
              }
              continue;
            }
            results[i].user = user;
            await Data.insertMany(results[i]);
          }
        }
        res.status(200).json({ message: 'Data successfully saved to the database' });
      } catch (error) {
        res.status(500).json({ message: 'Error saving data to the database' });
      } finally {
        fs.unlinkSync(filePath);
      }
    });
};

export default uploadFile;