import '../styles/globals.css';
import { ReactNode } from 'react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import "./globals.css"

export default function RootLayout({ children }: Readonly<{ children : ReactNode }>) {
    return (
        <html lang="es">
        <body>
        <LayoutWrapper>
            {children}
        </LayoutWrapper>
        </body>
        </html>
    );
}