import csvParser from 'csv-parser';
import fs from 'fs';
import Data from '../models/Data.js';
import _ from 'lodash';

const uploadFile = (req, res) => {
  const results = [];
  const filePath = req.file.path;
  const user = req.body.user;
  let selectedcolumns = req.body.selectedcolumns;

  if (typeof selectedcolumns === 'string') {
    selectedcolumns = selectedcolumns.split(',').filter(Boolean);
  }

  const newselectedcolumns = [...selectedcolumns];
  if (!newselectedcolumns.includes('person_phone')) {
    newselectedcolumns.push('person_phone');
  }
  if (!newselectedcolumns.includes('person_personal_email')) {
    newselectedcolumns.push('person_personal_email');
  }

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const pickedResults = results.map((result) => _.pick(result, newselectedcolumns));

        for (let i = 0; i < pickedResults.length; i++) {
          const row = pickedResults[i];

          if (!row.person_phone && !row.person_personal_email) {
            continue;
          }

          let existingRecord = null;

          if (row.person_phone) {
            existingRecord = await Data.findOne({ user, person_phone: row.person_phone });
          }

          if (!existingRecord && row.person_personal_email) {
            existingRecord = await Data.findOne({ user, person_personal_email: row.person_personal_email });
          }

          if (existingRecord) {
            let change = false;
            for (const column of selectedcolumns) {
              if (!existingRecord[column] && row[column]) {
                existingRecord[column] = row[column];
                change = true;
              }
            }
            if (change) {
              await existingRecord.save();
            }
            continue;
          }

          row.user = user;
          await Data.create(row);
        }

        res.status(200).json({ message: 'Data successfully saved to the database' });
      } catch (error) {
        console.error('CSV upload error:', error);
        res.status(500).json({ message: 'Error saving data to the database' });
      } finally {
        fs.unlinkSync(filePath);
      }
    });
};

export default uploadFile;
