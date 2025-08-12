import React from 'react';
import './Pages.css';

const Reports = () => {
  const reportData = [
    { id: 1, name: 'Response Time Analysis', type: 'Performance', lastGenerated: '2 hours ago', status: 'Ready' },
    { id: 2, name: 'Vehicle Efficiency Report', type: 'Operations', lastGenerated: '1 day ago', status: 'Ready' },
    { id: 3, name: 'Monthly Performance Summary', type: 'Executive', lastGenerated: '3 days ago', status: 'Ready' },
    { id: 4, name: 'Incident Response Report', type: 'Operations', lastGenerated: '1 week ago', status: 'Ready' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>📈 Reports & Analytics</h1>
        <p>Generate and view comprehensive reports</p>
      </div>
      
      <div className="page-actions">
        <button className="btn-primary">Generate New Report</button>
        <button className="btn-secondary">Schedule Report</button>
      </div>
      
      <div className="content-grid">
        <div className="content-card">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">4.2</div>
              <div className="stat-label">Avg Response Time (min)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">94%</div>
              <div className="stat-label">Efficiency Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">156</div>
              <div className="stat-label">Calls Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Active Vehicles</div>
            </div>
          </div>
        </div>
        
        <div className="content-card">
          <h3>Report Categories</h3>
          <div className="category-list">
            <div className="category-item">
              <span className="category-icon">📊</span>
              <span className="category-name">Performance Reports</span>
              <span className="category-count">3</span>
            </div>
            <div className="category-item">
              <span className="category-icon">🚑</span>
              <span className="category-name">Operations Reports</span>
              <span className="category-count">5</span>
            </div>
            <div className="category-item">
              <span className="category-icon">📋</span>
              <span className="category-name">Executive Reports</span>
              <span className="category-count">2</span>
            </div>
            <div className="category-item">
              <span className="category-icon">⚡</span>
              <span className="category-name">Real-time Reports</span>
              <span className="category-count">1</span>
            </div>
          </div>
        </div>
        
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
