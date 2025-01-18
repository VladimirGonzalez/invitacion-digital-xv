// components/MusicButton.js
import { useState, useEffect } from 'react';

export default function MusicButton() {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (typeof Audio !== 'undefined') {
            // Creamos el objeto de audio
            const newAudio = new Audio('/sounds/cinderella-instrumental.mp3');
            newAudio.loop = true;
            newAudio.volume = -50.5; // Ajusta el volumen a tu preferencia
            setAudio(newAudio);
        }
    }, []);

    // Intentamos reproducir automáticamente al montar el componente
    useEffect(() => {
        if (audio) {
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    // Es probable que el navegador bloquee el autoplay
                    // hasta que ocurra una interacción del usuario.
                    // El usuario puede usar el botón para reproducirlo.
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

    // Si no se ha creado el audio, no renderizamos el botón
    if (!audio) return null;

    return (
        <button
            onClick={toggleMusic}
            className="fixed bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full 
                 shadow-lg hover:scale-110 transition transform z-50"
        >
            {isPlaying ? '⏸️' : '💖'}
        </button>
    );
}
