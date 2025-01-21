// components/slides/CuentaRegresivaSection.js
import React from 'react';
import Countdown from '../Countdown'; // Asegúrate de que la ruta sea correcta

export default function CuentaRegresivaSection() {
    return (
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md text-center text-white font-body">
            <h3 className="text-sm sm:text-base font-semibold mb-2">
                Cuenta Regresiva
            </h3>
            <p className="mb-2 text-xs sm:text-sm">
                ¡Cada segundo nos acerca más a la gran celebración!
            </p>
            <Countdown targetDate="2025-02-15T21:30:00" />
        </div>
    );
}
