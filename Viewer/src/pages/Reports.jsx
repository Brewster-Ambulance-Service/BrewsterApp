import React, { useMemo, useState } from 'react';
import './Pages.css';



const Reports = () => {
  // Sample data (includes division & costCenter)
  const reportData = [
    { id: 1, name: 'Response Time Analysis', type: 'Performance', division: '1',    costCenter: '1 ALS Boston', lastGenerated: '2 hours ago',    status: 'Ready' },
    { id: 2, name: 'Vehicle Efficiency Report', type: 'Operations', division: '2',       costCenter: '2 FS Quincy', lastGenerated: '1 day ago',     status: 'Ready' },
    { id: 3, name: 'Monthly Performance Summary', type: 'Executive', division: '3', costCenter: '3 BLS Brockton', lastGenerated: '3 days ago',    status: 'Ready' },
    { id: 4, name: 'Incident Response Report', type: 'Operations',   division: '4', costCenter: '4 - Navigator Sturdy', lastGenerated: '1 week ago',    status: 'Unprepared' },
    { id: 5, name: 'AI prediction report', type: 'Software',         division: '5', costCenter: '5 BLS RI', lastGenerated: '2 minutes ago', status: 'In-Progress' },
  ];

  // Filters
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [costCenterFilter, setCostCenterFilter] = useState('All');

  const filteredReports = useMemo(() => {
    return reportData.filter((r) =>
      (divisionFilter === 'All' || r.division === divisionFilter) &&
      (costCenterFilter === 'All' || r.costCenter === costCenterFilter)
    );
  }, [divisionFilter, costCenterFilter, reportData]);

  const clearFilters = () => {
    setDivisionFilter('All');
    setCostCenterFilter('All');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Reports &amp; Analytics</h1>
        <p>Generate and view comprehensive reports</p>

        <div className="page-actions">
          <button className="btn-primary">Download Report CSV</button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="divisionSelect">Division</label>
          <select
            id="divisionSelect"
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
          >
            {DIVISIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="costCenterSelect">Cost Center</label>
          <select
            id="costCenterSelect"
            value={costCenterFilter}
            onChange={(e) => setCostCenterFilter(e.target.value)}
          >
            {COST_CENTERS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <button className="btn-secondary" onClick={clearFilters}>Clear filters</button>
        <span className="filter-count">{filteredReports.length} result(s)</span>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Deployed Ambulances</h3>
          <div className="card-value">12</div>
          <div className="card-description">Currently responding to calls</div>
        </div>
        <div className="dashboard-card">
          <h3>Avg. Response Time</h3>
          <div className="card-value">4.2 min</div>
          <div className="card-description">Last 24 hours</div>
        </div>
        <div className="dashboard-card">
          <h3>UHU</h3>
          <div className="card-value">94%</div>
          <div className="card-description">This month</div>
        </div>
        <div className="dashboard-card">
          <h3>Missed Calls</h3>
          <div className="card-value">156</div>
          <div className="card-description">Today</div>
        </div>
      </div>

      {/* Table */}
      <div className="content-grid">
        <div className="content-card full-width">
          <h3>Recent Reports</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Type</th>
                  <th>Division</th>
                  <th>Cost Center</th>
                  <th>Last Generated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.name}</td>
                    <td>{report.type}</td>
                    <td>{report.division}</td>
                    <td>{report.costCenter}</td>
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
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '1rem' }}>
                      No reports match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};



const DIVISIONS = [
  'All',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  'Flordia',
];

const COST_CENTERS = [
  'All',
  'Billing',
  'Billing Salary',
  'Business Development',
  'CMTI',
  'COVID',
  'Dispatch - Boston',
  'Dispatch - Brockton',
  'Dispatch - Weymouth',
  'Finance',
  'Garage - Boston',
  'Garage - Brockton',
  'Garage - Hooksett',
  'Garage - New Bedford',
  'Garage - Weymouth',
  'Garage - Worcester',
  'Human Resources',
  'Human Resources Salary',
  'IT',
  'Management',
  'Medical Call Center',
  'Midmanagement',
  'MIH',
  'Office',
  'Ops QA',
  'Orientation',
  'Other Overhead',
  'Scheduling',
  'Supplies',
  'Training',
  '1 - Navigator BMC',
  '1 - Navigator Brigham',
  '1 - Navigator Faulkner',
  '1 - Navigator Mass General',
  '1 - Navigator Newton Wellesley',
  '1 - Navigator NSMC Salem',
  '1 - Navigator Tufts',
  '1 ALS Boston',
  '1 ALS Wakefield',
  '1 BLS Boston',
  '1 BLS Wakefield',
  '1 CC Boston',
  '1 CC Wakefield',
  '1 FS Boston',
  '1 Light Duty',
  '2 - Navigator BI System',
  '2 ALS Braintree',
  '2 ALS Plymouth',
  '2 ALS Quincy',
  '2 ALS Weymouth',
  '2 BC Weymouth',
  '2 BLS Braintree',
  '2 BLS Plymouth',
  '2 BLS Quincy',
  '2 BLS Weymouth',
  '2 CC Braintree',
  '2 CC Plymouth',
  '2 CC Quincy',
  '2 CC Weymouth',
  '2 FS Plymouth',
  '2 FS Quincy',
  '2 FS Weymouth',
  '2 Light Duty',
  '3 - Navigator Brockton',
  '3 ALS Brockton',
  '3 BC Brockton',
  '3 BLS Brockton',
  '3 CC Brockton',
  '3 FS Brockton',
  '3 Light Duty',
  '4 - Navigator Sturdy',
  '4 - Navigators SouthCoast',
  '4 ALS Attleboro',
  '4 ALS Middleboro',
  '4 ALS New Bedford',
  '4 ALS Taunton',
  '4 ALS Wareham',
  '4 BC New Bedford',
  '4 BC Taunton',
  '4 BLS Attleboro',
  '4 BLS Middleboro',
  '4 BLS New Bedford',
  '4 BLS Taunton',
  '4 BLS Wareham',
  '4 CC Attleboro',
  '4 CC Middleboro',
  '4 CC New Bedford',
  '4 CC Taunton',
  '4 CC Wareham',
  '4 FS Attleboro',
  '4 FS New Bedford',
  '4 FS Taunton',
  '4 Light Duty',
  '5 BLS RI',
  '5 Cardiac RI',
  '5 CC RI',
  '6 ALS Framingham',
  '6 ALS Hopedale',
  '6 ALS Worcester',
  '6 BLS Framingham',
  '6 BLS Hopedale',
  '6 BLS Worcester',
  '6 CC Framingham',
  '6 CC Hopedale',
  '6 CC Worcester',
  '6 FS - Framingham',
  '6 FS - Worcester',
  '6 Light Duty',
  '7 ALS Hooksett',
  '7 BLS Hooksett',
  '7 CC Hooksett',
  '7 FS Hooksett',
  '7 Light Duty',
  '911 Braintree ALS',
  '911 Brockton ALS',
  '911 Brockton BLS',
  '911 Framingham ALS',
  '911 Middleboro ALS',
  '911 Plymouth ALS',
  '911 Quincy ALS',
  '911 Quincy BLS',
  '911 Taunton ALS',
  '911 Taunton BLS',
  'ALS Detail - Division 1',
  'ALS Detail - Division 2',
  'ALS Detail - Division 3',
  'ALS Detail - Division 4',
  'ALS Detail - Division 5',
  'ALS Detail - Division 6',
  'ALS Detail - Division 7',
  'BLS Detail - Division 1',
  'BLS Detail - Division 2',
  'BLS Detail - Division 3',
  'BLS Detail - Division 4',
  'BLS Detail - Division 5',
  'BLS Detail - Division 6',
  'BLS Detail - Division 7',
  'Demo',
  'FEMA Deployment',
  'FL ALS',
  'FL BLS',
  'FL Chair Car',
  'FL Comms',
  'FL FS',
  'Holy Cross - ALS',
  'Holy Cross - BLS',
  'Metro - LEC MSRU',
  'Quincy SWAT',
  'Xfinity-ALS',
  'Xfinity-BLS'
];



export default Reports;
