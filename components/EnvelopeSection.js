import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * EnvelopeSection con Partículas Mágicas
 */
function EnvelopeSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [showStars, setShowStars] = useState(false);

    const envelopeRef = useRef(null);

    // Lógica para animar el sobre al montar, etc...
    useEffect(() => {
        gsap.fromTo(
            envelopeRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1 }
        );
    }, []);

    const openEnvelope = () => {
        // Aquí pones tu animación de abrir el sobre
        gsap.to(envelopeRef.current, {
            rotationX: 180,
            duration: 1,
            onComplete: () => {
                setIsOpen(true);
                // ¡Lanzamos las partículas mágicas!
                setShowStars(true);
            },
        });
    };

    return (
        <div>
            {/* SOBRE CERRADO */}
            {!isOpen && (
                <div ref={envelopeRef} onClick={openEnvelope}>
                    {/* Tu sobre */}
                </div>
            )}

            {/* CONTENIDO INVITACIÓN */}
            {isOpen && <div>Tu tarjeta de invitación</div>}

            {/* CONTENEDOR DE ESTRELLITAS (Partículas) */}
            {showStars && <MagicStars />}
        </div>
    );
}

/**
 * MagicStars:
 * - Crea estrellitas amarillas y las anima con GSAP.
 */
function MagicStars() {
    const containerRef = useRef(null);

    useEffect(() => {
        const starCount = 25; // Ajusta número de estrellas
        const stars = [];

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'magic-star';
            containerRef.current.appendChild(star);
            stars.push(star);
        }

        // Animamos cada estrellita
        stars.forEach((star) => {
            // Posición inicial en el centro (50% 50%)
            gsap.set(star, {
                xPercent: -50,
                yPercent: -50,
                x: '50vw',
                y: '50vh',
                opacity: 1,
                scale: 0,
            });

            // Posición final aleatoria
            const finalX = 50 + gsap.utils.random(-30, 30); // en vw
            const finalY = 50 + gsap.utils.random(-30, 30); // en vh
            const duration = gsap.utils.random(1, 2);

            gsap.to(star, {
                x: `${finalX}vw`,
                y: `${finalY}vh`,
                scale: gsap.utils.random(0.5, 1.2),
                opacity: 0,
                duration,
                ease: 'power2.out',
                onComplete: () => {
                    // Eliminar la estrella al terminar
                    containerRef.current.removeChild(star);
                },
            });
        });

        // Limpieza al desmontar
        return () => {
            while (containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
        >
            {/* Estilos CSS de las estrellas */}
            <style jsx>{`
        .magic-star {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #ffd700; /* amarillo dorado */
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          ); /* forma de estrella */
          box-shadow: 0 0 6px 2px rgba(255, 215, 0, 0.6);
          z-index: 9999;
        }
      `}</style>
        </div>
    );
}
