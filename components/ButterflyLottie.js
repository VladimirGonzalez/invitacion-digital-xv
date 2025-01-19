// components/ButterflyLottie.jsx
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// No lo importamos directamente, lo traemos con dynamic
const Player = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function ButterflyLottie() {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch('/animations/butterfly.json')
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch(console.error);
    }, []);

    if (!animationData) return null;

    return (
        <div style={{ position: 'absolute', top: 100, left: 100 }}>
            <Player
                loop
                play
                animationData={animationData}
                style={{ width: 200, height: 200 }}
            />
        </div>
    );
}
