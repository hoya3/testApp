import React from 'react';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="dashboard-container" style={{ padding: 20 }}>
      <h2>Welcome{user ? `, ${user.username}` : ''}!</h2>
      <p>This is your dashboard. Add your protected content here.</p>
      <button onClick={() => onLogout && onLogout()}>Logout</button>
    </div>
  );
}

export default Dashboard;
