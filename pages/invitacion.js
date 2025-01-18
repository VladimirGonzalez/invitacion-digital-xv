// pages/invitacion.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Countdown from '../components/Countdown';

export default function Invitacion() {
    const tarjetaRef = useRef(null);

    useEffect(() => {
        // Animación para la apertura de la tarjeta
        gsap.fromTo(
            tarjetaRef.current,
            { rotationY: 90, opacity: 0 },
            { rotationY: 0, opacity: 1, duration: 1 }
        );
    }, []);

    return (
        <div
            ref={tarjetaRef}
            style={{
                padding: '20px',
                textAlign: 'center',
                backgroundImage: "url('/images/background-cinderella.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                color: '#fff'
            }}
        >
            <h2>¡Bienvenidos a la Fiesta!</h2>

            <p>
                Existen momentos en la vida que imaginamos, soñamos y esperamos,
                uno de esos momentos ha llegado. Deseo compartirlo con las personas
                que siempre están presentes en mi vida... tú eres uno de ellos.
            </p>

            <blockquote style={{ fontStyle: 'italic', margin: '20px 0' }}>
                DELEITATE EN EL SEÑOR Y ÉL CONCEDERÁ LOS DESEOS DE TU CORAZÓN<br />
                <small>Salmos 37:4</small>
            </blockquote>

            <p>
                <strong>Fecha:</strong> 15-16/02/2025<br />
                <strong>Hora:</strong> 21:30
            </p>

            <p>
                <a
                    href="https://maps.app.goo.gl/x9KMYniAC57wjMxH8"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffd700', textDecoration: 'underline' }}
                >
                    Ver ubicación en Google Maps
                </a>
            </p>

            <p>
                <strong>Vestimenta:</strong> No usar color celeste
            </p>

            <Countdown targetDate="2025-12-31T00:00:00" />
        </div>
    );
}
