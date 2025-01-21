// components/slides/FinalSlide.js
import React from 'react';

export default function FinalSlide({ onVolver }) {
    return (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md text-white font-body text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">¡Gracias por tu Confirmación!✨</h3>
            <p className="text-base sm:text-lg mb-4">
                ¡Te espero en mis XV! <br />
                Tu presencia es mi mayor regalo.
            </p>
            <p className="text-sm italic mb-4">
                ¡Nos vemos muy pronto para celebrar este día tan especial!

            </p>
            <p>
                Recuerda de NO TRAER VESTIMENTA CELESTE por favor! 🙏🥺 Graciasss

            </p>
            <div className="flex justify-center space-x-3 mt-3">
                <img src="/images/dress.png" alt="Vestido" className="w-8 h-8 sm:w-10 sm:h-10" />
                <img src="/images/wedding-suit.png" alt="Traje" className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

        </div>
    );
}
