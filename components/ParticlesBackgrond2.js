// components/ParticlesBackground.js
import Particles from 'react-tsparticles';

export default function ParticlesBackground() {
    return (
        <Particles
            className="absolute inset-0 -z-10"
            options={{
                particles: {
                    number: { value: 70 },
                    size: { value: 3 },
                    move: { speed: 1 },
                    opacity: { value: 0.5 },
                    shape: { type: 'circle' },
                    color: { value: '#ffffff' },
                },
                interactivity: {
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                    },
                },
            }}
        />
    );
}
