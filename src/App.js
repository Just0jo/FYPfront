import React, { useState } from 'react';
import Home from './components/Home';
import FileUpload from './components/FileUpload';
import DropdownFunctions from './components/DropdownFunctions';
import RecordButton from './components/RecordButton';

function App() {
  const [FFTData, setFFTData] = useState(null);
const [peaks, setPeaks] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div>
      <Home />
      <DropdownFunctions onSelectFunction={(selected) => {
        setSelectedFunction(selected);
        setResult(null);   // 🚨 Clear previous result when switching
        setFFTData(null);
        setPeaks(null);
      }} />
      {selectedFunction === "uploadFFT" && (
        <>
          <FileUpload setFFTData={setFFTData} setPeaks={setPeaks} setResult={setResult} />
          
        </>
      )}
      {selectedFunction === "liveFFT" && (
        <>
          <RecordButton setResult={setResult} />
        </>
      )}
      {result && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
