import React from 'react';
import './Pages.css';

const Reports = () => {
  const reportData = [
    { id: 1, name: 'Response Time Analysis', type: 'Performance', lastGenerated: '2 hours ago', status: 'Ready' },
    { id: 2, name: 'Vehicle Efficiency Report', type: 'Operations', lastGenerated: '1 day ago', status: 'Ready' },
    { id: 3, name: 'Monthly Performance Summary', type: 'Executive', lastGenerated: '3 days ago', status: 'Ready' },
    { id: 4, name: 'Incident Response Report', type: 'Operations', lastGenerated: '1 week ago', status: 'Unprepared' },
    { id: 5, name: 'AI prediction report', type: 'Software', lastGenerated: '2 minutes ago', status: 'In-Progress' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>📈 Reports & Analytics</h1>
        <p>Generate and view comprehensive reports</p>
        

        <div className="page-actions">
        <button className="btn-primary">Download Report CSV</button>
      </div>


      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>🚑 Active Vehicles</h3>
          <div className="card-value">12</div>
          <div className="card-description">Currently responding to calls</div>
        </div>
        
        <div className="dashboard-card">
          <h3>⏱️ Avg Response Time</h3>
          <div className="card-value">4.2 min</div>
          <div className="card-description">Last 24 hours</div>
        </div>
        
        <div className="dashboard-card">
          <h3>📊 Efficiency Score</h3>
          <div className="card-value">94%</div>
          <div className="card-description">This month</div>
        </div>
        
        <div className="dashboard-card">
          <h3>📞 Total Calls</h3>
          <div className="card-value">156</div>
          <div className="card-description">Today</div>
        </div>
      </div>
      
      
      
      <div className="content-grid">
        
        <div className="content-card full-width">
          <h3>Recent Reports</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Type</th>
                  <th>Last Generated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((report) => (
                  <tr key={report.id}>
                    <td>{report.name}</td>
                    <td>{report.type}</td>
                    <td>{report.lastGenerated}</td>
                    <td>
                      <span className={`status-badge ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-small">View</button>
                      <button className="btn-small">Download</button>
                      <button className="btn-small">Share</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
