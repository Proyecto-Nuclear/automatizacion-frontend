'use client';

import Table from '../../components/ui/Table';
import { useEffect, useState } from 'react';
import { fetchAutomatizaciones, eliminarAutomatizacion } from '../../services/automatizacionesApi';

const columns = ['Nombre', 'Estado', 'Fecha de creación', 'Acciones'];

export default function AutomatizacionesPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAutomatizaciones().then(setData).catch(() => alert('Error al cargar automatizaciones')).finally(() => setLoading(false));
    }, []);

    const handleEliminar = async (row: any) => {
        if (confirm(`¿Seguro que quieres eliminar "${row.Nombre}"?`)) {
            await eliminarAutomatizacion(row.id);
            setData((prev) => prev.filter((item) => item.id !== row.id));
        }
    };

    const tableData = data.map((row) => ({
        ...row,
        Acciones: (
            <button onClick={() => handleEliminar(row)} style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>
                Eliminar
            </button>
        ),
    }));

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>Automatizaciones</h2>
            <Table columns={columns} data={tableData} />
        </div>
    );
}