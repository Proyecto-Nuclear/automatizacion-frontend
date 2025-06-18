import React from 'react';

export interface AulaNoDisponible {
    id: string;
    nombre: string;
    razon: string;
}

export default function AulasNoDisponiblesSection({ aulas }: { aulas: AulaNoDisponible[] }) {
    return (
        <div className="bg-red-50 p-4 rounded">
            <strong>Aulas No Disponibles</strong>
            {aulas.length === 0 && <div className="text-gray-500 mt-2">No hay aulas no disponibles.</div>}
            {aulas.map((aula) => (
                <div key={aula.id} className="mt-2 border-b pb-2">
                    <div><strong>{aula.nombre}</strong></div>
                    <div className="text-sm text-red-700 whitespace-pre-line">{aula.razon}</div>
                </div>
            ))}
        </div>
    );
}