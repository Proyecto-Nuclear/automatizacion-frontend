"use client";
import Link from "next/link";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    // Barra lateral y barra superior con el mismo azul (#143e7a)
    return (
        <div className="min-h-screen flex bg-white text-gray-900">
            {/* Sidebar */}
            <aside className="w-60 bg-[#143e7a] border-r border-blue-900 flex flex-col py-8 fixed h-full z-20">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-6 mb-8">
                        <img src="/ruta/al/logo.png" alt="Logo" className="h-10" />
                        <span className="font-bold text-lg text-white">Sistema de Reservas</span>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <Link href="/" className="px-6 py-2 hover:bg-blue-800 rounded transition flex items-center gap-2 text-white hover:text-white">
                            <span>🏠</span> Dashboard
                        </Link>
                        <Link href="/aulas/disponibles" className="px-6 py-2 hover:bg-blue-800 rounded transition flex items-center gap-2 text-white hover:text-white">
                            <span>🏫</span> Aulas Disponibles
                        </Link>
                        <Link href="/programaciones" className="px-6 py-2 hover:bg-blue-800 rounded transition flex items-center gap-2 text-white hover:text-white">
                            <span>📅</span> Programaciones
                        </Link>
                        <Link href="/automatizaciones" className="px-6 py-2 hover:bg-blue-800 rounded transition flex items-center gap-2 text-white hover:text-white">
                            <span>⚙️</span> Automatizaciones
                        </Link>
                        <Link href="/perfil" className="px-6 py-2 hover:bg-blue-800 rounded transition flex items-center gap-2 text-white hover:text-white">
                            <span>👤</span> Perfil
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen ml-60">
                {/* Header */}
                <header className="h-16 bg-[#143e7a] border-b border-blue-900 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div />
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#143e7a] font-bold">A</div>
                        <button className="ml-2 text-white hover:underline">Salir</button>
                    </div>
                </header>
                <main className="flex-1 p-8 bg-white">{children}</main>
            </div>
        </div>
    );
}