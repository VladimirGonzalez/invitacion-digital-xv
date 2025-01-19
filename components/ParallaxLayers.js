// components/ParallaxLayers.js
import { useEffect, useRef } from 'react';

/**
 * Parallax con desplazamiento suave (lerp).
 * 
 * - Cada capa puede definirse con la clase "parallax-layer"
 *   y un atributo "data-speed", indicando la velocidad relativa.
 * - Ejemplo: 
 *   <div className="parallax-layer" data-speed="0.2" style={{ backgroundImage: "..."}} />
 */
export default function ParallaxLayers() {
    const containerRef = useRef(null);

    // Variables para el lerp
    const currentScroll = useRef(0);
    const targetScroll = useRef(0);
    const requestId = useRef(null);

    useEffect(() => {
        // Función que actualiza el 'targetScroll' con la posición real del scroll
        const handleScroll = () => {
            targetScroll.current = window.pageYOffset || document.documentElement.scrollTop;
        };

        // Animación continua (bucloe rAF)
        const animate = () => {
            // Calcula la diferencia
            const diff = targetScroll.current - currentScroll.current;
            // Ajusta la velocidad de interpolación (0.1 => "suavidad")
            const lerpFactor = 0.1;
            // Aplicamos interpolación
            currentScroll.current += diff * lerpFactor;

            // Mueve las capas
            if (containerRef.current) {
                const layers = containerRef.current.querySelectorAll('.parallax-layer');
                layers.forEach((layer) => {
                    const speed = parseFloat(layer.dataset.speed) || 0;
                    // Aplicar translate3d para aprovechar la GPU
                    layer.style.transform = `translate3d(0, ${currentScroll.current * speed}px, 0)`;
                });
            }

            // Siguiente frame
            requestId.current = requestAnimationFrame(animate);
        };

        // Escuchar scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Iniciar animación
        requestId.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (requestId.current) {
                cancelAnimationFrame(requestId.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden"
            style={{ position: 'relative' }}
        >
            {/* Ejemplo de capas */}
            <div
                className="parallax-layer pointer-events-none absolute inset-0"
                data-speed="0.3"
                style={{
                    backgroundImage: "url('/images/clouds-magic.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.5,
                    willChange: 'transform',
                    zIndex: 1,
                }}
            />
            <div
                className="parallax-layer pointer-events-none absolute inset-0"
                data-speed="0.6"
                style={{
                    backgroundImage: "url('/images/background-cinderella.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4,
                    willChange: 'transform',
                    zIndex: 2,
                }}
            />

            {/* Agrega más capas con data-speed y tu imagen */}
        </div>
    );
}
