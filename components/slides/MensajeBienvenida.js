// components/slides/MensajeBienvenida.js
import React from 'react';

export default function MensajeBienvenida() {
    return (
        <div className="text-center text-white font-body bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">El momento está por llegar✨</h3>

            <p className="mb-4 text-sm sm:text-base">
                Existen momentos en la vida que imaginamos, soñamos y esperamos. Uno de esos momentos ha llegado.
                Deseo compartirlo con las personas que siempre están presentes en mi vida... ¡Tú eres uno de ellos!
            </p>
            <p className="italic text-xs sm:text-sm px-2">
                "Deléitate en el Señor y él concederá los deseos de tu corazón." - Salmos 37:4
            </p>
        </div>
    );
}
