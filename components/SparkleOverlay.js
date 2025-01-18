// components/SparkleOverlay.js
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Crea un overlay con destellos (sparkles) aleatorios
 * que aparecen y desaparecen con animaciones suaves.
 */
export default function SparkleOverlay() {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Crea un nuevo destello con coordenadas aleatorias
            setSparkles((oldSparkles) => [
                ...oldSparkles,
                {
                    id: Date.now(),
                    x: Math.random() * 100, // %
                    y: Math.random() * 100, // %
                },
            ]);
        }, 1500); // cada 1.5s aparece un nuevo destello

        return () => clearInterval(interval);
    }, []);

    // Remueve destellos antiguos
    const removeSparkle = (id) => {
        setSparkles((old) => old.filter((sparkle) => sparkle.id !== id));
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        onAnimationComplete={() => removeSparkle(sparkle.id)}
                        className="absolute"
                        style={{
                            top: sparkle.y + '%',
                            left: sparkle.x + '%',
                        }}
                    >
                        {/* Puedes usar una imagen, un ícono o un emoji */}
                        <div className="w-6 h-6 shimmer-sparkle text-blue-100 text-1xl">
                            ★
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
