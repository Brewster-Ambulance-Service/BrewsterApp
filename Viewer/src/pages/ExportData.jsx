import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Users, Calendar, FileText, CheckCircle } from 'lucide-react';
import './Pages.css';

const ExportData = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Sample user data for demonstration
  const users = [
    { id: 1, name: 'Steve Dinsmoor', email: 'steve.dinsmoor@brewster.com', role: 'IT Administrator', department: 'IT' },
    { id: 2, name: 'Sarah Candio', email: 'sarah.johnson@brewster.com', role: 'EMT', department: 'Operations' },
    { id: 3, name: 'Mark Brewster', email: 'mike.rodriguez@brewster.com', role: 'Paramedic', department: 'Operations' },
    { id: 4, name: 'Jeff Cronin', email: 'lisa.chen@brewster.com', role: 'Dispatcher', department: 'Dispatch' },
    { id: 5, name: 'James Troy Mayer', email: 'david.wilson@brewster.com', role: 'EMT', department: 'Operations' },
    { id: 6, name: 'Jason Smith', email: 'jennifer.brown@brewster.com', role: 'Paramedic', department: 'Operations' },
    { id: 7, name: 'Chris DiBona', email: 'robert.taylor@brewster.com', role: 'Supervisor', department: 'Management' },
    { id: 8, name: 'Patric Fahey', email: 'amanda.davis@brewster.com', role: 'EMT', department: 'Operations' }
  ];

  // Handles user selection for export
  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Handles select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  // Handles date range changes
  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handles export format changes
  const handleFormatChange = (format) => {
    setExportFormat(format);
  };

  // Handles export submission
  const handleExport = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user to export data for.');
      return;
    }

    setIsLoading(true);
    setSuccess('');

    // Simulate export process
    setTimeout(() => {
      setSuccess(`Successfully exported data for ${selectedUsers.length} user(s) in ${exportFormat.toUpperCase()} format!`);
      setIsLoading(false);
    }, 200);
  };
  // Settings button and header
  return (
    <div className="page-content">
      <div className="page-header">
        <button 
          onClick={() => navigate('/settings')} 
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}
        >
          <ArrowLeft size={16} />
          Back to Settings
        </button>
        <h1>Export Account Data</h1>
        <p>Export user account data for administrative purposes</p>
      </div>

      <div className="content-grid">
        {/* Export Options */}
        <div className="content-card">
          <h3>Export Options</h3>
          
          <div className="form-group">
            <label>Date Range</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="input-wrapper">
                <Calendar className="input-icon" size={18} />
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="form-input"
                />
              </div>
              {/* Choosing Date Range */}
              <div className="input-wrapper">
                <Calendar className="input-icon" size={18} />
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        {/* Choose Which Format to Export (JSON, CSV, Excel) */}
          <div className="form-group">
            <label>Export Format</label>
            <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => handleFormatChange(e.target.value)}
                />
                <FileText size={16} />
                CSV
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => handleFormatChange(e.target.value)}
                />
                <FileText size={16} />
                JSON
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => handleFormatChange(e.target.value)}
                />
                <FileText size={16} />
                Excel
              </label>
            </div>
          </div>
          {/* Text for succesfully exporting the data (Green) */}
          {success && (
            <div className="error-message" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} />
              {success}
            </div>
          )}
          {/* Export Data Button */}
          <button
            onClick={handleExport}
            disabled={isLoading || selectedUsers.length === 0}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}
          >
            <Download size={16} />
            {isLoading ? 'Exporting...' : `Export Data (${selectedUsers.length} users)`}
          </button>
        </div>

        {/* User Selection */}
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Select Users</h3>
            <button
              onClick={handleSelectAll}
              className="btn-small"
            >
              {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
            
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {users.map(user => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedUsers.includes(user.id) ? 'var(--bg-primary)' : 'transparent'
                }}
                onClick={() => handleUserSelection(user.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelection(user.id)}
                  style={{ marginRight: '12px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {user.email}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {user.role} • {user.department}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
