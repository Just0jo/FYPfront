import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Paper, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function FileUpload({ selectedFunction, setResult }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    let endpoint;
    switch (selectedFunction) {
      case 'uploadFFT':
        endpoint = '/upload_fft';
        break;
      case 'major_minor':
        endpoint = '/predict_chord_simple';
        break;
      case 'chord_predictor':
        endpoint = '/predict_chord_full';
        break;
      case 'tuner':
        endpoint = '/instrument_tuner';
        break;
      case 'key_detector':
        endpoint = '/instrument_key_detector';
        break;
      case 'key_logs':
        endpoint = '/dashboard_logs';
        break;
      default:
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const url = `http://127.0.0.1:8000${endpoint}`;
      const config = endpoint === '/dashboard_logs'
        ? {}
        : { headers: { 'Content-Type': 'multipart/form-data' } };

      const response = await axios.post(url, formData, config);
      setResult(response.data);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', p: 3, mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {selectedFunction === 'uploadFFT' ? 'FFT Analyzer' :
         selectedFunction === 'major_minor' ? 'Major/Minor Predictor' :
         selectedFunction === 'chord_predictor' ? 'Chord Predictor' :
         selectedFunction === 'tuner' ? 'Instrument Tuner' :
         selectedFunction === 'key_detector' ? 'Key Detector' :
         selectedFunction === 'key_logs' ? 'Key Logs Dashboard' :
         'Upload Audio'}
      </Typography>

      <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} sx={{ mb: 2 }}>
        Choose WAV File
        <input type="file" accept=".wav" hidden onChange={handleFileChange} />
      </Button>

      {file && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {file.name}
        </Typography>
      )}

      <Box>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? 'Analyzing…' : 'Upload & Analyze'}
        </Button>
      </Box>

      {uploading && <LinearProgress sx={{ mt: 2 }} />}
    </Paper>
  );
}

export default FileUpload;
