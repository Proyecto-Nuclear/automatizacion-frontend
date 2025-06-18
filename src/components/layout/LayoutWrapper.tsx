"use client";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Sidebar */}
            <aside className="w-60 bg-white dark:bg-blue-900 border-r border-blue-100 dark:border-blue-800 flex flex-col py-8 fixed h-full z-20">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-6 mb-8">
                        <img src="/ruta/al/logo.png" alt="Logo" className="h-10" />
                        <span className="font-bold text-lg text-blue-800 dark:text-white">Sistema de Reservas</span>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <Link href="/" className="px-6 py-2 hover:bg-blue-50 dark:hover:bg-blue-800 rounded transition flex items-center gap-2">
                            <span>🏠</span> Dashboard
                        </Link>
                        <Link href="/aulas/disponibles" className="px-6 py-2 hover:bg-blue-50 dark:hover:bg-blue-800 rounded transition flex items-center gap-2">
                            <span>🏫</span> Aulas Disponibles
                        </Link>
                        <Link href="/programaciones" className="px-6 py-2 hover:bg-blue-50 dark:hover:bg-blue-800 rounded transition flex items-center gap-2">
                            <span>📅</span> Programaciones
                        </Link>
                        <Link href="/automatizaciones" className="px-6 py-2 hover:bg-blue-50 dark:hover:bg-blue-800 rounded transition flex items-center gap-2">
                            <span>⚙️</span> Automatizaciones
                        </Link>
                        <Link href="/perfil" className="px-6 py-2 hover:bg-blue-50 dark:hover:bg-blue-800 rounded transition flex items-center gap-2">
                            <span>👤</span> Perfil
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen ml-60">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-blue-950 border-b border-blue-100 dark:border-blue-800 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div />
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                            title="Cambiar modo"
                        >
                            {darkMode ? "🌙" : "☀️"}
                        </button>
                        <div className="w-9 h-9 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold">A</div>
                        <button className="ml-2 text-blue-800 dark:text-white hover:underline">Salir</button>
                    </div>
                </header>
                <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">{children}</main>
            </div>
        </div>
    );
}