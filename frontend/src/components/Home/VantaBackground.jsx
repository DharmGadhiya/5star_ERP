import { useEffect, useRef } from 'react';
import * as THREE from 'three';

let DOTS = null;

export default function VantaBackground() {
    const vantaRef = useRef(null);
    const effectRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const initVanta = async () => {
            if (!window.THREE) window.THREE = THREE;

            if (!DOTS) {
                const vantaModule = await import('vanta/src/vanta.dots.js');
                DOTS = vantaModule.default;
            }

            if (isMounted && vantaRef.current && !effectRef.current) {
                effectRef.current = DOTS({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color2: 0x0,
                    backgroundColor: 0x0,
                    spacing: 18.00
                });
            }
        };

        const timer = setTimeout(() => {
            initVanta();
        }, 100);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            try {
                if (effectRef.current && typeof effectRef.current.destroy === 'function') {
                    effectRef.current.destroy();
                }
                effectRef.current = null;
            } catch (error) {
                console.error("Vanta WebGL cleanup error handled:", error);
            }
        };
    }, []);

    return (
        <div
            id="vanta-bg"
            ref={vantaRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                minHeight: '100vh',
                zIndex: 0,
                pointerEvents: 'auto',
                backgroundColor: '#0a0a0a'
            }}
        />
    );
}
