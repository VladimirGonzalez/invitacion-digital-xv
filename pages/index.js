// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Efectos de Fondo y otros componentes
import ParallaxLayers from '../components/ParallaxLayers';
import SparkleOverlay from '../components/SparkleOverlay';
import ParticlesBackground from '../components/ParticlesBackground';
import HeartsOverlay from '../components/HeartsOverlay';
import MusicButton from '../components/MusicButton';
import EnvelopeSection from '../components/EnvelopeSection';
import SlidesWizard from '../components/SlidesWizard';

/* Intro Cinemática */
function IntroScreen({ onFinish }) {
    const [show, setShow] = useState(true);

    useState(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onFinish();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl sm:text-6xl font-cursiva text-yellow-300 mb-4 drop-shadow-md">
                    ¡Bienvenido!
                </h1>
                <p className="text-sm sm:text-base">
                    Cargando tu invitación mágica...
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function Home() {
    const [introFinished, setIntroFinished] = useState(false);
    const [envelopeOpened, setEnvelopeOpened] = useState(false);

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-black text-shadow-sm">
            <Head>
                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Merriweather:wght@300;400&display=swap');
        `}</style>
                <title>Invitación XV - Nahara Benítez</title>
                <meta
                    name="description"
                    content="Estás invitad@ a mis XV! Esta es la invitación!"
                />
                {/* Metadatos Open Graph */}
                <meta property="og:title" content="Invitación XV - Nahara Benítez" />
                <meta
                    property="og:description"
                    content="Estás invitad@ a mis XV! Esta es la invitación!"
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/thumbnail.png" />
            </Head>

            <style jsx global>{`
        .text-shadow-sm {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
        .shimmer {
          animation: shimmerAnimation 2s infinite alternate;
        }
        @keyframes shimmerAnimation {
          from {
            filter: drop-shadow(0 0 5px #fff);
          }
          to {
            filter: drop-shadow(0 0 15px #ffd700);
          }
        }
      `}</style>

            {/* Intro Cinemática */}
            <AnimatePresence>
                {!introFinished && (
                    <IntroScreen onFinish={() => setIntroFinished(true)} />
                )}
            </AnimatePresence>

            {/* Contenido principal */}
            {introFinished && (
                <>
                    {/* Mostrar EnvelopeSection hasta que se abra */}
                    {!envelopeOpened && (
                        <div className="relative z-50 flex items-center justify-center min-h-screen">
                            <EnvelopeSection onOpenComplete={() => setEnvelopeOpened(true)} />
                        </div>
                    )}

                    {/* Mostrar resto del contenido solo después de abrir el sobre */}
                    {envelopeOpened && (
                        <>
                            {/* Parallax de fondo */}
                            <div className="absolute inset-0 z-0">
                                <ParallaxLayers />
                            </div>
                            {/* Partículas y Sparkles */}
                            <div className="absolute inset-0 z-10 pointer-events-none">
                                <ParticlesBackground />
                            </div>
                            <SparkleOverlay />
                            {/* Corazones flotando */}
                            <HeartsOverlay />
                            {/* SlidesWizard y MusicButton */}
                            <div className="relative z-30 min-h-screen flex items-center justify-center p-4">
                                <SlidesWizard />
                                <MusicButton />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
