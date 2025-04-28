import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';

function RecordButton({ setResult }) {
  const [isRecording, setIsRecording] = useState(false);

  const handleStop = async (blobUrl) => {
    const blob = await fetch(blobUrl).then((r) => r.blob());
    const file = new File([blob], 'live_recording.wav', { type: 'audio/wav' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      
      const response = await axios.post('http://127.0.0.1:8000/record_live_audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data);

    } catch (error) {
      console.error('Error uploading live recording:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <ReactMediaRecorder
        audio
        blobPropertyBag={{ type: 'audio/wav' }}
        onStop={handleStop}
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <>
            {!isRecording ? (
              <button onClick={() => { setIsRecording(true); startRecording(); }}>
                 Start Recording
              </button>
            ) : (
              <button onClick={() => { setIsRecording(false); stopRecording(); }}>
                 Stop Recording
              </button>
            )}
          </>
        )}
      />
    </div>
  );
}

export default RecordButton;
