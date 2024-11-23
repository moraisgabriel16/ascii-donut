// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Donut from './Donut';

function App() {
  const [color, setColor] = useState('#FFC0CB');
  const [speed, setSpeed] = useState(0.04);
  const [resolution, setResolution] = useState({ i: 0.02, j: 0.07 });
  const [size, setSize] = useState({ width: 80, height: 22 });
  const audioRef = useRef(null);

  // Efeito para controlar a taxa de reprodução do áudio
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const normalizedSpeed = speed / 0.04; // 0.04 é a velocidade padrão
      audio.playbackRate = normalizedSpeed;
      // Garante que o áudio esteja tocando
      if (audio.paused) {
        audio.play();
      }
    }
  }, [speed]);

  return (
    <div className="app">
      <div className="control-panel">
        <h1>Controle do Donut 3D ASCII</h1>
        <div className="control-group">
          <label>Cor:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="control-group">
          <label>Velocidade:</label>
          <input
            type="range"
            min="0.01"
            max="0.1"
            step="0.005"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span>{speed.toFixed(3)}</span>
        </div>
        <div className="control-group">
          <label>Resolução I:</label>
          <input
            type="range"
            min="0.005"
            max="0.1"
            step="0.005"
            value={resolution.i}
            onChange={(e) => setResolution({ ...resolution, i: parseFloat(e.target.value) })}
          />
          <span>{resolution.i.toFixed(3)}</span>
        </div>
        <div className="control-group">
          <label>Resolução J:</label>
          <input
            type="range"
            min="0.005"
            max="0.1"
            step="0.005"
            value={resolution.j}
            onChange={(e) => setResolution({ ...resolution, j: parseFloat(e.target.value) })}
          />
          <span>{resolution.j.toFixed(3)}</span>
        </div>
        <div className="control-group">
          <label>Largura:</label>
          <input
            type="number"
            min="20"
            max="200"
            value={size.width}
            onChange={(e) => setSize({ ...size, width: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="control-group">
          <label>Altura:</label>
          <input
            type="number"
            min="10"
            max="100"
            value={size.height}
            onChange={(e) => setSize({ ...size, height: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="control-group">
          <button onClick={() => {
            setColor('#FFC0CB');
            setSpeed(0.04);
            setResolution({ i: 0.02, j: 0.07 });
            setSize({ width: 80, height: 22 });
          }}>Resetar Configurações</button>
        </div>
      </div>
      <Donut color={color} speed={speed} resolution={resolution} size={size} />
      <audio ref={audioRef} src="/audio.wav" autoPlay loop />
    </div>
  );
}

export default App;
