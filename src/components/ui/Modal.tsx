import React from 'react';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
};

export default function Modal({ open, onClose, children, title }: ModalProps) {
    if (!open) return null;
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#fff',
                    padding: 24,
                    borderRadius: 8,
                    minWidth: 340,
                    minHeight: 100,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    position: 'relative',
                }}
                onClick={e => e.stopPropagation()}
            >
                {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
                <button
                    onClick={onClose}
                    aria-label="Cerrar"
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        border: 'none',
                        background: 'transparent',
                        fontWeight: 'bold',
                        fontSize: 18,
                        cursor: 'pointer',
                    }}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}