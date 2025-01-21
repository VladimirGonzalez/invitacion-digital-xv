// components/slides/Vestimenta.js
import React from 'react';

export default function Vestimenta() {
    return (
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md text-white font-body text-center">
            <h3 className="text-2xl font-bold mb-4">Vestimenta</h3>
            <p className="mb-2 text-xL2 sm:text-sm">
                Por favor, <span className="text-red-500 font-bold">NO USAR color celeste</span>.
            </p>
            <div className="flex justify-center space-x-3 mt-3">
                <img src="/images/dress.png" alt="Vestido" className="w-8 h-8 sm:w-10 sm:h-10" />
                <img src="/images/wedding-suit.png" alt="Traje" className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
        </div>
    );
}
