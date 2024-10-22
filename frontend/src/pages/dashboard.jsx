import React from 'react';
import { useAuth } from '../utils/authcontext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  return (
    // <div className="dashboard">
    //   <header className="dashboard-header">
    //     <h1> Dashboard</h1>
    //   </header>
    //   <div className="dashboard-body">
    //     <main className="dashboard-content">
    //       <h2>Welcome Back! {user.firstname} {user.lastname}</h2>
    //     </main>
    //     <button onClick={() => {
    //       navigate('/records');
    //     }}>View Records</button>
    //     <button onClick={() => {
    //       navigate('/addrecord');
    //     }}>Add Record</button>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="text-center text-2xl font-semibold pt-4">
      Welcome to your Dashboard
    </div>
    <div className="flex space-x-4 mt-4">
      <button className="w-32 h-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm text-center mb-2" onClick={() => {navigate('/records');}}>View Records</button>
      <button className="w-32 h-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm text-center mb-2" onClick={() => {navigate('/addrecord');}}>Add Record</button>
    </div>
  </div>
  );
};

export default Dashboard;
