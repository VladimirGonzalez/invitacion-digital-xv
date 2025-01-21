// components/MusicButton.js
import { useState, useEffect } from 'react';

export default function MusicButton() {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (typeof Audio !== 'undefined') {
            const newAudio = new Audio('/sounds/cinderella-instrumental.mp3');
            newAudio.loop = true;
            newAudio.volume = 0.05; // Volumen inicial
            setAudio(newAudio);
        }
    }, []);

    useEffect(() => {
        if (audio) {
            // Intentar reproducir automáticamente al cargar
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    // El navegador puede bloquear el autoplay hasta que el usuario interactúe
                });
        }
    }, [audio]);

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

    if (!audio) return null;

    return (
        <button
            onClick={toggleMusic}
            className="fixed bottom-4 right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform z-50"
            title={isPlaying ? 'Silenciar música' : 'Reproducir música'}
        >
            {isPlaying ? '🔊' : '🔇'}
        </button>
    );
}
