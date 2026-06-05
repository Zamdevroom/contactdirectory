import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authcontext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/records', label: 'Records' },
  { path: '/addrecord', label: 'Add Record' },
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-brand" onClick={() => navigate('/dashboard')}>
            <div className="app-brand-icon">CD</div>
            <span className="app-brand-text">Contact Directory</span>
          </div>

          <nav className="app-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                className={`app-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="app-header-actions">
            {user && (
              <span className="app-user-name">
                {user.firstname} {user.lastname}
              </span>
            )}
            <button className="app-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;
