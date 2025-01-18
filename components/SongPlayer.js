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
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Fondo decorativo sutil */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10 blur-md"
                style={{ backgroundImage: "url('/images/music.png')" }}
                aria-hidden="true"
            />

            {/* Encabezado */}
            <div className="flex items-center mb-4 relative">
                <FaMusic className="text-white text-3xl animate-bounce mr-3" />
                <h3 className="text-xl font-bold">Melodía Encantada</h3>
            </div>

            <p className="italic text-sm text-center mb-4 relative">
                "Deja que la música te envuelva..."
            </p>

            {/* Botón de Reproducción */}
            <div className="flex justify-center relative">
                <motion.button
                    onClick={togglePlay}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform ${isPlaying ? 'bg-white' : 'bg-purple-600'
                        }`}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        scale: isPlaying ? 1.05 : 1,
                        transition: { type: 'spring', stiffness: 300 },
                    }}
                >
                    {isPlaying ? (
                        <FaPause className="text-purple-600 text-3xl" />
                    ) : (
                        <FaPlay className="text-white text-3xl" />
                    )}
                </motion.button>
            </div>

            {/* Ondas de sonido sincronizadas */}
            {isPlaying && (
                <div className="mt-6 flex justify-center space-x-2 relative">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-white rounded-full"
                            style={{ height: '2rem' }}
                            animate={{ scaleY: [1, 2, 1] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Barra de Progreso */}
            <div className="mt-4 h-2 bg-gray-300 bg-opacity-50 rounded-full overflow-hidden relative">
                <motion.div
                    className="h-full bg-white"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.3 }}
                />
            </div>

            {/* Tiempo de reproducción */}
            <div className="flex justify-between text-xs text-gray-200 mt-2 relative">
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
