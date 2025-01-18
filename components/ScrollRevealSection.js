// components/ScrollRevealSection.js
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function ScrollRevealSection({ children, className }) {
    const { ref, inView } = useInView({
        threshold: 0.1, // Se activa cuando el 10% del elemento esté visible
        triggerOnce: true,
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 50,
            }}
            transition={{ duration: 1.2 }}
        >
            {children}
        </motion.div>
    );
}
