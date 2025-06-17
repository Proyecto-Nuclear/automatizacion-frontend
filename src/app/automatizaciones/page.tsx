'use client';

import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import FormCrearAutomatizacion from '../../components/automatizaciones/FormCrearAutomatizacion';
import { useEffect, useState } from 'react';
import {
    fetchAutomatizaciones,
    eliminarAutomatizacion,
    crearAutomatizacion,
} from '../../services/automatizacionesApi';

const columns = ['Nombre', 'Estado', 'Fecha de creación', 'Acciones'];

export default function AutomatizacionesPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchAutomatizaciones()
            .then(setData)
            .catch(() => alert('Error al cargar automatizaciones'))
            .finally(() => setLoading(false));
    }, []);

    const handleEliminar = async (row: any) => {
        if (confirm(`¿Seguro que quieres eliminar "${row.Nombre}"?`)) {
            await eliminarAutomatizacion(row.id);
            setData(prev => prev.filter(item => item.id !== row.id));
        }
    };

    const handleCrear = async (formData: { nombre: string; estado: string }) => {
        setCreating(true);
        try {
            const nueva = await crearAutomatizacion(formData);
            setData(prev => [...prev, nueva]);
            setModalOpen(false);
        } catch {
            alert('Error al crear automatización');
        } finally {
            setCreating(false);
        }
    };

    const tableData = data.map(row => ({
        ...row,
        Acciones: (
            <button
                onClick={() => handleEliminar(row)}
                style={{
                    color: '#f44336',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Eliminar
            </button>
        ),
    }));

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Automatizaciones</h2>
                <button onClick={() => setModalOpen(true)} style={{ padding: '8px 20px', fontWeight: 500, fontSize: 16, cursor: 'pointer', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
                    + Nueva automatización
                </button>
            </div>
            <Table columns={columns} data={tableData} />

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Crear nueva automatización">
                <FormCrearAutomatizacion
                    onSubmit={handleCrear}
                    onCancel={() => setModalOpen(false)}
                    loading={creating}
                />
            </Modal>
        </div>
    );
}