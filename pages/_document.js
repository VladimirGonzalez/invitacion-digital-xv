// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                {/* Metadatos y favicon globales */}
                <link rel="icon" href="/favicon.ico" />
                {/* Otros meta globales si deseas */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
