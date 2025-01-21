// components/slides/CancionSection.js
import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';
import { motion } from 'framer-motion';

export default function CancionSection() {
    const { isPlaying, toggleMusic } = useContext(MusicContext);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);

    const handlePlay = () => {
        toggleMusic();
        setAlreadyPlayed(true);
    };

    return (
        <div className="text-center text-white font-body bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-md">
            {!alreadyPlayed ? (
                <>
                    <h3 className="text-lg font-bold mb-4">¡Activa la Música!✨</h3>
                    <p className="italic text-xs mb-4">
                        <p className="italic text-xs text-center mb-3">
                            ❤️Dale Play a <strong>mi canción!</strong>  <span className="font-semibold">▶️</span> Deja que la música te acompañe en el recorrido...
                        </p>                    </p>
                    <button
                        onClick={handlePlay}
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-400 transition"
                    >
                        {isPlaying ? 'Pausar' : 'Reproducir'}
                    </button>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="text-base sm:text-lg font-medium">
                        La música seguirá sonando mientras exploras la invitación...
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                        Dale al botón siguiente cuando quieras.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
