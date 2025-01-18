// components/Countdown.js
import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Minutos: Math.floor((difference / 1000 / 60) % 60),
                Segundos: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const keys = Object.keys(timeLeft);

    if (!keys.length) {
        return <span>¡El gran día ha llegado!</span>;
    }

    return (
        <div className="flex justify-center mt-4">
            {keys.map((interval) => (
                <div
                    key={interval}
                    className="flex flex-col items-center justify-center bg-gold text-white w-16 h-16 rounded-md shadow-md mx-1 shimmer"
                >
                    <span className="text-lg font-bold">{timeLeft[interval]}</span>
                    <span className="text-xs uppercase">{interval}</span>
                </div>
            ))}
        </div>
    );
}
