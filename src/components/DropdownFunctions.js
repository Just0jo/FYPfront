import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";  

const DropdownFunctions = ({ onSelectFunction }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onSelectFunction(value);  
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <FormControl variant="outlined" className="w-72">
        <InputLabel>Choose a Function</InputLabel>
        <Select
          value={selected}
          onChange={handleChange}
          label="Choose a Function"
          className="bg-white border-2 rounded-md"
        >
          <MenuItem value="">Select a Function</MenuItem>
          <MenuItem value="uploadFFT">FFT Analyzer (Upload File)</MenuItem>
          <MenuItem value="liveFFT">Live Audio FFT</MenuItem>
          <MenuItem value="major_minor">Major or Minor</MenuItem>
          <MenuItem value="chord_predictor">Chord Predictor</MenuItem>
          <MenuItem value="tuner">Instrument Tuner</MenuItem>
          <MenuItem value="key_detector">Key Detector</MenuItem>
          <MenuItem value="key_logs">Key Logs Dashboard</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownFunctions;
