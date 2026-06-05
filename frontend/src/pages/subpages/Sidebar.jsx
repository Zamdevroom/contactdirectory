import '../styles/Sidebar.css';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/authcontext';
import { USER_API } from '../../utils/api';

const Sidebar = ({ toggleSearchCollections, onAddRecord, recordCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = Cookies.get('user');
        const response = await axios.get(`${USER_API}/current`, {
          headers: { authorization: userId },
        });
        setUserdata(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'All Contacts', path: '/records', icon: '👥' },
    { label: 'Add Contact', path: '/addrecord', icon: '➕' },
  ];

  return (
    <div id="sidebar" className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-main">
          <div className="sidebar-scroll">
            <div id="organization-switcher" className="no-select" onClick={() => navigate('/dashboard')}>
              <div className="avatar">
                <span className="initials">
                  {userdata.firstname && userdata.lastname
                    ? `${userdata.firstname[0]}${userdata.lastname[0]}`
                    : 'CD'}
                </span>
              </div>
              <div className="info-container flex-grow-1">
                <div className="organization-name">Contact Directory</div>
                <div className="user-display-name">
                  {userdata.firstname ? `${userdata.firstname} ${userdata.lastname}` : 'User'}
                </div>
              </div>
            </div>

            <hr className="separator-line" />

            <div className="sidebar-heading">
              <div className="heading-title">Navigation</div>
              <div className="heading-icons">
                <button className="heading-icon" title="Search Collections" onClick={toggleSearchCollections}>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18">
                    <path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z" />
                  </svg>
                </button>
                <button className="heading-icon" title="Add New Contact" onClick={() => navigate('/addrecord')}>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="18" width="18">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="menu-links">
              {navItems.map((item) => (
                <div key={item.path} className={`sidebar-link ${location.pathname === item.path ? 'sidebar-link-selected' : ''}`}>
                  <button className="inner-link sidebar-nav-btn" onClick={() => navigate(item.path)}>
                    <span className="icon">{item.icon}</span>
                    <span className="link_label">{item.label}</span>
                    {item.path === '/records' && recordCount > 0 && (
                      <span className="sidebar-badge">{recordCount}</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-link">
            <button className="inner-link sidebar-nav-btn" onClick={() => navigate('/dashboard')}>
              <span className="icon">⚙️</span>
              <span className="link_label">Dashboard</span>
            </button>
          </div>
          <div className="sidebar-footer-link">
            <button className="inner-link sidebar-nav-btn" onClick={handleLogout}>
              <span className="icon">🚪</span>
              <span className="link_label">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
