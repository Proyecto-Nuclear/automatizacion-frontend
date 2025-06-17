'use client';

import Table from '../../components/ui/Table';
import { useState } from 'react';

const columns = ['Nombre', 'Estado', 'Fecha de creación', 'Acciones'];

const initialData = [
    {
        id: 1,
        Nombre: 'Enviar reporte mensual',
        Estado: 'Activa',
        'Fecha de creación': '2025-06-01',
    },
    {
        id: 2,
        Nombre: 'Sincronizar contactos',
        Estado: 'Inactiva',
        'Fecha de creación': '2025-05-20',
    },
    {
        id: 3,
        Nombre: 'Notificar pagos',
        Estado: 'Activa',
        'Fecha de creación': '2025-06-10',
    },
];

export default function AutomatizacionesPage() {
    const [data, setData] = useState(initialData);

    // Manejadores de acciones
    const handleVer = (row: any) => {
        alert(`Vista de: ${row.Nombre}`);
    };

    const handleEditar = (row: any) => {
        alert(`Editar: ${row.Nombre}`);
    };

    const handleEliminar = (row: any) => {
        if (confirm(`¿Seguro que quieres eliminar "${row.Nombre}"?`)) {
            setData((prev) => prev.filter((item) => item.id !== row.id));
        }
    };

    // Prepara los datos para la tabla, agregando botones de acción
    const tableData = data.map((row) => ({
        ...row,
        Acciones: (
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleVer(row)} style={{ color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer' }}>Ver</button>
                <button onClick={() => handleEditar(row)} style={{ color: '#ff9800', background: 'none', border: 'none', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => handleEliminar(row)} style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>Eliminar</button>
            </div>
        ),
    }));

    return (
        <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>Automatizaciones</h2>
            <Table columns={columns} data={tableData} />
        </div>
    );
}