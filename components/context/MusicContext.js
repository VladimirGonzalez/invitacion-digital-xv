// components/context/MusicContext.js
import React, { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext();

export function MusicProvider({ children }) {
    const [audio] = useState(() => {
        if (typeof Audio !== 'undefined') {
            const newAudio = new Audio('/sounds/musica.mp3');
            newAudio.loop = true;
            newAudio.volume = 0.5;
            return newAudio;
        }
        return null;
    });

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Si audio se ha creado, intentar reproducir al montar
        if (audio) {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // El usuario tendrá que iniciar manualmente
            });
        }
    }, [audio]);

    // Manejar toggle de la música
    const toggleMusic = () => {
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => null);
            setIsPlaying(true);
        }
    };

    return (
        <MusicContext.Provider value={{ audio, isPlaying, setIsPlaying, toggleMusic }}>
            {children}
        </MusicContext.Provider>
    );
}
