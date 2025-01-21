// components/HeartsOverlay.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeartsOverlay() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const count = 6; // Número de corazones
        const hearts = [];

        // Crear elementos de corazón y agregarlos al contenedor
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('img');
            heart.src = '/images/HEART.png';  // Asegúrate de tener esta imagen en public/images/
            heart.className = 'heart-anim';
            containerRef.current.appendChild(heart);
            hearts.push(heart);
        }

        // Animar cada corazón
        hearts.forEach((hf, i) => {
            const delay = i * 0.5;
            gsap.set(hf, {
                position: 'absolute',
                bottom: -50,
                left: gsap.utils.random(0, 100) + 'vw',
                width: '50px',
                opacity: 0,
                zIndex: 25,
            });

            gsap.to(hf, {
                delay,
                duration: gsap.utils.random(8, 12),
                y: -window.innerHeight - 100,
                opacity: 1,
                ease: 'sine.inOut',
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                onRepeat: () => {
                    gsap.set(hf, { left: gsap.utils.random(0, 100) + 'vw' });
                },
            });
        });

        // Limpieza al desmontar el componente
        return () => {
            while (containerRef.current && containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-25 overflow-hidden"
        />
    );
}
