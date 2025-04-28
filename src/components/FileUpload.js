import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ setResult }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload_fft', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data); // Set the result for the frontend
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload & Analyze
      </button>
    </div>
  );
}

export default FileUpload;
