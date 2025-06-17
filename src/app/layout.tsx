import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
        <body>
        <header>
            {/* Aquí va tu header global */}
        </header>
        <main>{children}</main>
        <footer>
            {/* Aquí va tu footer global */}
        </footer>
        </body>
        </html>
    );
}