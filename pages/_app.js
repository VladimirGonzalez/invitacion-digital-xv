// pages/_app.js
import { MusicProvider } from '../components/context/MusicContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <MusicProvider>
            <Component {...pageProps} />
        </MusicProvider>
    );
}

export default MyApp;
