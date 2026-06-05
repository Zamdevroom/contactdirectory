import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { RECORD_API } from '../utils/api';
import './styles/app.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const userId = Cookies.get('user');
        const response = await axios.post(`${RECORD_API}/getRecords`, { user: userId });
        setRecords(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const withEmail = records.filter((r) => r.person_personal_email || r.person_business_email).length;
  const withPhone = records.filter((r) => r.person_phone).length;
  const withCompany = records.filter((r) => r.company_name || r.person_company_name).length;
  const recentRecords = records.slice(-5).reverse();

  const getContactName = (record) => {
    const name = [record.person_first_name, record.person_last_name].filter(Boolean).join(' ');
    return name || record.person_personal_email || record.person_phone || 'Unnamed Contact';
  };

  return (
    <Layout>
      <div className="dashboard-page">
        <div className="dashboard-welcome">
          <h1>Welcome back, {user?.firstname || 'User'}!</h1>
          <p>Here&apos;s an overview of your contact directory</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading stats...</p>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">👥</div>
                <div>
                  <div className="stat-value">{records.length}</div>
                  <div className="stat-label">Total Contacts</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">📧</div>
                <div>
                  <div className="stat-value">{withEmail}</div>
                  <div className="stat-label">With Email</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple">📞</div>
                <div>
                  <div className="stat-value">{withPhone}</div>
                  <div className="stat-label">With Phone</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange">🏢</div>
                <div>
                  <div className="stat-value">{withCompany}</div>
                  <div className="stat-label">With Company</div>
                </div>
              </div>
            </div>

            <div className="dashboard-actions">
              <button className="action-card" onClick={() => navigate('/records')}>
                <div className="action-card-icon" style={{ background: '#dbeafe' }}>📋</div>
                <h3>View All Records</h3>
                <p>Browse, search, sort and manage your contacts</p>
              </button>
              <button className="action-card" onClick={() => navigate('/addrecord')}>
                <div className="action-card-icon" style={{ background: '#d1fae5' }}>➕</div>
                <h3>Add New Contact</h3>
                <p>Create a contact manually or import from CSV</p>
              </button>
              <button className="action-card" onClick={() => navigate('/records')}>
                <div className="action-card-icon" style={{ background: '#ede9fe' }}>📥</div>
                <h3>Import CSV</h3>
                <p>Go to records page and use the Import button</p>
              </button>
            </div>

            <div className="recent-section">
              <h2>Recent Contacts</h2>
              {recentRecords.length === 0 ? (
                <div className="empty-recent">
                  No contacts yet. Add your first contact to get started!
                </div>
              ) : (
                <div className="recent-list">
                  {recentRecords.map((record) => (
                    <div
                      key={record._id}
                      className="recent-item"
                      onClick={() => navigate('/editrecord', { state: record._id })}
                    >
                      <div>
                        <div className="recent-item-name">{getContactName(record)}</div>
                        <div className="recent-item-meta">
                          {record.person_job_title && `${record.person_job_title} · `}
                          {record.person_city || record.company_name || ''}
                        </div>
                      </div>
                      <div className="recent-item-email">
                        {record.person_personal_email || record.person_phone || ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
