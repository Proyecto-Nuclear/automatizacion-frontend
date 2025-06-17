import React, { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}