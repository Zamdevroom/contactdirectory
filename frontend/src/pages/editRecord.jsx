import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { RECORD_API } from '../utils/api';
import './styles/app.css';

const FIELDS = [
  { key: 'list_name', label: 'List Name' },
  { key: 'query', label: 'Query' },
  { key: 'email_format', label: 'Email Format' },
  { key: 'person_first_name', label: 'Person First Name' },
  { key: 'person_last_name', label: 'Person Last Name' },
  { key: 'person_headline', label: 'Person Headline' },
  { key: 'person_job_title', label: 'Person Job Title' },
  { key: 'person_location', label: 'Person Location' },
  { key: 'person_business_email', label: 'Person Business Email', type: 'email' },
  { key: 'person_personal_email', label: 'Person Personal Email', type: 'email' },
  { key: 'person_phone', label: 'Person Phone', type: 'tel' },
  { key: 'person_company_name', label: 'Person Company Name' },
  { key: 'person_city', label: 'Person City' },
  { key: 'person_linkedin_id', label: 'Person LinkedIn ID' },
  { key: 'person_linkedin_url', label: 'Person LinkedIn URL' },
  { key: 'company_name', label: 'Company Name' },
  { key: 'company_founded', label: 'Company Founded' },
  { key: 'company_size', label: 'Company Size' },
  { key: 'company_type', label: 'Company Type' },
  { key: 'company_country', label: 'Company Country' },
  { key: 'company_industry', label: 'Company Industry' },
  { key: 'company_address', label: 'Company Address' },
  { key: 'company_linkedin_url', label: 'Company LinkedIn URL' },
  { key: 'company_linkedin_id', label: 'Company LinkedIn ID' },
  { key: 'company_meta_title', label: 'Company Meta Title' },
  { key: 'company_meta_description', label: 'Company Meta Description' },
  { key: 'company_meta_keywords', label: 'Company Meta Keywords' },
  { key: 'company_meta_phones', label: 'Company Meta Phones' },
  { key: 'company_meta_emails', label: 'Company Meta Emails', type: 'email' },
];

const ViewRecord = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const id_ = location.state;
  const navigate = useNavigate();

  const fetchRecord = async () => {
    if (!id_) {
      navigate('/records');
      return;
    }
    try {
      const response = await axios.post(`${RECORD_API}/viewRecord`, { id: id_ });
      setData(response.data);
    } catch (error) {
      console.error(error);
      navigate('/records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${RECORD_API}/editRecord`, { data });
      setMessage('Record updated successfully');
      setTimeout(() => navigate('/records'), 1500);
    } catch (error) {
      setMessage('Failed to update record');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading record...
      </div>
    );
  }

  return (
    <Layout>
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Record</h1>
            <p className="text-gray-500 mt-1">Update contact information</p>
          </div>
          <button
            onClick={() => navigate('/records')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Records
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  name={field.key}
                  value={data[field.key] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
            ))}
          </div>

          {message && (
            <p className={`text-sm text-center mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate('/records')}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
    </div>
    </Layout>
  );
};

export default ViewRecord;
