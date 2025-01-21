// components/slides/DetallesEvento.js
import React from 'react';
import { motion } from 'framer-motion';

function DetallesEvento() {
    return (
        <motion.div
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md text-center text-white font-body relative overflow-hidden border border-white/20"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <h3 className="text-base sm:text-lg font-semibold mb-4">Detalles del Evento</h3>

            {/* Mapa Real */}
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0504062794084!2d-58.2565388!3d-34.9574496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2d17a03d49181%3A0x1ab2627a71646070!2sLa%20escondida!5e1!3m2!1ses-419!2sar!4v1737209428870!5m2!1ses-419!2sar"
                    width="100%"
                    height="230"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de La Escondida"
                ></iframe>
            </div>

            {/* Información de Fecha, Hora y Lugar */}
            <div className="text-xs sm:text-sm mb-4">
                <p className="mb-1 text-4xl sm:text-5xl font-cursiva text-white drop-shadow-lg">
                    15/02/2025
                </p>
                <p className="mb-1"><strong>Hora:</strong> 21:30 hrs</p>
                <p className="mb-3"><strong>Lugar:</strong> Salón de Eventos "La Escondida"</p>
            </div>

            {/* Botón con Ubicación */}
            <div className="flex flex-col items-center space-y-3">
                <div className="relative group">
                    <a
                        href="https://maps.app.goo.gl/x9KMYniAC57wjMxH8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-300 hover:text-blue-800 transition-colors text-xs sm:text-sm"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
                    >
                        Ver Ubicación en Google Maps
                    </a>
                    <motion.img
                        src="/images/pointing.png"
                        alt="Dedo Apuntando"
                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-6 opacity-0 group-hover:opacity-100"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default DetallesEvento;
