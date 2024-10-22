import React from 'react';
import '../styles/Modal.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { set } from 'mongoose';

const Import = ({ show, onClose }) => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');
	const [columns, setColumns] = useState([]);
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [showUpload, setShowUpload] = useState(true);
	const [showColumns, setShowColumns] = useState(false);

	if (!show) {
		return null;
	}

	const onOkay = async () => {

		const formData = new FormData();
		const user = Cookies.get('user');
		formData.append('file', file);
		formData.append('user', user);
		formData.append('selectedcolumns', selectedColumns);
		try {
			const response = await axios.post('http://localhost:8000/record/uploadFile', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			setShowColumns(false);
			setShowUpload(true);
			alert("Adding records to database")
			// setShowUpload(true);

		}
		catch (err) {
			alert("Error adding record to database");
			
		}
	}

	const handleCheckChange = (e) => {
		const value = e.target.value
		const checked = e.target.checked
		if (checked) {
			setSelectedColumns([...selectedColumns, value])
		} else {
			setSelectedColumns(selectedColumns.filter(column => column != value))
		}
	}
	const onFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const onFileUpload = async () => {
		if (!file) {
			setMessage('Please select a file');
			setShowUpload(true);
			setShowColumns(false);
			setColumns([]);
			return;
		}
		const formData = new FormData();
		const user = Cookies.get('user');
		formData.append('file', file);
		formData.append('user', user);

		try {
			const res = await axios.post('http://localhost:8000/record/checkFile', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			setMessage('');
			setShowUpload(false);
			setShowColumns(true);
			setColumns(res.data.columns);
		} catch (err) {
			console.log(err)
			setMessage(err.response.data.message);
			setShowColumns(false);
			setColumns([]);
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content flex-auto">
				<button className="modal-close" onClick={()=>{
					setColumns([])
					setSelectedColumns([])
					setShowUpload(true)
					setShowColumns(false)
					onClose()}}>
					&times;
				</button>
				<div className="modal-body">
					{/* Add your functionalities here */}
					<h2>Import</h2>
					{showUpload &&
						<span>
							<input type="file" onChange={onFileChange} />
							<button onClick={onFileUpload}>Import</button>
						</span>
					}
					{message && <p>{message}</p>}
					{showColumns &&
						<div>
							<div className="grid grid-cols-3 grid-flow-row gap-x-1">
								{columns.map((column, index) => (
									<div key={index}>
										<input type="checkbox" id={column} name={column} value={column} onChange={handleCheckChange} />
										<label>{column}</label>
									</div>
								))}
							</div>
							<button className="pt-4"onClick={()=>{
								onOkay();
								onClose();
							}}>Add</button>
						</div>}
				</div>
			</div>
		</div>
	);
};

export default Import;