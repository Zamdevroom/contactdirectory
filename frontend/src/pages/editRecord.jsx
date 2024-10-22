import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ViewRecord = () => {

    const [data, setData] = useState({});
    const location = useLocation();
    const id_ = location.state;
    const navigate = useNavigate();

    const fetchRecord = async () => {

        try {
            const response = await axios.post('http://localhost:8000/record/viewRecord', { id: id_ });
            setData(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRecord();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/record/editRecord', { data });
            alert("Record updated successfully");
            navigate('/records');
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">View Record</h1>
            <div className="flex flex-col space-y-4">
                <div className="p-2 border border-gray-400 rounded">
                    <form onSubmit={handleSubmit}>
                        <label>
                            List Name:
                            <input
                                type="text"
                                name="list_name"
                                value={data.list_name}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Query:
                            <input
                                type="text"
                                name="query"
                                value={data.query}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Email Format:
                            <input
                                type="text"
                                name="email_format"
                                value={data.email_format}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person First Name:
                            <input
                                type="text"
                                name="person_first_name"
                                value={data.person_first_name}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Last Name:
                            <input
                                type="text"
                                name="person_last_name"
                                value={data.person_last_name}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Headline:
                            <input
                                type="text"
                                name="person_headline"
                                value={data.person_headline}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Job Title:
                            <input
                                type="text"
                                name="person_job_title"
                                value={data.person_job_title}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Location:
                            <input
                                type="text"
                                name="person_location"
                                value={data.person_location}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Business Email:
                            <input
                                type="email"
                                name="person_business_email"
                                value={data.person_business_email}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Personal Email:
                            <input
                                type="email"
                                name="person_personal_email"
                                value={data.person_personal_email}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Phone:
                            <input
                                type="tel"
                                name="person_phone"
                                value={data.person_phone}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person Company Name:
                            <input
                                type="text"
                                name="person_company_name"
                                value={data.person_company_name}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person City:
                            <input
                                type="text"
                                name="person_city"
                                value={data.person_city}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person LinkedIn ID:
                            <input
                                type="text"
                                name="person_linkedin_id"
                                value={data.person_linkedin_id}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Person LinkedIn URL:
                            <input
                                type="text"
                                name="person_linkedin_url"
                                value={data.person_linkedin_url}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Name:
                            <input
                                type="text"
                                name="company_name"
                                value={data.company_name}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Founded:
                            <input
                                type="text"
                                name="company_founded"
                                value={data.company_founded}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Size:
                            <input
                                type="text"
                                name="company_size"
                                value={data.company_size}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Type:
                            <input
                                type="text"
                                name="company_type"
                                value={data.company_type}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Country:
                            <input
                                type="text"
                                name="company_country"
                                value={data.company_country}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Industry:
                            <input
                                type="text"
                                name="company_industry"
                                value={data.company_industry}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Address:
                            <input
                                type="text"
                                name="company_address"
                                value={data.company_address}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company LinkedIn URL:
                            <input
                                type="text"
                                name="company_linkedin_url"
                                value={data.company_linkedin_url}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company LinkedIn ID:
                            <input
                                type="text"
                                name="company_linkedin_id"
                                value={data.company_linkedin_id}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Meta Title:
                            <input
                                type="text"
                                name="company_meta_title"
                                value={data.company_meta_title}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Meta Description:
                            <input
                                type="text"
                                name="company_meta_description"
                                value={data.company_meta_description}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Meta Keywords:
                            <input
                                type="text"
                                name="company_meta_keywords"
                                value={data.company_meta_keywords}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Meta Phones:
                            <input
                                type="text"
                                name="company_meta_phones"
                                value={data.company_meta_phones}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <label>
                            Company Meta Emails:
                            <input
                                type="text"
                                name="company_meta_emails"
                                value={data.company_meta_emails}
                                onChange={handleChange}
                            />
                        </label>
                        <br /><br />
                        <button type="submit">Submit</button>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default ViewRecord;