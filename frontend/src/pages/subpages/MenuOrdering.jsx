


import React, { useState, useEffect, useRef } from 'react';
import '../styles/MenuOrdering.css';
import { set } from 'mongoose';


const Menu = ({ fields, onSelectedField, onIsAscending }) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const [selectedField, setSelectedField] = useState(null);
  const [isAscending, setIsAscending] = useState(true);


  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFieldClick = (field) => {
    if (selectedField === field) {
      setIsAscending(!isAscending);
      onIsAscending(!isAscending);
    } else {
      setSelectedField(field);
      setIsAscending(true);
      onIsAscending(true);
    }
    onSelectedField(field);
  };



  return (
    <div className="menu-container" ref={menuRef}>
      <button title="Manage Ordering" className="btn btn-light mr-1" onClick={toggleMenu}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 9h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5zm-6 3h2V8h3L6 4 2 8h3z"></path>
        </svg>
      </button>
      {isVisible && (
        <div className="menu-outer">
          <ul className="actions-list">

            <li className="menu-item menu-title"><strong>Ordering By</strong></li>
            <li className="menu-separator"></li>
            <li className="menu-item menu-action" onClick={() => handleFieldClick('Default')} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '24px', display: 'flex', justifyContent: 'center', marginRight: '8px'  }}>
                {selectedField === 'Default' && (
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="#1b1f23"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'rgb(27, 31, 35)' }}
                  >
                    {isAscending ? (
                      <>
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </>
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </>
                    )}
                  </svg>
                )}
              </div>
              <div>Default</div>
            </li>
            <li className="menu-separator"></li>
            {fields.map((field, index) => (
              <li key={index} className="menu-item menu-action" onClick={() => handleFieldClick(field)} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '24px', display: 'flex', justifyContent: 'center', marginRight: '8px'  }}>
                  {selectedField === field && (
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      color="#1b1f23"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: 'rgb(27, 31, 35)' }}
                    >
                      {isAscending ? (
                        <>
                          <line x1="12" y1="19" x2="12" y2="5"></line>
                          <polyline points="5 12 12 5 19 12"></polyline>
                        </>
                      ) : (
                        <>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </>
                      )}
                    </svg>
                  )}
                </div>
                <span className="menu-title">{field}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;