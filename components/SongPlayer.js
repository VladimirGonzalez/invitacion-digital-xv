// components/SongPlayer.js
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

export default function SongPlayer() {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const newAudio = new Audio('/sounds/musica.mp3');
        newAudio.volume = 0.7;
        setAudio(newAudio);

        return () => {
            newAudio.pause();
            newAudio.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        if (isPlaying && audio) {
            intervalRef.current = setInterval(() => {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                setProgress(isNaN(progressPercent) ? 0 : progressPercent);
            }, 300);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, audio]);

    const togglePlay = () => {
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.div
            className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md text-white relative max-w-xs mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)', width: '18rem' }}
        >
            {/* Encabezado con ícono de música en estilo glassmorphism blanco */}
            <div className="flex items-center mb-3 relative">
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full mr-2 shadow-md">
                    <FaMusic className="text-white text-2xl animate-bounce" />
                </div>
                <h3
                    className="text-base font-bold drop-shadow-md"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
                >
                    Melodía Encantada
                </h3>
            </div>

            <p className="italic text-xs text-center mb-3">
                ❤️Mi canción! Dale Play <span className="font-semibold">‣</span> Deja que la música te acompañe en el recorrido...
            </p>

            {/* Botón de Reproducción más pequeño */}
            <div className="flex justify-center mb-3">
                <motion.button
                    onClick={togglePlay}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform ${isPlaying ? 'bg-white/30' : 'bg-blue-300'}`}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        scale: isPlaying ? 1.05 : 1,
                        transition: { type: 'spring', stiffness: 300 },
                    }}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
                >
                    {isPlaying ? (
                        <FaPause className="text-blue-300 text-xl" />
                    ) : (
                        <FaPlay className="text-white text-xl" />
                    )}
                </motion.button>
            </div>

            {/* Ondas de sonido pulsantes */}
            {isPlaying && (
                <div className="mt-4 flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-full shadow-md"
                            style={{ width: '0.55rem', height: '0.55rem' }}
                            animate={{ scale: [1, 2.5, 1], opacity: [1, 0.3, 1] }}
                            transition={{
                                duration: 4.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Barra de Progreso estilizada con degradado celeste a oro */}
            <div className="mt-4 h-2 bg-gray-300 bg-opacity-50 rounded-full overflow-hidden relative">
                <motion.div
                    className="h-full"
                    style={{
                        background: 'linear-gradient(90deg, #B2DFFC, #FFD700)',
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.3 }}
                />
            </div>

            {/* Tiempo de reproducción */}
            <div className="flex justify-between text-xs text-gray-200 mt-2">
                <span>0:00</span>
                <span>
                    {audio && !isNaN(audio.duration)
                        ? `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)
                            .toString()
                            .padStart(2, '0')}`
                        : '0:00'}
                </span>
            </div>
        </motion.div>
    );
}
