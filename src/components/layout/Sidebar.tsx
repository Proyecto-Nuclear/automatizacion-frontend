'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Automatizaciones', href: '/automatizaciones' },
    { name: 'Logs', href: '/logs' },
    { name: 'Configuración', href: '/configuracion' },
    { name: 'Perfil', href: '/perfil' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            width: 220,
            background: '#181E29',
            color: '#fff',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        }}>
            <div style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 16 }}>
                Automatización
            </div>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {navItems.map(item => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                style={{
                                    display: 'block',
                                    padding: '0.75rem 1rem',
                                    marginBottom: 8,
                                    borderRadius: 6,
                                    background: pathname === item.href ? '#283046' : 'transparent',
                                    color: pathname === item.href ? '#61dafb' : '#fff',
                                    fontWeight: pathname === item.href ? 600 : 400,
                                    textDecoration: 'none',
                                    transition: 'background 0.2s'
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}