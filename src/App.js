// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import Donut from './Donut';
import './App.css';
import { slide as Menu } from 'react-burger-menu';
import { FaBars, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function App() {
  const [color, setColor] = useState('#FFC0CB');
  const [speed, setSpeed] = useState(0.04);
  const [resolution, setResolution] = useState({ i: 0.02, j: 0.07 });
  const [size, setSize] = useState({ width: 80, height: 22 });
  const [isMuted, setIsMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const audioRef = useRef(null);

  // Controle do áudio
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const normalizedSpeed = speed / 0.04;
      audio.playbackRate = normalizedSpeed;
      audio.muted = isMuted;

      if (!audioAllowed) {
        audio.pause();
      } else if (audio.paused && !isMuted) {
        audio.play();
      }
    }
  }, [speed, isMuted, audioAllowed]);

  // Função para alternar o mudo
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Função para controlar o menu
  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  // Função para permitir o áudio em dispositivos móveis
  const handleAudioPermission = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioAllowed(true);
    }
  };

  return (
    <div className="app">
      {!audioAllowed && (
        <div className="audio-permission-overlay">
          <button onClick={handleAudioPermission}>Toque para ativar o áudio</button>
        </div>
      )}

      {/* Botão de mudo */}
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      {/* Menu hambúrguer */}
      <Menu isOpen={menuOpen} onStateChange={handleStateChange}>
        <div className="control-panel">
          <h2>Controle do Donut</h2>
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
            <button
              onClick={() => {
                setColor('#FFC0CB');
                setSpeed(0.04);
                setResolution({ i: 0.02, j: 0.07 });
                setSize({ width: 80, height: 22 });
              }}
            >
              Resetar Configurações
            </button>
          </div>
        </div>
      </Menu>

      {/* Donut */}
      <Donut color={color} speed={speed} resolution={resolution} size={size} />

      {/* Áudio */}
      <audio ref={audioRef} src="/audio.wav" loop />

      {/* Botão para abrir o menu */}
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>
    </div>
  );
}

export default App;
