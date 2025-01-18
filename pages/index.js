// pages/index.js
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// IMPORTS CORRECTOS
import SongPlayer from '../components/SongPlayer';
import ParallaxLayers from '../components/ParallaxLayers';
import SparkleOverlay from '../components/SparkleOverlay';
import ParticlesBackground from '../components/ParticlesBackground';
import Countdown from '../components/Countdown';

// Ejemplo: Corazones volando, estilo Cenicienta
function ButterfliesOverlay() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const count = 6; // número de corazones (antes mariposas)
        const hearts = [];

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('img');
            heart.src = '/images/HEART.png'; // Asegúrate de tener esta imagen
            heart.className = 'butterfly-anim';
            containerRef.current.appendChild(heart);
            hearts.push(heart);
        }

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
                    gsap.set(hf, {
                        left: gsap.utils.random(0, 100) + 'vw',
                    });
                },
            });
        });

        return () => {
            while (containerRef.current.firstChild) {
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

export default function Home() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden md:overflow-auto text-shadow-sm">
            <Head>
                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Merriweather:wght@300;400&display=swap');
        `}</style>
                <title>Invitación XV - Nahara Benítez</title>
                <meta
                    name="description"
                    content="Invitación digital alucinante para XV años temática Cenicienta"
                />
            </Head>

            {/* Estilos Globales */}
            <style jsx global>{`
        .text-shadow-sm {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

            {/* 1. Capas de Parallax (fondo) - z-0 */}
            <div className="absolute inset-0 z-0">
                <ParallaxLayers />
            </div>

            {/* 2. Fondo de Partículas Mágicas - z-10 */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <ParticlesBackground />
            </div>

            {/* 3. Destellos superpuestos (SparkleOverlay) - z-20 */}
            <SparkleOverlay />

            {/* 3.5. Corazones flotando (z-25) */}
            <ButterfliesOverlay />

            {/* 4. Sección del Sobre (z-30) */}
            <div className="relative z-30">
                <EnvelopeSection />
            </div>
        </div>
    );
}

/**
 * EnvelopeSection
 * - Sobre animado con GSAP + sonido mágico
 * - Al abrir, muestra la tarjeta de invitación
 * - Reproduce música en loop
 * - Lanza estrellitas doradas (MagicStars)
 */
function EnvelopeSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const envelopeRef = useRef(null);

    // Sonido mágico
    const magicSound =
        typeof Audio !== 'undefined' ? new Audio('/sounds/magic-sound.mp3') : null;

    useEffect(() => {
        if (magicSound) {
            magicSound.volume = 0.6;
        }
    }, [magicSound]);

    useEffect(() => {
        gsap.fromTo(
            envelopeRef.current,
            { scale: 0.8, opacity: 0, y: 50 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
            }
        );
    }, []);

    const openEnvelope = () => {
        // Sonido mágico
        if (magicSound) {
            magicSound.play().catch(() => null);
        }

        // Animación flip
        gsap.to(envelopeRef.current, {
            rotationX: 180,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                setIsOpen(true);
                // Rebote de la invitación
                gsap.fromTo(
                    '.invitation-card',
                    { scale: 0.8 },
                    { scale: 1, ease: 'elastic.out(1, 0.6)', duration: 0.8 }
                );
                // Música de fondo
                if (typeof Audio !== 'undefined') {
                    const bgMusic = new Audio('/sounds/cinderella-instrumental.mp3');
                    bgMusic.loop = true;
                    bgMusic.volume = 0.05; // Volumen bajo
                    bgMusic.play().catch(() => null);
                }
                setShowStars(true);
            },
        });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
            {/* SOBRE CERRADO */}
            {!isOpen && (
                <div
                    ref={envelopeRef}
                    className="relative w-60 h-44 cursor-pointer perspective-800"
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={openEnvelope}
                >
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                    >
                        <img
                            src="/images/sobre.jpg"
                            alt="Sobre cerrado"
                            className="w-full h-full object-cover rounded-md shadow-lg"
                        />
                        <div className="absolute flex flex-col items-center justify-center">
                            <h2 className="font-cursiva text-white text-3xl sm:text-4xl drop-shadow-md">
                                N B
                            </h2>
                            <p className="text-white text-sm mt-2 animate-bounce-slow">
                                Toca para abrir
                            </p>
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 bg-gray-200 rounded-md shadow-lg"
                        style={{
                            transform: 'rotateX(180deg)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                    />
                </div>
            )}

            {/* TARJETA DE INVITACIÓN AL ABRIR */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="invitation-card max-w-sm w-full bg-white/30 backdrop-blur-md p-4 rounded-xl shadow-2xl mt-4 text-white relative"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div
                        className="absolute inset-0 bg-roses-pattern bg-cover bg-center opacity-30 pointer-events-none rounded-xl"
                        aria-hidden="true"
                    />
                    <InvitationContent />
                </motion.div>
            )}

            {/* ESTRELLITAS MÁGICAS */}
            {showStars && <MagicStars />}
        </div>
    );
}

/** MagicStars: Estrellitas doradas */
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
            const finalScale = gsap.utils.random(0.3, 1);

            gsap.to(star, {
                x: `${finalX}vw`,
                y: `${finalY}vh`,
                scale: finalScale,
                opacity: 0,
                duration,
                ease: 'power2.out',
                onComplete: () => {
                    if (star.parentNode === containerRef.current) {
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
            className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden"
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

/** InvitationContent: Secciones con animaciones extra */
function InvitationContent() {
    return (
        <div className="relative z-10 mx-auto py-4 sm:px-4">
            <SectionWrapper icon="/images/love.png">
                <Encabezado />
            </SectionWrapper>

            <SectionWrapper icon="/images/music.png">
                <CancionSection />
            </SectionWrapper>

            <SectionWrapper icon="/images/smile.png">
                <MensajeBienvenida />
            </SectionWrapper>

            <SectionWrapper icon="/images/dresscode.png">
                <Vestimenta />
            </SectionWrapper>

            <SectionWrapper icon="/images/evento.png">
                <DetallesEvento />
            </SectionWrapper>

            <SectionWrapper icon="/images/gift.png">
                <Regalos />
            </SectionWrapper>

            <SectionWrapper icon="/images/clock.png">
                <CuentaRegresivaSection />
            </SectionWrapper>

            <SectionWrapper icon="/images/confirm.png">
                <Confirmacion />
            </SectionWrapper>

            <SectionWrapper icon="/images/magic.svg">
                <Cierre />
            </SectionWrapper>
        </div>
    );
}

/**
 * SectionWrapper:
 * - Se anima de izquierda a derecha y se repite cada vez que entra al viewport.
 * - Se elimina once:true para que se repita siempre que scroll aparezca en pantalla.
 */
function SectionWrapper({ children, icon = '/images/default.png' }) {
    // Variantes con Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, x: -50, rotate: -2 },
        show: {
            opacity: 1,
            x: 0,
            rotate: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <motion.section
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }} // <-- Animación se repite al volver a entrar al viewport
            className="mb-10 relative"
        >
            {/* Ícono en círculo */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-white/80 w-14 h-14 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
                    <img src={icon} alt="Ícono sección" className="w-12 h-12" />
                </div>
            </div>

            {/* Tarjeta con un pequeño tilt al hover (solo en desktop) */}
            <motion.div
                className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg pt-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
                {children}
            </motion.div>
        </motion.section>
    );
}

/* Encabezado con Corona */
function Encabezado() {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-4">
                <img
                    src="/images/crown.webp"
                    alt="Corona"
                    className="w-128 h-128 sm:w-40 sm:h-40 shimmer"
                />
            </div>
            <h1 className="text-4xl sm:text-5xl font-cursiva text-white mb-2 leading-tight">
                Nahara Benítez
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2">
                Mis 15 Años
            </h2>
            <p className="text-sm sm:text-base text-white italic font-body">
                "Un día de ensueño hecho realidad"
            </p>
        </div>
    );
}

/** CancionSection con SongPlayer */
function CancionSection() {
    return (
        <div>
            <SongPlayer />
        </div>
    );
}

/** Mensaje de Bienvenida */
function MensajeBienvenida() {
    return (
        <div className="text-center text-white font-body">
            <p className="mb-4 text-sm sm:text-base">
                Existen momentos en la vida que imaginamos, soñamos y esperamos. Uno de
                esos momentos ha llegado. Deseo compartirlo con las personas que siempre
                están presentes en mi vida... ¡Tú eres uno de ellos!
            </p>
            <p className="italic text-xs sm:text-sm px-2">
                "Deléitate en el Señor y él concederá los deseos de tu corazón."
                <br /> - Salmos 37:4
            </p>
            <div className="mt-2 flex justify-center space-x-2">
                <TwinkleStar />
                <TwinkleStar />
                <TwinkleStar />
            </div>
        </div>
    );
}

/** Efecto de Estrella (Twinkle) */
function TwinkleStar() {
    const starRef = useRef(null);

    useEffect(() => {
        if (typeof Audio !== 'undefined') {
            const twinkle = new Audio('/sounds/twinkle.mp3');
            twinkle.volume = 0.05;
            twinkle.play().catch(() => null);
        }
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.3, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ yoyo: Infinity, duration: 2 }}
            className="text-yellow-400 text-lg sm:text-2xl shimmer-sparkle"
            ref={starRef}
            style={{ margin: '0 4px' }}
        >
            ★
        </motion.div>
    );
}

/** Vestimenta */
function Vestimenta() {
    return (
        <div className="text-center text-white font-body">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Vestimenta</h3>
            <p className="mb-2 text-sm sm:text-base">
                Por favor,{' '}
                <span className="text-red-500 font-bold">evita usar color celeste</span>.
            </p>
            <div className="flex justify-center space-x-4 mt-3">
                <img
                    src="/images/dress.png"
                    alt="Vestido"
                    className="w-8 h-8 sm:w-12 sm:h-12"
                />
                <img
                    src="/images/wedding-suit.png"
                    alt="Traje"
                    className="w-8 h-8 sm:w-12 sm:h-12"
                />
            </div>
        </div>
    );
}

/** Detalles del Evento (Map Fixed) */
function DetallesEvento() {
    return (
        <div className="text-center text-white font-body">
            <h3 className="text-2xl font-semibold mb-4">Detalles del Evento</h3>
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                {/* MAPA REPARADO (responsive para mobile) */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0504062794084!2d-58.2565388!3d-34.9574496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2d17a03d49181%3A0x1ab2627a71646070!2sLa%20escondida!5e1!3m2!1ses-419!2sar!4v1737215128097!5m2!1ses-419!2sar"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de La Escondida"
                />
            </div>
            <div className="mb-6 text-sm sm:text-base">
                <p className="mb-2">
                    <strong>Fecha:</strong> 15 y 16 de febrero de 2025
                </p>
                <p className="mb-2">
                    <strong>Hora:</strong> 21:30 hrs
                </p>
                <p className="mb-4">
                    <strong>Lugar:</strong> Salón de Eventos "La Escondida"
                </p>
            </div>
            <div className="flex flex-col items-center">
                <div className="relative group">
                    <a
                        href="https://maps.app.goo.gl/x9KMYniAC57wjMxH8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-300 text-white px-6 py-3 rounded-md shadow-lg flex items-center justify-center hover:bg-blue-400 hover:text-blue-100 transition-colors duration-300 text-sm sm:text-base"
                        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
                    >
                        Ver Ubicación en Google Maps
                    </a>
                    <motion.img
                        src="/images/pointing.png"
                        alt="Dedo Apuntando"
                        className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-8 opacity-0 group-hover:opacity-100"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

/** Sección de Regalos */
function Regalos() {
    return (
        <div className="text-center text-white font-body">
            <p className="mb-4 text-sm sm:text-base">
                Tu presencia es mi mejor regalo! ❤️
            </p>
        </div>
    );
}

/** Sección de Cuenta Regresiva */
function CuentaRegresivaSection() {
    return (
        <div className="text-center text-white font-body">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Cuenta Regresiva
            </h3>
            <p className="mb-2 text-sm sm:text-base">
                ¡Cada segundo nos acerca más a la gran celebración!
            </p>
            <Countdown targetDate="2025-02-15T21:30:00" />
        </div>
    );
}

/** Confirmacion */
function Confirmacion() {
    return (
        <div className="text-center text-white font-body relative">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Tu presencia es muy importante para mí.
            </h3>
            <p className="mb-2 text-sm sm:text-base">
                Por favor, confirma tu asistencia a través del siguiente enlace:
            </p>
            <a
                href="https://forms.gle/c1BqDDLP8jfZFC5VA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white px-4 py-2 mt-3 inline-block rounded-md hover:bg-blue-300 hover:text-gray-200 transition-colors text-sm sm:text-base"
            >
                Confirmar asistencia
            </a>
            <motion.img
                src="/images/pointing.png"
                alt="Dedo Apuntando"
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-8 opacity-0 group-hover:opacity-100"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 0.3,
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />

        </div>
    );
}

/** Cierre */
function Cierre() {
    return (
        <div className="text-center text-white font-body">
            <p className="mb-2 text-sm sm:text-base">¡Te espero con mucha ilusión!</p>
            <p className="text-xs sm:text-sm italic">
                Gracias por ser parte de este día tan especial.
            </p>
            <img
                src="/images/roses.png"
                alt="Rosas"
                className="mx-auto w-16 h-16 sm:w-24 sm:h-24 mt-4"
            />
        </div>
    );
}
