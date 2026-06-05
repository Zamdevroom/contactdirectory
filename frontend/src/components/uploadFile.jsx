import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from './Modal';
import { RECORD_API } from '../utils/api';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [columns, setColumns] = useState([]);
  const [modal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const closeModal = async () => {
    const formData = new FormData();
    const user = Cookies.get('user');
    formData.append('file', file);
    formData.append('user', user);
    formData.append('selectedcolumns', selectedColumns);
    try {
      await axios.post(`${RECORD_API}/uploadFile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Records are being added to the database');
      setShowModal(false);
      setColumns([]);
      setSelectedColumns([]);
    } catch (err) {
      alert('Error uploading file');
    }
  };

  const handleCheckChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelectedColumns([...selectedColumns, value]);
    } else {
      setSelectedColumns(selectedColumns.filter((column) => column !== value));
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }
    const formData = new FormData();
    const user = Cookies.get('user');
    formData.append('file', file);
    formData.append('user', user);

    try {
      const res = await axios.post(`${RECORD_API}/checkFile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setColumns(res.data.columns);
      setShowModal(true);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error reading file');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={onFileChange} className="text-sm" />
      <button
        onClick={onFileUpload}
        className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Upload CSV
      </button>
      {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
      <Modal show={modal} Close={closeModal} title="Select columns you want to include:" content={columns}>
        {columns.map((column, index) => (
          <div key={index}>
            <input type="checkbox" id={column} name={column} value={column} onChange={handleCheckChange} />
            <label>{column}</label>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default FileUpload;
