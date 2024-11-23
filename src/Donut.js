// src/Donut.js
import React, { useEffect, useRef } from 'react';

const Donut = () => {
  const preRef = useRef(null);

  useEffect(() => {
    let A = 0;
    let B = 0;

    const renderFrame = () => {
      const b = [];
      const z = [];
      const width = 80;
      const height = 22;
      const background = ' ';
      const output = [];

      for (let i = 0; i < width * height; i++) {
        b[i] = background;
        z[i] = 0;
      }

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const sinA = Math.sin(A);
          const cosA = Math.cos(A);
          const sinB = Math.sin(B);
          const cosB = Math.cos(B);

          const sinI = Math.sin(i);
          const cosI = Math.cos(i);
          const sinJ = Math.sin(j);
          const cosJ = Math.cos(j);

          const h = cosJ + 2;
          const D = 1 / (sinI * h * sinA + sinJ * cosA + 5);
          const t = sinI * h * cosA - sinJ * sinA;

          const x = Math.floor(width / 2 + (width / 2) * D * (cosI * h * cosB - t * sinB));
          const y = Math.floor(height / 2 + (height / 2) * D * (cosI * h * sinB + t * cosB));
          const o = x + width * y;
          const N = Math.floor(8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB));

          if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
            z[o] = D;
            const chars = '.,-~:;=!*#$@';
            b[o] = chars[N > 0 ? N : 0];
          }
        }
      }

      for (let k = 0; k < b.length; k += width) {
        output.push(b.slice(k, k + width).join(''));
      }

      if (preRef.current) {
        preRef.current.innerText = output.join('\n');
      }

      A += 0.04;
      B += 0.02;
    };

    const interval = setInterval(renderFrame, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', fontFamily: 'monospace' }}>
      <pre ref={preRef}></pre>
    </div>
  );
};

export default Donut;
