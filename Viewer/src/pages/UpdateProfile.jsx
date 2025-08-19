import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ArrowLeft, Save } from 'lucide-react';
import './Pages.css';

// Example Profile used
const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Steve',
    lastName: 'Dinsmoor',
    email: 'steve.dinsmoor@brewster.com',
    phone: '(555) 123-4567',
    department: 'IT',
    position: 'IT Administrator',
    location: 'Brewster EMS Headquarters',
    bio: 'Experienced IT administrator with over 10 years in emergency services technology management.'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  // Updates form data when user types in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Handles form submission and profile update logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      setIsLoading(false);
      return;
    }
    // Needs Email
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess('Profile updated successfully!');
      setIsLoading(false);
    }, 1500);
  };
// Back to settings button
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
        {/* Header information */}
        <h1>Update Profile</h1>
        <p>Update your personal information and account details</p>
      </div>

      <div className="content-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} className="signin-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="error-message" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>{success}</div>}
          {/* First name input */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>
          {/* Last Name Input */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          </div>
        {/* email address input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
        {/* Phone number input */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <Phone className="input-icon" size={18} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        {/* Department name input */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your department"
                />
              </div>
            </div>
          {/* Title/Position input */}
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your position"
                />
              </div>
            </div>
          </div>
          {/* Location of work input */}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <div className="input-wrapper">
              <MapPin className="input-icon" size={18} />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your location"
              />
            </div>
          </div>
          {/* Personal Biographical Input */}
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Tell us about yourself"
              rows="4"
              style={{ resize: 'vertical', padding: '12px', fontFamily: 'inherit' }}
            />
          </div>
        {/* Update profile button */}
          <button
            type="submit"
            disabled={isLoading}
            className="signin-button"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isLoading ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
