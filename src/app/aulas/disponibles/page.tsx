'use client';

import React from 'react';
import VerificadorDisponibilidadAulas from "@/components/ConsultaAulasDisponibles";


export default function AulasDisponiblesPage() {
    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
            <h2></h2>
            <VerificadorDisponibilidadAulas />
        </div>
    );
}