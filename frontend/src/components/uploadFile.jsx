import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from './Modal';
import { set } from 'mongoose';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [columns,setColumns] = useState([]);
  const [modal, setShowModal]= useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const closeModal = async() => {

    const formData = new FormData();
    const user = Cookies.get('user');
    formData.append('file', file);
    formData.append('user', user);
    formData.append('selectedcolumns', selectedColumns);
      try{
        const response = await axios.post('http://localhost:8000/record/uploadFile', formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
        }});
        alert("Records are being added to the database");

      }
      catch(err){
      }
    }
  
  const handleCheckChange = (e) => {
      const value = e.target.value
      const checked = e.target.checked
      if(checked) {
        setSelectedColumns([...selectedColumns, value])
      } else {
        setSelectedColumns(selectedColumns.filter(column => column != value))
      }
    }
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    if(!file) {
      setMessage('Please select a file');
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
      setColumns(res.data.columns);
      setShowModal(true);
    } catch (err) {
      console.log(err)
        // console.log(err.response.data.message);
        setMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      {message && <p>{message}</p>}
      {!message &&
      <div>
        <Modal show={modal} Close={closeModal} title="Select columns you want to include:" content={columns}>
        {columns.map((column, index) => (
              <div key={index}>
                <input type="checkbox" id={column} name={column} value={column} onChange={handleCheckChange}/>
                <label>{column}</label>
              </div>
            ))}
        </Modal>
      </div>}
    </div>
  );
};

export default FileUpload;