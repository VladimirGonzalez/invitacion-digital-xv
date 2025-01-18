// components/ParallaxLayers.js
import { useEffect } from 'react';

/**
 * Agrega varias capas (imágenes) con velocidad diferente
 * Creando un efecto parallax al hacer scroll.
 */
export default function ParallaxLayers() {
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Ajusta la velocidad para cada capa
            const layer1 = document.getElementById('parallax-layer-1');
            const layer2 = document.getElementById('parallax-layer-2');

            if (layer1) layer1.style.transform = `translateY(${scrollY * 0.3}px)`;
            if (layer2) layer2.style.transform = `translateY(${scrollY * 0.6}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Ejemplo: Dos capas con diferentes imágenes */}
            <div
                id="parallax-layer-2"
                className="pointer-events-none absolute w-full h-full top-0 left-0"
                style={{
                    backgroundImage: "url('/images/clouds-magic.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1,
                    opacity: 0.5,

                }}
            />
            <div
                id="parallax-layer-1"
                className="pointer-events-none absolute w-full h-full top-0 left-0"
                style={{
                    backgroundImage: "url('/images/background-cinderella.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 2,
                    opacity: 0.4,
                }}
            />
        </>
    );
}
