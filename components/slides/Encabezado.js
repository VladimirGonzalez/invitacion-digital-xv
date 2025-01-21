// components/slides/Encabezado.js
import React from 'react';

export default function Encabezado() {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-2">
                <img
                    src="/images/Crop_crown.webp"
                    alt="Corona"
                    className="w-128 h-128 shimmer drop-shadow-lg"
                />
            </div>
            <h1 className="text-4xl sm:text-5xl font-cursiva mb-2 leading-tight text-white drop-shadow-lg">
                Nahara Benítez
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-gold italic mb-2">
                ¡Mis 15 Años!
            </h2>
            <p className="text-sm sm:text-base text-white italic font-body">
                "Un día de ensueño hecho realidad"
            </p>
        </div>
    );
}
