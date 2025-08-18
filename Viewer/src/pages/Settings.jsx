import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your application preferences</p>
      </div>
      
      <div className="content-grid">
        <div className="content-card">
          <h3>User Preferences</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Email Notifications</span>
                <span className="setting-description">Receive alerts via email</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Auto Refresh</span>
                <span className="setting-description">Automatically update data</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Dark Mode</span>
                <span className="setting-description">Use dark theme</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="content-card">
          <h3>System Information</h3>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Version</span>
              <span className="info-value">1.2.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated</span>
              <span className="info-value">2024-01-15</span>
            </div>
            <div className="info-item">
              <span className="info-label">Database</span>
              <span className="info-value">Connected</span>
            </div>
            <div className="info-item">
              <span className="info-label">API Status</span>
              <span className="info-value">Online</span>
            </div>
          </div>
        </div>
        

        <div className="content-card">
          <h3>Account Management</h3>
          <div className="info-list">
            <div className="info-item">
              <button 
                className="btn-primary" 
                onClick={() => navigate('/settings/change-password')}
              >
                Change Password
              </button>
            </div>
            <div className="info-item">
              <button 
                className="btn-secondary" 
                onClick={() => navigate('/settings/update-profile')}
              >
                Update Profile
              </button>
            </div>
            <div className="info-item">
              <button 
                className="btn-secondary" 
                onClick={() => navigate('/settings/export-data')}
              >
                Export Data
              </button>
            </div>
            <div className="info-item">
              <button 
                className="btn-danger" 
                onClick={() => navigate('/settings/delete-account')}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
