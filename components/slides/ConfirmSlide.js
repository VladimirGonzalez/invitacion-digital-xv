// slides/ConfirmSlide.js
import { useState } from 'react';

export default function ConfirmSlide() {
    const [nombre, setNombre] = useState('');
    const [asistencia, setAsistencia] = useState('');
    const [acompanantes, setAcompanantes] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [contacto, setContacto] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lógica de envío a WhatsApp (o lo que uses)
        let texto = `*🎉 Confirmación de Asistencia - XV Años de Nahara Benítez*\n\n`;
        texto += `*Nombre completo:* ${nombre || 'Sin especificar'}\n`;
        texto += `*¿Puede asistir?:* ${asistencia || 'Sin respuesta'}\n`;
        texto += `*Nº de acompañantes:* ${acompanantes || '0'}\n`;
        texto += `*Mensaje / Sugerencia:* ${mensaje || 'Ninguno'}\n`;
        texto += `*Contacto (WhatsApp):* ${contacto || 'No proporcionado'}\n`;

        const encodedText = encodeURIComponent(texto);
        const phoneNumber = '+5491134232789';
        const whatsAppURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

        // Redirigir (o fetch, etc.)
        window.open(whatsAppURL, '_blank');

        // Marcamos como submitted para que el wizard pueda pasar al final
        setSubmitted(true);
    };

    return (
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md text-white font-body">
            {!submitted ? (
                <>
                    <h3 className="text-lg font-semibold mb-4">Confirma tu Asistencia</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Nombre Completo *</label>
                            <input
                                type="text"
                                className="w-full p-2 bg-white/30 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">¿Puedes asistir? *</label>
                            <div className="mt-1 flex space-x-4">
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name="asistencia"
                                        value="Sí, asistiré"
                                        onChange={() => setAsistencia('Sí, asistiré')}
                                        required
                                    />
                                    <span>Sí, asistiré</span>
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name="asistencia"
                                        value="No podré ir"
                                        onChange={() => setAsistencia('No podré ir')}
                                        required
                                    />
                                    <span>No podré ir</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Número de acompañantes</label>
                            <input
                                type="number"
                                className="w-full p-2 bg-white/30 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                                min="0"
                                value={acompanantes}
                                onChange={(e) => setAcompanantes(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Mensaje / Sugerencia</label>
                            <textarea
                                className="w-full p-2 bg-white/30 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                                rows="3"
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-black text-sm mb-1">Contacto (WhatsApp)</label>
                            <input
                                type="text"
                                className="w-full p-2 bg-white/50 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                                placeholder="Ingresa tu numero de celular"
                                value={contacto}
                                onChange={(e) => setContacto(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded mt-2 hover:bg-blue-400"
                        >
                            Enviar Confirmación
                        </button>
                    </form>
                </>
            ) : (
                <p className="text-center text-base sm:text-lg mt-4">
                    ¡Gracias por confirmar! <br />
                    <span className="block mt-2">Avanza para ver el mensaje final.</span>
                </p>
            )}
        </div>
    );
}
