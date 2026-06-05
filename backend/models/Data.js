import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    list_name: { type: String },
    query: { type: String },
    email_format: { type: String },
    person_first_name: { type: String },
    person_last_name: { type: String },
    person_headline: { type: String },
    person_job_title: { type: String },
    person_location: { type: String },
    person_business_email: { type: String },
    person_personal_email: { type: String },
    person_phone: { type: String },
    person_company_name: { type: String },
    person_city: { type: String },
    person_linkedin_id: { type: String },
    person_linkedin_url: { type: String },
    company_name: { type: String },
    company_founded: { type: String },
    company_size: { type: String },
    company_type: { type: String },
    company_country: { type: String },
    company_industry: { type: String },
    company_address: { type: String },
    company_linkedin_url: { type: String },
    company_linkedin_id: { type: String },
    company_meta_title: { type: String },
    company_meta_description: { type: String },
    company_meta_keywords: { type: String },
    company_meta_phones: { type: String },
    company_meta_emails: { type: String },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files',
    }],
}, { timestamps: true });

const Data = mongoose.model('Data', dataSchema);

export default Data;
