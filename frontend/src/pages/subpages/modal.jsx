import React from 'react';
import '../styles/Modal.css';
import { ALL_FIELDS } from '../../utils/csvExport';

const Modal = ({ show, onClose, visibleFields, onToggleField }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <h2>Manage Visible Fields</h2>
          <p className="modal-subtitle">Choose which fields appear on contact cards</p>
          <div className="field-checklist">
            {ALL_FIELDS.map((field) => (
              <label key={field.key} className="field-check-item">
                <input
                  type="checkbox"
                  checked={visibleFields.includes(field.key)}
                  onChange={() => onToggleField(field.key)}
                />
                <span>{field.label}</span>
              </label>
            ))}
          </div>
          <div className="modal-actions">
            <button className="modal-btn-primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
