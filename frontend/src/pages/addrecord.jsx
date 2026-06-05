import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/uploadFile';
import Layout from '../components/Layout';
import { RECORD_API } from '../utils/api';
import './styles/app.css';

const FIELD_GROUPS = [
  {
    title: 'List Info',
    fields: [
      { key: 'list_name', label: 'List Name' },
      { key: 'query', label: 'Query' },
      { key: 'email_format', label: 'Email Format' },
    ],
  },
  {
    title: 'Person Details',
    fields: [
      { key: 'person_first_name', label: 'First Name' },
      { key: 'person_last_name', label: 'Last Name' },
      { key: 'person_headline', label: 'Headline' },
      { key: 'person_job_title', label: 'Job Title' },
      { key: 'person_location', label: 'Location' },
      { key: 'person_business_email', label: 'Business Email', type: 'email' },
      { key: 'person_personal_email', label: 'Personal Email', type: 'email', required: true },
      { key: 'person_phone', label: 'Phone', type: 'tel', required: true },
      { key: 'person_company_name', label: 'Company Name' },
      { key: 'person_city', label: 'City' },
      { key: 'person_linkedin_id', label: 'LinkedIn ID' },
      { key: 'person_linkedin_url', label: 'LinkedIn URL' },
    ],
  },
  {
    title: 'Company Details',
    fields: [
      { key: 'company_name', label: 'Company Name' },
      { key: 'company_founded', label: 'Founded' },
      { key: 'company_size', label: 'Size' },
      { key: 'company_type', label: 'Type' },
      { key: 'company_country', label: 'Country' },
      { key: 'company_industry', label: 'Industry' },
      { key: 'company_address', label: 'Address' },
      { key: 'company_linkedin_url', label: 'LinkedIn URL' },
      { key: 'company_linkedin_id', label: 'LinkedIn ID' },
      { key: 'company_meta_title', label: 'Meta Title' },
      { key: 'company_meta_description', label: 'Meta Description' },
      { key: 'company_meta_keywords', label: 'Meta Keywords' },
      { key: 'company_meta_phones', label: 'Meta Phones' },
      { key: 'company_meta_emails', label: 'Meta Emails', type: 'email' },
    ],
  },
];

const initialFormData = FIELD_GROUPS.flatMap((g) => g.fields).reduce((acc, field) => {
  acc[field.key] = '';
  return acc;
}, {});

const AddRecord = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.person_personal_email && !formData.person_phone) {
      setIsError(true);
      setMessage('Please provide at least an email or phone number');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      const token = Cookies.get('user');
      await axios.post(`${RECORD_API}/createRecord`, {
        user: token,
        formData,
      });
      setIsError(false);
      setMessage('Record added successfully!');
      setFormData(initialFormData);
      setTimeout(() => navigate('/records'), 1500);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Failed to add record');
    }
    setIsSubmitting(false);
  };

  return (
    <Layout>
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add Record</h1>
            <p className="text-gray-500 mt-1">Create a new contact entry</p>
          </div>
          <button
            onClick={() => navigate('/records')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Records
          </button>
        </div>

        <form onSubmit={onHandleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-8" style={{ marginBottom: 24 }}>
          {FIELD_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">{group.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type={field.type || 'text'}
                      name={field.key}
                      value={formData[field.key]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {message && (
            <p className={`text-sm text-center ${isError ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/records')}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium"
            >
              {isSubmitting ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </form>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Or import from CSV</h2>
          <FileUpload />
        </div>
    </div>
    </Layout>
  );
};

export default AddRecord;
