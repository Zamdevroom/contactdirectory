import React from 'react';
import '../styles/Modal.css'; // Assuming you save the CSS in Modal.css

const Modal = ({ show, onClose }) => {
	if (!show) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>
				<div className="modal-body">
					{/* Add your functionalities here */}
					<h2>Modal Title</h2>
					<p>Some content for the modal.</p>
				</div>
			</div>
		</div>
	);
};

export default Modal;

