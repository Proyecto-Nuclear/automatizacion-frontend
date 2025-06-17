import React from 'react';

export default function Header() {
    return (
        <header style={{
            width: '100%',
            background: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <span style={{ fontSize: 18, fontWeight: 500 }}>Panel de Automatización</span>
            {/* Aquí puedes agregar avatar, notificaciones, etc */}
            <div>
        <span style={{
            background: '#61dafb',
            color: '#181E29',
            padding: '0.5rem 1rem',
            borderRadius: 20,
            fontWeight: 600
        }}>jhullecheverry</span>
            </div>
        </header>
    );
}