import React, { useState } from "react";

function DropdownFunctions({ onSelectFunction }) {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
    onSelectFunction(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <select value={selected} onChange={handleChange}>
        <option value="">Select a Function</option>
        <option value="uploadFFT">FFT Analyzer (Upload File)</option>
        <option value="liveFFT">Live Audio FFT</option>
        <option value="major_minor">Major or Minor</option>
        <option value="chord_predictor">Chord Predictor</option>
        <option value="tuner">Instrument Tuner</option>
        <option value="key_detector">Key Detector</option>
        <option value="key_logs">Key Logs Dashboard</option>
      </select>
    </div>
  );
}

export default DropdownFunctions;
