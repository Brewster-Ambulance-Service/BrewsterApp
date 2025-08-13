// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AnomalyDetector from './pages/AnomalyDetector';
import VehicleManagement from './pages/VehicleManagement';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings';
import './App.css';
import 'leaflet/dist/leaflet.css'; // keep Leaflet CSS globally for the embedded map
import { ThemeProvider } from './contexts/ThemeContext';
import BrewsterThreeLogo from './assets/BrewsterThree.png';

import { healthCheck, runQuery } from './services/snowflakeApi';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [health, setHealth] = useState({ ok: false, now: null, error: null });
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  useEffect(() => {
    let mounted = true;
    healthCheck()
      .then((h) => mounted && setHealth(h))
      .catch((e) => mounted && setHealth({ ok: false, error: e.message }));
    return () => { mounted = false; };
  }, []);

  const runTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const data = await runQuery('SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA()');
      setTestResult(data);
    } catch (e) {
      setTestResult({ error: e.message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="content-header">
            <h1>
              <img src={BrewsterThreeLogo} alt="Brewster Three Logo" className="header-logo" />
            </h1>

            <div className="health-chip" title={health.error || ''}>
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  marginRight: 8,
                  background: health.ok ? '#22c55e' : '#ef4444'
                }}
              />
              {health.now ? ` · ${new Date(health.now).toLocaleString()}` : ''}
            </div>
          </div>

          {testResult && (
            <div className="test-result" style={{ padding: 12, background: '#f6f6f6', borderRadius: 8, margin: '0 12px 12px' }}>
              {testResult.error ? (
                <div style={{ color: '#b91c1c' }}>Error: {testResult.error}</div>
              ) : (
                <pre style={{ overflowX: 'auto', margin: 0 }}>
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              )}
            </div>
          )}

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/anomaly-detector" element={<AnomalyDetector />} />
            <Route path="/vehicles" element={<VehicleManagement />} /> {/* map is inside this page */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
