import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, XCircle } from 'lucide-react';
import './Pages.css';

const DeleteAccount = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [showNuUh, setShowNuUh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Handles the initial delete request
  const handleDeleteRequest = () => {
    setShowWarning(true);
  };

  // Handles the confirmation of deletion
  const handleConfirmDelete = () => {
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      setShowWarning(false);
      setShowNuUh(true);
    }, 1500);
  };

  // Handles canceling the deletion
  const handleCancelDelete = () => {
    setShowWarning(false);
  };

  // Handles closing the "nu uh" message
  const handleCloseNuUh = () => {
    setShowNuUh(false);
  };

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
        <h1>Delete Account</h1>
        <p>Permanently delete your account and all associated data</p>
      </div>

      <div className="content-card" style={{ maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <XCircle size={64} style={{ color: '#e74c3c', marginBottom: '20px' }} />
          <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>Danger Zone</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            This action cannot be undone. Deleting your account will permanently remove all your data, 
            including reports, settings, and activity history.
          </p>
          
          <button
            onClick={handleDeleteRequest}
            className="btn-danger"
            style={{ width: '100%' }}
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <AlertTriangle size={48} style={{ color: '#f39c12', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Are you sure?</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                This action will permanently delete your account and cannot be undone. 
                All your data will be lost forever.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleCancelDelete}
                className="btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn-danger"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Nu Uh" Modal */}
      {showNuUh && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '300px',
            width: '90%',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>😏</div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Nu uh!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Not implementing this right now lol
            </p>
            <button
              onClick={handleCloseNuUh}
              className="btn-primary"
            >
              Fine, I'll stay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
