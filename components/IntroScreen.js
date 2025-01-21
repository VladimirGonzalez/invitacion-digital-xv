/* Intro Cinemática */
function IntroScreen({ onFinish }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onFinish();
        }, 3000); // 3 segundos de intro
        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl sm:text-6xl font-cursiva text-yellow-300 mb-4 drop-shadow-md">
                    ¡Bienvenido!
                </h1>
                <p className="text-sm sm:text-base">
                    Cargando tu invitación mágica...
                </p>
            </motion.div>
        </motion.div>

    );
}
export default IntroScreen;