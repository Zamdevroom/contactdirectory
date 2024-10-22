
import Data from '../models/Data.js';

export const getRecords = async (req, res) => {
    try {
        const { user } = req.body;
        const records = await Data.find({ user: user });
        res.status(200).json(records);
        // console.log(records);
    } catch (error) {
        console.error('Error getting records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const createRecord = async (req, res) => {
    try {
        console.log(req.body.user);
        const {
            list_name,
            query,
            email_format,
            person_first_name,
            person_last_name,
            person_headline,
            person_job_title,
            person_location,
            person_business_email,
            person_personal_email,
            person_phone,
            person_company_name,
            person_city,
            person_linkedin_id,
            person_linkedin_url,
            company_name,
            company_founded,
            company_size,
            company_type,
            company_country,
            company_industry,
            company_address,
            company_linkedin_url,
            company_linkedin_id,
            company_meta_title,
            company_meta_description,
            company_meta_keywords,
            company_meta_phones,
            company_meta_emails } = req.body.formData;
        
            const user = req.body.user

        if (!(user && (person_phone || person_personal_email))) {
            return res.status(400).json({ message: 'Missing details' });
        }

        let validatedRecord = {}

        for (const field in req.body.formData) {
            if (req.body.formData[field] === '') {
            }
            else {
                validatedRecord[field] = req.body.formData[field]
            }
        }
        const email = await Data.findOne({ person_personal_email: person_personal_email });
        const phone = await Data.findOne({ person_phone: person_phone });

        if (phone || email) {
            return res.status(400).json({ message: 'Duplicate' });
        }
        const newRecord = new Data(validatedRecord);
        console.log(newRecord);
        // await newRecord.save();

        res.status(201).json({ message: 'Record created successfully' });
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.body;
        await Data.findByIdAndDelete(id);
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const searchRecords = async (req, res) => {
    try {
        /*First we will check which parameter is selected and then search the records as per the parameter*/
        const { searchField, searchValue, user } = req.body;
        // console.log(searchField, searchValue)
        let records = [];
        if (searchField === 'list_name') {
            records = await Data.find({ user: user, list_name: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'query') {
            records = await Data.find({ user: user, query: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'email_format') {
            records = await Data.find({ user: user, email_format: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_first_name') {
            records = await Data.find({ user: user, person_first_name: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_last_name') {
            records = await Data.find({ user: user, person_last_name: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_headline') {
            records = await Data.find({ user: user, person_headline: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_job_title') {
            records = await Data.find({ user: user, person_job_title: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_location') {
            records = await Data.find({ user: user, person_location: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_business_email') {
            records = await Data.find({ user: user, person_business_email: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_personal_email') {
            records = await Data.find({ user: user, person_personal_email: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_phone') {
            records = await Data.find({ user: user, person_phone: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_company_name') {
            records = await Data.find({ user: user, person_company_name: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_city') {
            records = await Data.find({ user: user, person_city: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_linkedin_id') {
            records = await Data.find({ user: user, person_linkedin_id: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'person_linkedin_url') {
            records = await Data.find({ user: user, person_linkedin_url: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_name') {
            records = await Data.find({ user: user, company_name: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_founded') {
            records = await Data.find({ user: user, company_founded: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_size') {
            records = await Data.find({ user: user, company_size: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_type') {
            records = await Data.find({ user: user, company_type: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_country') {
            records = await Data.find({ user: user, company_country: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_industry') {
            records = await Data.find({ user: user, company_industry: searchValue });
            return res.status(200).json(records);
        } else if (searchField === 'company_address') {
            records = await Data.find({ user: user, company_address: searchValue });
        } else if (searchField === 'company_linkedin_url') {
            records = await Data.find({ user: user, company_linkedin_url: searchValue });
        } else if (searchField === 'company_linkedin_id') {
            records = await Data.find({ user: user, company_linkedin_id: searchValue });
        } else if (searchField === 'company_meta_title') {
            records = await Data.find({ user: user, company_meta_title: searchValue });
        } else if (searchField === 'company_meta_description') {
            records = await Data.find({ user: user, company_meta_description: searchValue });
        } else if (searchField === 'company_meta_keywords') {
            records = await Data.find({ user: user, company_meta_keywords: searchValue });
        } else if (searchField === 'company_meta_phones') {
            records = await Data.find({ user: user, company_meta_phones: searchValue });
        } else if (searchField === 'company_meta_emails') {
            records = await Data.find({ user: user, company_meta_emails: searchValue });
        } else {
            res.status(404).json({ message: 'Invalid search field' });
        }


    } catch (error) {
        console.error('Error searching records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const editRecord = async (req, res) => {
    try {
        const { data } = req.body;
        // console.log(data)
        const record = await Data.findById(data._id);
        // console.log(record)
        record.list_name = data.list_name;
        record.query = data.query;
        record.email_format = data.email_format;
        record.person_first_name = data.person_first_name;
        record.person_last_name = data.person_last_name;
        record.person_headline = data.person_headline;
        record.person_job_title = data.person_job_title;
        record.person_location = data.person_location;
        record.person_business_email = data.person_business_email;
        record.person_personal_email = data.person_personal_email;
        record.person_phone = data.person_phone;
        record.person_company_name = data.person_company_name;
        record.person_city = data.person_city;
        record.person_linkedin_id = data.person_linkedin_id;
        record.person_linkedin_url = data.person_linkedin_url;
        record.company_name = data.company_name;
        record.company_founded = data.company_founded;
        record.company_size = data.company_size;
        record.company_type = data.company_type;
        record.company_country = data.company_country;
        record.company_industry = data.company_industry;
        record.company_address = data.company_address;
        record.company_linkedin_url = data.company_linkedin_url;
        record.company_linkedin_id = data.company_linkedin_id;
        record.company_meta_title = data.company_meta_title;
        record.company_meta_description = data.company_meta_description;
        record.company_meta_keywords = data.company_meta_keywords;
        record.company_meta_phones = data.company_meta_phones;
        record.company_meta_emails = data.company_meta_emails;
        await record.save();
        res.status(200).json({ message: 'Record updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const viewRecord = async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(id);
        const record = await Data.findById(id);
        // console.log(record);
        res.status(200).json(record);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getFields = async (req, res) => {
    try {
        
        const {user} = req.body;
        const records = await Data.find({user: user});
        const fields = [];
        records.forEach(record => {
            Object.keys(record._doc).forEach(key => {
                if (!fields.includes(key)) {
                    fields.push(key);
                }
            }
            );})
            
        res.status(200).json(fields);
    } catch (error) {
        console.error('Error getting fields:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getSortedRecords = async (req, res) => {
    try {
        const { user, selectedField, isAscending } = req.body;
        const sortOrder = isAscending ? 1 : -1;

        let records;
        if (selectedField === "Default") {
            records = await Data.find({ user: user });
            if (!isAscending) {
                records = records.reverse();
            }
        } else {
            records = await Data.find({ user: user }).sort({ [selectedField]: sortOrder });
        }

        res.status(200).json(records);
    } catch (error) {
        console.error('Error getting sorted records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}