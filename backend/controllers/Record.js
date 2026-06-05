
import Data from '../models/Data.js';

export const getRecords = async (req, res) => {
    try {
        const { user } = req.body;
        const records = await Data.find({ user: user });
        res.status(200).json(records);
    } catch (error) {
        console.error('Error getting records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const createRecord = async (req, res) => {
    try {
        const formData = req.body.formData || req.body;
        const user = req.body.user;

        const { person_phone, person_personal_email } = formData;

        if (!user || !(person_phone || person_personal_email)) {
            return res.status(400).json({ message: 'Missing details' });
        }

        const validatedRecord = { user };

        for (const field in formData) {
            if (formData[field] !== '') {
                validatedRecord[field] = formData[field];
            }
        }

        if (person_personal_email) {
            const email = await Data.findOne({ user, person_personal_email });
            if (email) {
                return res.status(400).json({ message: 'Duplicate email' });
            }
        }

        if (person_phone) {
            const phone = await Data.findOne({ user, person_phone });
            if (phone) {
                return res.status(400).json({ message: 'Duplicate phone' });
            }
        }

        const newRecord = new Data(validatedRecord);
        await newRecord.save();

        res.status(201).json({ message: 'Record created successfully', record: newRecord });
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
        const { searchField, searchValue, user } = req.body;

        if (!searchField || !user) {
            return res.status(400).json({ message: 'Missing search parameters' });
        }

        const validFields = [
            'list_name', 'query', 'email_format', 'person_first_name', 'person_last_name',
            'person_headline', 'person_job_title', 'person_location', 'person_business_email',
            'person_personal_email', 'person_phone', 'person_company_name', 'person_city',
            'person_linkedin_id', 'person_linkedin_url', 'company_name', 'company_founded',
            'company_size', 'company_type', 'company_country', 'company_industry',
            'company_address', 'company_linkedin_url', 'company_linkedin_id',
            'company_meta_title', 'company_meta_description', 'company_meta_keywords',
            'company_meta_phones', 'company_meta_emails',
        ];

        if (!validFields.includes(searchField)) {
            return res.status(404).json({ message: 'Invalid search field' });
        }

        const regex = new RegExp(searchValue, 'i');
        const records = await Data.find({ user, [searchField]: regex });
        return res.status(200).json(records);
    } catch (error) {
        console.error('Error searching records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const editRecord = async (req, res) => {
    try {
        const { data } = req.body;
        const record = await Data.findById(data._id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        const fields = [
            'list_name', 'query', 'email_format', 'person_first_name', 'person_last_name',
            'person_headline', 'person_job_title', 'person_location', 'person_business_email',
            'person_personal_email', 'person_phone', 'person_company_name', 'person_city',
            'person_linkedin_id', 'person_linkedin_url', 'company_name', 'company_founded',
            'company_size', 'company_type', 'company_country', 'company_industry',
            'company_address', 'company_linkedin_url', 'company_linkedin_id',
            'company_meta_title', 'company_meta_description', 'company_meta_keywords',
            'company_meta_phones', 'company_meta_emails',
        ];

        fields.forEach((field) => {
            if (data[field] !== undefined) {
                record[field] = data[field];
            }
        });

        await record.save();
        res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const viewRecord = async (req, res) => {
    try {
        const { id } = req.body;
        const record = await Data.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFields = async (req, res) => {
    try {
        const { user } = req.body;
        const records = await Data.find({ user });
        const fields = [];
        const skipFields = ['_id', '__v', 'user', 'files', 'createdAt', 'updatedAt'];

        records.forEach((record) => {
            Object.keys(record._doc).forEach((key) => {
                if (!skipFields.includes(key) && !fields.includes(key)) {
                    fields.push(key);
                }
            });
        });

        res.status(200).json(fields);
    } catch (error) {
        console.error('Error getting fields:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSortedRecords = async (req, res) => {
    try {
        const { user, selectedField, isAscending } = req.body;
        const sortOrder = isAscending ? 1 : -1;

        let records;
        if (selectedField === 'Default') {
            records = await Data.find({ user }).sort({ createdAt: isAscending ? 1 : -1 });
        } else {
            records = await Data.find({ user }).sort({ [selectedField]: sortOrder });
        }

        res.status(200).json(records);
    } catch (error) {
        console.error('Error getting sorted records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
