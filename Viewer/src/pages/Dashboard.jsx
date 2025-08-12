import React from 'react';
import './Pages.css';

const Dashboard = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>📊 Dashboard Overview</h1>
        <p>Real-time monitoring of Brewster EMS operations</p>
      </div>
      
      
      
      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🚑</div>
            <div className="activity-content">
              <div className="activity-title">Vehicle 12 dispatched</div>
              <div className="activity-time">2 minutes ago</div>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <div className="activity-title">Call completed - Vehicle 8</div>
              <div className="activity-time">5 minutes ago</div>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">⚠️</div>
            <div className="activity-content">
              <div className="activity-title">Maintenance alert - Vehicle 3</div>
              <div className="activity-time">15 minutes ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
