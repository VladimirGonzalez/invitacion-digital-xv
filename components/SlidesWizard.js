import React, { useState } from 'react'; // Asegúrate de importar useState
import { motion, AnimatePresence } from 'framer-motion';

// Importación correcta de los componentes de slides
import Encabezado from './slides/Encabezado';
import CancionSection from './slides/CancionSection';
import MensajeBienvenida from './slides/MensajeBienvenida';
import Vestimenta from './slides/Vestimenta';
import DetallesEvento from './slides/DetallesEvento';
import Regalos from './slides/Regalos';
import CuentaRegresivaSection from './slides/CuentaRegresivaSection';
import ConfirmSlide from './slides/ConfirmSlide';
import FinalSlide from './slides/FinalSlide';

export default function SlidesWizard() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slidesData = [
        { id: 'encabezado', component: <Encabezado /> },
        { id: 'cancion', component: <CancionSection /> },
        { id: 'bienvenida', component: <MensajeBienvenida /> },
        { id: 'vestimenta', component: <Vestimenta /> },
        { id: 'detalles', component: <DetallesEvento /> },
        { id: 'regalos', component: <Regalos /> },
        { id: 'countdown', component: <CuentaRegresivaSection /> },
        { id: 'confirm', component: <ConfirmSlide /> },
        {
            id: 'final',
            component: <FinalSlide onVolver={() => setCurrentIndex(0)} />,
        },
    ];

    const handleNext = () => {
        if (currentIndex < slidesData.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slidesData[currentIndex].id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    {slidesData[currentIndex].component}
                </motion.div>
            </AnimatePresence>

            {/* Botones de navegación */}
            <div className="flex justify-between mt-4">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        className="bg-gradient-to-r from-gray-600 to-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-gray-500 hover:to-gray-400 transition-all"
                    >
                        Anterior
                    </button>
                )}
                {currentIndex < slidesData.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-400 transition-all"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentIndex(0)}
                        className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-green-400 transition-all"
                    >
                        Volver al Inicio
                    </button>
                )}
            </div>
        </div>
    );
}
