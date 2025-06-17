import React, { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button onClick={onClose} className="modal-close">×</button>
                {children}
            </div>
        </div>
    );
}