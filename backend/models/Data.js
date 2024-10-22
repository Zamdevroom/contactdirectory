import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    full_name: {
        type: String,
        
    },
    first_name: {
        type: String,
        
    },
    last_name: {
        type: String,
        
    },
    middle_name: {
        type: String,
        
    },
    suffix: {
        type: String,
        
    },
    title: {
        type: String,
        
    },
    nickname: {
        type: String,
        
    },
    gender: {
        type: String,
        
    },
    email_address: {
        type: String,
        
    },
    phone_number: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    country: {
        type: String,
        
    },
    zip_code: {
        type: String,
        
    },
    linkedin: {
        type: String,
        
    },
    website: {
        type: String,
        
    },
    social_media: {
        type: String,
        
    },
    company_name: {
        type: String,
        
    },
    job_title: {
        type: String,
        
    },
    department: {
        type: String,
        
    },
    industry: {
        type: String,
        
    },
    company_address: {
        type: String,
        
    },
    company_city: {
        type: String,
        
    },
    company_state: {
        type: String,
        
    },
    company_country: {
        type: String,
        
    },
    company_zip_code: {
        type: String,
        
    },
    company_linkedin: {
        type: String,
        
    },
    company_website: {
        type: String,
        
    },
    company_social_media: {
        type: String,
        
    },
    company_license: {
        type: String,
        
    },
    company_employees: {
        type: String,
        
    },
    notes: {
        type: String,
        
    },
    tags: {
        type: String,
        
    },
    last_contacted: {
        type: String,
        
    },
    communication_preferences: {
        type: String,
        
    },
    birthday: {
        type: String,
        
    },
    time_zone: {
        type: String,
        
    },
    // visibility_settings: {
    //     type: String,
        
    // },
    // cloud_sync: {
    //     type: String,
        
    // },
    // picture: {
    //     type: String,
        
    // },
    // favourites: {
    //     type: String,
        
    // },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files',
    }]
});

const Data = mongoose.model('Data', dataSchema);

export default Data;