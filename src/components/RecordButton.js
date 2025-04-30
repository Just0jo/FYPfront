import React, { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material"; 

function RecordButton({ setResult }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 

  const handleStop = async (blobUrl) => {
    const blob = await fetch(blobUrl).then((r) => r.blob());
    const file = new File([blob], "live_recording.wav", { type: "audio/wav" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true); 
      const response = await axios.post("http://127.0.0.1:8000/record_live_audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading live recording:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <ReactMediaRecorder
        audio
        blobPropertyBag={{ type: "audio/wav" }}
        onStop={handleStop}
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <>
            {!isRecording ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setIsRecording(true);
                  startRecording();
                }}
                className="flex items-center space-x-2"
              >
                <span> Start Recording</span>
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => {
                  setIsRecording(false);
                  stopRecording();
                }}
                className="flex items-center space-x-2"
              >
                <span> Stop Recording</span>
              </Button>
            )}

            {isUploading && (
              <div className="flex justify-center items-center mt-4">
                <CircularProgress size={24} className="mr-2" />
                <span>Uploading...</span>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

export default RecordButton;
