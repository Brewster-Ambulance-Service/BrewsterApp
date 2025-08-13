import React, { useState } from 'react';
import './Pages.css';

const AnomalyDetector = () => {
  const [payPeriod, setPayPeriod] = useState('2025-08-09 - 2025-08-11');
  const [selectedAnomaly, setSelectedAnomaly] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [selectedCostCenter, setSelectedCostCenter] = useState('All');

  // Sample data based on the images
  const anomalyData = [
    {
      id: 1,
      name: 'Ruth Harris',
      employeeId: 4648,
      date: '2025-08-09',
      value1: 61,
      division: '2 BLS Plymo',
      costCenter: 450,
      value2: 7,
      duration: 12,
      anomaly: 'Clocked out at least 90 minutes early'
    },
    {
      id: 2,
      name: 'Benjamin Barron',
      employeeId: 1708,
      date: '2025-08-09',
      value1: 51,
      division: '4 BLS Attleb',
      costCenter: 450,
      value2: 3.5,
      duration: 10,
      anomaly: 'Did not punch in/PTO'
    },
    {
      id: 3,
      name: 'ANDREA GABRIEL',
      employeeId: 4117,
      date: '2025-08-09',
      value1: 157,
      division: '6 BLS Framingham',
      costCenter: 450,
      value2: 7.9,
      duration: 24,
      anomaly: 'Shift is at least 4 hours longer than scheduled'
    },
    {
      id: 4,
      name: 'Maxwell Kolp',
      employeeId: 4671,
      date: '2025-08-09',
      value1: 50,
      division: '911 Plymouth ALS',
      costCenter: 450,
      value2: 0,
      duration: 8,
      anomaly: 'Forgot to clock out for at least 10 hours'
    },
    {
      id: 5,
      name: 'Savannah Lima',
      employeeId: 4606,
      date: '2025-08-09',
      value1: 35,
      division: '0 Dispatch - Weymouth',
      costCenter: 450,
      value2: 13,
      duration: 15,
      anomaly: 'ALS/IFT earning code assigned to 911 cost center'
    },
    {
      id: 6,
      name: 'Mateus Sampaio',
      employeeId: 2947,
      date: '2025-08-09',
      value1: 157,
      division: '0 Dispatch - Brockton',
      costCenter: 450,
      value2: 6.23,
      duration: 17,
      anomaly: 'Clocked out at least 90 minutes early'
    },
    {
      id: 7,
      name: 'Gerry Pugsley',
      employeeId: 4186,
      date: '2025-08-09',
      value1: 50,
      division: '1 CC Boston',
      costCenter: 450,
      value2: 12.93,
      duration: 13,
      anomaly: 'Did not punch in/PTO'
    },
    {
      id: 8,
      name: 'Kerri Dempsey',
      employeeId: 2011,
      date: '2025-08-09',
      value1: 35,
      division: '2 CC Quincy',
      costCenter: 450,
      value2: 3.9,
      duration: 16,
      anomaly: 'Clocked out at least 90 minutes early'
    },
    {
      id: 9,
      name: 'Sydney Self',
      employeeId: 4547,
      date: '2025-08-09',
      value1: 157,
      division: '6 BLS Worcester',
      costCenter: 450,
      value2: 5.9,
      duration: 11,
      anomaly: 'Shift is at least 4 hours longer than scheduled'
    },
    {
      id: 10,
      name: 'Gabrielle Dominique',
      employeeId: 3384,
      date: '2025-08-09',
      value1: 35,
      division: '0 Medical Call Center',
      costCenter: 450,
      value2: 8.55,
      duration: 12,
      anomaly: 'Clocked out at least 90 minutes early'
    }
  ];

  // Summary data based on the dashboard summary table
  const summaryData = [
    {
      anomaly: 'ALS/IFT earning code assigned to 911 cost center',
      div1: 0, div2: 0, div3: 0, div4: 0, div5: 0, div6: 0, div7: 0, florida: 0, other: 0, total: 0
    },
    {
      anomaly: 'Clocked out at least 90 minutes early',
      div1: 2, div2: 9, div3: 2, div4: 11, div5: 1, div6: 5, div7: 0, florida: 0, other: 1, total: 31
    },
    {
      anomaly: 'Did not punch in/PTO',
      div1: 0, div2: 2, div3: 1, div4: 3, div5: 0, div6: 6, div7: 0, florida: 0, other: 0, total: 12
    },
    {
      anomaly: 'Forgot to clock out for at least 10 hours',
      div1: 0, div2: 0, div3: 0, div4: 0, div5: 0, div6: 0, div7: 0, florida: 0, other: 0, total: 0
    },
    {
      anomaly: 'Shift is at least 4 hours longer than scheduled',
      div1: 0, div2: 3, div3: 0, div4: 0, div5: 0, div6: 0, div7: 0, florida: 0, other: 0, total: 3
    },
    {
      anomaly: 'Actual Total',
      div1: 2, div2: 14, div3: 3, div4: 14, div5: 1, div6: 11, div7: 0, florida: 0, other: 1, total: 46
    }
  ];

  const anomalyTypes = [
    'All',
    'Shift is at least 4 hours longer than scheduled',
    'Forgot to clock out for at least 10 hours',
    'Clocked out at least 90 minutes early',
    'ALS/IFT earning code assigned to 911 cost center',
    'Did not punch in/PTO'
  ];

  const divisions = [
    'All',
    'Division 1',
    'Division 2',
    'Division 3',
    'Division 4',
    'Division 5',
    'Division 6',
    'Division 7',
    'Florida',
    'Other'
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Anomaly Detector</h1>
        <p>Monitor and analyze employee timekeeping and operational anomalies</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Pay Period:</label>
          <select 
            value={payPeriod} 
            onChange={(e) => setPayPeriod(e.target.value)}
            className="filter-select"
          >
            <option value="2025-08-09 - 2025-08-11">2025-08-09 - 2025-08-11</option>
            <option value="2025-08-02 - 2025-08-08">2025-08-02 - 2025-08-08</option>
            <option value="2025-07-26 - 2025-08-01">2025-07-26 - 2025-08-01</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Anomaly:</label>
          <select 
            value={selectedAnomaly} 
            onChange={(e) => setSelectedAnomaly(e.target.value)}
            className="filter-select"
          >
            {anomalyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Division:</label>
          <select 
            value={selectedDivision} 
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="filter-select"
          >
            {divisions.map(division => (
              <option key={division} value={division}>{division}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Cost Center:</label>
          <select 
            value={selectedCostCenter} 
            onChange={(e) => setSelectedCostCenter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="450">450</option>
            <option value="451">451</option>
            <option value="452">452</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn-primary">DOWNLOAD CSV</button>
          <button className="btn-secondary">SEARCH</button>
        </div>
      </div>

      {/* Anomaly Data Table */}
      <div className="content-card full-width">
        <h3>Anomaly Data</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Date</th>
                <th>Value</th>
                <th>Division</th>
                <th>Cost Center</th>
                <th>Value</th>
                <th>Duration</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {anomalyData.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.employeeId}</td>
                  <td>{row.date}</td>
                  <td>{row.value1}</td>
                  <td>{row.division}</td>
                  <td>{row.costCenter}</td>
                  <td>{row.value2}</td>
                  <td>{row.duration}</td>
                  <td>
                    <span className="anomaly-description">{row.anomaly}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="content-card full-width">
        <h3>Dashboard Summary</h3>
        <div className="table-container">
          <table className="data-table summary-table">
            <thead>
              <tr>
                <th>Anomaly</th>
                <th>Division 1</th>
                <th>Division 2</th>
                <th>Division 3</th>
                <th>Division 4</th>
                <th>Division 5</th>
                <th>Division 6</th>
                <th>Division 7</th>
                <th>Florida</th>
                <th>Other</th>
                <th>Totals</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row, index) => (
                <tr key={index} className={row.anomaly === 'Actual Total' ? 'total-row' : ''}>
                  <td className="anomaly-name">{row.anomaly}</td>
                  <td>{row.div1}</td>
                  <td>{row.div2}</td>
                  <td>{row.div3}</td>
                  <td>{row.div4}</td>
                  <td>{row.div5}</td>
                  <td>{row.div6}</td>
                  <td>{row.div7}</td>
                  <td>{row.florida}</td>
                  <td>{row.other}</td>
                  <td className="total-cell">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetector;
