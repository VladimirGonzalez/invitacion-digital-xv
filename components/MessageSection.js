// components/MessageSection.js
import ScrollRevealSection from './ScrollRevealSection';

export default function MessageSection() {
    return (
        <ScrollRevealSection className="min-h-screen flex flex-col items-center justify-center bg-transparent">
            <h1 className="text-5xl font-cursiva text-gold">Momento Especial</h1>
            <p className="text-xl text-white mt-4 max-w-xl text-center">
                Existen momentos en la vida que imaginamos, soñamos y esperamos...
            </p>
        </ScrollRevealSection>
    );
}
