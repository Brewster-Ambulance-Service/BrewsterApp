import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import BrewsterLogo from '../assets/BrewsterLogo.png';  
import { BotMessageSquare, CircleX, BadgeDollarSign, ClipboardPlus, Ambulance, ChartNoAxesColumn, Settings} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get active item from current path
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/anomaly-detector')) return 'anomaly-detector';
    if (path.startsWith('/billing')) return 'billing';
    if (path.startsWith('/patient-care-report')) return 'patient-care-report';
    if (path.startsWith('/vehicles')) return 'vehicles';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };
  
  const activeItem = getActiveItem();

  const menuItems = [
    {
      id: 'dashboard',
      label: <strong>Dashboard</strong>,
      icon: <BotMessageSquare size={18} />,
      path: '/'
    },
    {
      id: 'anomaly-detector',
      label: <strong>Anomaly Detector</strong>,
      icon: <CircleX size={18} />,
      path: '/anomaly-detector'
    },
    {
      id: 'billing',
      label: <strong>Billing</strong>,
      icon: <BadgeDollarSign size={18} />,
      path: '/anomaly-detector'
    },
    {
      id: 'patient-care-report',
      label: <strong>PCRs and Reporting</strong>,
      icon: <ClipboardPlus size={18} />,
      path: '/anomaly-detector'
    },
    {
      id: 'vehicles',
      label: <strong>Vehicle Management</strong>,
      icon: <Ambulance size={18} />,
      path: '/vehicles',
    },
    {
      id: 'reports',
      label: <strong>Reports</strong>,
      icon: <ChartNoAxesColumn size={18} />,
      path: '/reports',
    },
    {
      id: 'settings',
      label: <strong>Settings</strong>,
      icon: <Settings size={18} />,
      path: '/settings'
    }
  ];
  

  const toggleItem = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (itemId, path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
     {isOpen && <img src={BrewsterLogo} alt="Brewster Logo" className="logo-image" />}
     <button className="toggle-btn" onClick={toggleSidebar}>
       {isOpen ? '◀' : '▶'}
     </button>
   </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <div
              className={`menu-link ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id, item.path)}
            >
              <span className="menu-icon">{item.icon}</span>
              {isOpen && <span className="menu-label">{item.label}</span>}
              {isOpen && item.subItems && (
                <button
                  className={`expand-btn ${expandedItems.has(item.id) ? 'expanded' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  ▼
                </button>
              )}
            </div>
            
            {isOpen && item.subItems && expandedItems.has(item.id) && (
              <div className="submenu">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`submenu-item ${activeItem === subItem.id ? 'active' : ''}`}
                    onClick={() => handleItemClick(subItem.id, subItem.path)}
                  >
                    <span className="submenu-label">{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        {isOpen && (
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <div className="user-name">Steve Dinsmore</div>
              <div className="user-role">IT Administrator</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
