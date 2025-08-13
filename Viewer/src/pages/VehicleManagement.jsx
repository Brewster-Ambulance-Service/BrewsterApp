import React from 'react';
import './Pages.css';

import MapWidget from '../components/MapWidget';

const VehicleManagement = () => {
  const vehicles = [
    { id: 1, name: 'Ambulance 01', status: 'Active',      location: 'Downtown',        lastUpdate: '2 min ago' },
    { id: 2, name: 'Ambulance 02', status: 'On Call',     location: 'North District',  lastUpdate: '5 min ago' },
    { id: 3, name: 'Ambulance 03', status: 'Maintenance', location: 'Garage',          lastUpdate: '1 hour ago' },
    { id: 4, name: 'Ambulance 04', status: 'Active',      location: 'South District',  lastUpdate: '1 min ago' },
    { id: 5, name: 'Ambulance 05', status: 'Available',   location: 'Central Station', lastUpdate: '10 min ago' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>🚑 Vehicle Management</h1>
        <p>Monitor and manage all emergency vehicles</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary">Add New Vehicle</button>
        <button className="btn-secondary">Export Data</button>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>Vehicle Status Overview</h3>
          <div className="status-grid">
            <div className="status-item active">
              <span className="status-count">3</span>
              <span className="status-label">Active</span>
            </div>
            <div className="status-item on-call">
              <span className="status-count">1</span>
              <span className="status-label">On Call</span>
            </div>
            <div className="status-item available">
              <span className="status-count">1</span>
              <span className="status-label">Available</span>
            </div>
            <div className="status-item maintenance">
              <span className="status-count">1</span>
              <span className="status-label">Maintenance</span>
            </div>
          </div>
        </div>

        {/* Facility Locations ONLY */}
        <div className="content-card full-width">
          <h3>Facility Locations</h3>
          <div style={{ height: 560, borderRadius: 12, overflow: 'hidden', background: '#eef2f7' }}>
            <MapWidget />
          </div>
        </div>

        <div className="content-card full-width">
          <h3>Vehicle List</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Last Update</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.name}</td>
                    <td>
                      <span className={`status-badge ${vehicle.status.toLowerCase().replace(' ', '-')}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td>{vehicle.location}</td>
                    <td>{vehicle.lastUpdate}</td>
                    <td>
                      <button className="btn-small">View</button>
                      <button className="btn-small">Edit</button>
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

export default VehicleManagement;
