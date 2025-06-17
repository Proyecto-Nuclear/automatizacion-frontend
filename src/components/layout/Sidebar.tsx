import React from 'react';

export default function Sidebar() {
    return (
        <aside>
            {/* Aquí va la navegación lateral */}
            <nav>
                <ul>
                    <li>Dashboard</li>
                    <li>Automatizaciones</li>
                    <li>Logs</li>
                    <li>Configuración</li>
                    <li>Perfil</li>
                </ul>
            </nav>
        </aside>
    );
}