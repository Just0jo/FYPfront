import React, { useState } from 'react';
import Home from './components/Home';
import DropdownFunctions from './components/DropdownFunctions';
import FileUpload from './components/FileUpload';

function App() {
  const [selectedFunction, setSelectedFunction] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <Home />

      <DropdownFunctions
        onSelectFunction={(fn) => {
          setSelectedFunction(fn);
          setResult(null);
        }}
      />

      {selectedFunction && (
        <FileUpload
          selectedFunction={selectedFunction}
          setResult={setResult}
        />
      )}

      {result && (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <h2>Results:</h2>

          {/* FFT Analyzer */}
          {'peak_frequency' in result && (
            <>
              <p><strong>Frequency:</strong> {result.peak_frequency} Hz</p>
              <p><strong>Magnitude:</strong> {result.peak_magnitude}</p>
            </>
          )}

          {/* Major/Minor & Full Chord */}
          {'predicted_chord' in result && (
            <p><strong>Chord:</strong> {result.predicted_chord}</p>
          )}

          {/* Instrument Tuner */}
          {'closest_note' in result && (
            <p><strong>Closest Note:</strong> {result.closest_note}</p>
          )}

          {/* Instrument + Key Detector */}
          {'instrument' in result && (
            <>
              <p><strong>Instrument:</strong> {result.instrument}</p>
              <p><strong>Key:</strong> {result.key}</p>
            </>
          )}

          {/* Dashboard Logs */}
          {Array.isArray(result) && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
              <thead>
                <tr>
                  {Object.keys(result[0]).map(h => (
                    <th key={h} style={{ border: '1px solid #ccc', padding: 8 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((v, j) => (
                      <td key={j} style={{ border: '1px solid #ccc', padding: 8 }}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
