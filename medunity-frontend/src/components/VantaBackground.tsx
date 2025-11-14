'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CELLS from 'vanta/dist/vanta.cells.min';
// Or try these alternatives later:
// import FOG from 'vanta/dist/vanta.fog.min';
// import NET from 'vanta/dist/vanta.net.min';

interface VantaEffect {
  destroy: () => void;
  resize: () => void;
}

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = CELLS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color1: 0x3ac5b3,
        color2: 0x9cecfb,
        size: 2.0,
        speed: 1.2,
      });

      setVantaEffect(effect as VantaEffect);
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: '#f0f7fb', // subtle fallback
      }}
    />
  );
}