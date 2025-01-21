//ModalForm.js
import { useState } from 'react';
import { motion } from 'framer-motion';

function ModalForm({ onClose }) {
    const [nombre, setNombre] = useState('');
    const [asistencia, setAsistencia] = useState('');
    const [acompanantes, setAcompanantes] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [contacto, setContacto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let texto = `*🎉 Confirmación de Asistencia - XV Años de Nahara Benítez*\n\n`;
        texto += `*Nombre completo:* ${nombre || 'Sin especificar'}\n`;
        texto += `*¿Puede asistir?:* ${asistencia || 'Sin respuesta'}\n`;
        texto += `*Nº de acompañantes:* ${acompanantes || '0'}\n`;
        texto += `*Mensaje / Sugerencia:* ${mensaje || 'Ninguno'}\n`;
        texto += `*Contacto (WhatsApp):* ${contacto || 'No proporcionado'}\n`;

        const encodedText = encodeURIComponent(texto);
        const phoneNumber = '+5493329627578'; // Reemplaza con tu número
        const whatsAppURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

        window.location.href = whatsAppURL;
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { y: '-100vh', opacity: 0 },
        visible: { y: '0', opacity: 1, transition: { delay: 0.1, duration: 0.3, ease: 'easeOut' } },
        exit: { y: '100vh', opacity: 0 },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
            <motion.div
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-lg w-full relative"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-400 transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Confirmación de Asistencia
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block">
                        <span className="text-white font-medium">¿Cuál es tu nombre completo? *</span>
                        <input
                            type="text"
                            className="mt-2 w-full p-3 bg-white/30 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </label>

                    <div>
                        <span className="text-white font-medium">¿Puedes asistir? *</span>
                        <div className="mt-3 flex space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="asistencia"
                                    value="Sí, asistiré"
                                    onChange={() => setAsistencia('Sí, asistiré')}
                                    required
                                />
                                <span className="text-white">Sí, asistiré</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="asistencia"
                                    value="No podré ir"
                                    onChange={() => setAsistencia('No podré ir')}
                                    required
                                />
                                <span className="text-white">No podré ir</span>
                            </label>
                        </div>
                    </div>

                    <label className="block">
                        <span className="text-white font-medium">Número de acompañantes:</span>
                        <input
                            type="number"
                            className="mt-2 w-full p-3 bg-white/30 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                            value={acompanantes}
                            onChange={(e) => setAcompanantes(e.target.value)}
                            min="0"
                        />
                    </label>

                    <label className="block">
                        <span className="text-white font-medium">¿Deseas dejarnos algún mensaje o sugerencia?</span>
                        <textarea
                            className="mt-2 w-full p-3 bg-white/30 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                            rows="3"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-black font-medium">Ingresa tu Número de contacto (WhatsApp):</span>
                        <input
                            type="text"
                            className="mt-2 w-full p-3 bg-blue-500 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                            placeholder="+549..."
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Enviar Confirmación
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default ModalForm;
