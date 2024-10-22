
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../utils/authcontext';
const Navbar = () => {
  const navigate = useNavigate();
    const {  logout } = useAuth();
    const handleLogout = async () => {
        await logout;
        navigate('/'); 
      };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h2 >
        Navbar
      </h2>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={handleLogout} to="#">
              Logout
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
