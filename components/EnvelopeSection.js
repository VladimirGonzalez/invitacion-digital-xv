// components/EnvelopeSection.js
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

function EnvelopeSection({ onOpenComplete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const [bgMusic, setBgMusic] = useState(null);
    const [isMusicOn, setIsMusicOn] = useState(false);
    const envelopeRef = useRef(null);
    const magicSoundRef = useRef(null);
    const sealRef = useRef(null);

    useEffect(() => {
        // Inicialización del sonido mágico
        magicSoundRef.current = new Audio('/sounds/magic-sound.mp3');
        magicSoundRef.current.volume = 0.6;

        // Animación inicial del sobre
        gsap.fromTo(
            envelopeRef.current,
            { scale: 0.8, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    const openEnvelope = () => {
        // Reproducir sonido mágico
        if (magicSoundRef.current) {
            magicSoundRef.current.play().catch(() => null);
        }

        // Animación de giro al abrir el sobre
        gsap.to(envelopeRef.current, {
            rotationX: 180,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                setIsOpen(true);
                setShowStars(true);

                // Efecto rebote opcional para tarjeta abierta
                gsap.fromTo(
                    '.invitation-card',
                    { scale: 0.8 },
                    { scale: 1, ease: 'elastic.out(1, 0.6)', duration: 0.8 }
                );

                // Reproducir música de fondo con fade-in
                const bgMusicAudio = new Audio('/sounds/cinderella-instrumental.mp3');
                bgMusicAudio.loop = true;
                bgMusicAudio.volume = 0.0;
                bgMusicAudio.play().catch(() => null);
                setBgMusic(bgMusicAudio);

                gsap.to(bgMusicAudio, {
                    volume: 0.05,
                    duration: 2,
                    onComplete: () => {
                        setIsMusicOn(true);
                    },
                });

                // Notificar al componente padre que el sobre se abrió
                if (onOpenComplete) onOpenComplete();
            },
        });
    };

    const toggleMusic = () => {
        if (!bgMusic) return;
        if (isMusicOn) {
            gsap.to(bgMusic, {
                volume: 0,
                duration: 1,
                onComplete: () => {
                    bgMusic.pause();
                    setIsMusicOn(false);
                },
            });
        } else {
            bgMusic.play().catch(() => null);
            gsap.to(bgMusic, {
                volume: 0.05,
                duration: 1,
                onComplete: () => {
                    setIsMusicOn(true);
                },
            });
        }
    };

    function MagicStars() {
        const containerRef = useRef(null);

        useEffect(() => {
            const starCount = 25;
            const stars = [];

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'magic-star';
                containerRef.current.appendChild(star);
                stars.push(star);
            }

            stars.forEach((star) => {
                gsap.set(star, {
                    xPercent: -50,
                    yPercent: -50,
                    x: '50vw',
                    y: '50vh',
                    opacity: 1,
                    scale: 0,
                });

                const finalX = 50 + gsap.utils.random(-30, 30);
                const finalY = 50 + gsap.utils.random(-30, 30);
                const duration = gsap.utils.random(1, 2);

                gsap.to(star, {
                    x: `${finalX}vw`,
                    y: `${finalY}vh`,
                    scale: gsap.utils.random(0.5, 1.2),
                    opacity: 0,
                    duration,
                    ease: 'power2.out',
                    onComplete: () => {
                        if (containerRef.current && star.parentNode === containerRef.current) {
                            containerRef.current.removeChild(star);
                        }
                    },
                });
            });

            return () => {
                while (containerRef.current?.firstChild) {
                    containerRef.current.removeChild(containerRef.current.firstChild);
                }
            };
        }, []);

        return (
            <div
                ref={containerRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none"
            >
                <style jsx>{`
          .magic-star {
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: #ffd700;
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
            );
            box-shadow: 0 0 6px 2px rgba(255, 215, 0, 0.6);
            z-index: 9999;
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {bgMusic && (
                <div className="fixed top-4 right-4 z-50">
                    <button
                        onClick={toggleMusic}
                        className="bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md hover:bg-opacity-70 transition"
                        title="Toggle Música"
                    >
                        {isMusicOn ? '🔊' : '🔇'}
                    </button>
                </div>
            )}

            {/* Mostrar sobre cerrado hasta que se abra */}
            {!isOpen && (
                <div
                    ref={envelopeRef}
                    className="relative w-60 h-44 cursor-pointer perspective-800"
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={openEnvelope}
                >
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <img
                            src="/images/sobre.jpg"
                            alt="Sobre cerrado"
                            className="w-full h-full object-cover rounded-md shadow-lg"
                        />
                        <div ref={sealRef} className="absolute flex items-center justify-center">
                            <img
                                src="/images/sello-lacre.png"
                                alt="Sello lacrado"
                                className="w-16 h-16 drop-shadow-lg"
                            />
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 bg-gray-200 rounded-md shadow-lg"
                        style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
                    />
                </div>
            )}

            {/* Contenido de la invitación (aparece tras abrir el sobre) */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="invitation-card max-w-sm w-full bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-2xl mt-6 text-white relative"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <p>¡La tarjeta de invitación aparece aquí!</p>
                </motion.div>
            )}

            {/* Generar estrellitas mágicas al abrir */}
            {showStars && <MagicStars />}
        </div>
    );
}

export default EnvelopeSection;
