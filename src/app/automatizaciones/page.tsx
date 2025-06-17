'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import FormCrearAutomatizacion from '../../components/automatizaciones/FormCrearAutomatizacion';
import {
    fetchAutomatizaciones,
    eliminarAutomatizacion,
    crearAutomatizacion,
    actualizarAutomatizacion,
} from '../../services/automatizacionesApi';

const columns = ['Nombre', 'Estado', 'Fecha de creación', 'Acciones'];

export default function AutomatizacionesPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Para crear
    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    // Para editar
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchAutomatizaciones()
            .then(setData)
            .catch(() => alert('Error al cargar automatizaciones'))
            .finally(() => setLoading(false));
    }, []);

    const handleEliminar = async (row: any) => {
        if (confirm(`¿Seguro que quieres eliminar "${row.nombre}"?`)) {
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

    const handleEditar = (row: any) => {
        setEditData(row);
        setEditModalOpen(true);
    };

    const handleUpdate = async (formData: { nombre: string; estado: string }) => {
        if (!editData) return;
        setUpdating(true);
        try {
            const updated = await actualizarAutomatizacion(editData.id, formData);
            setData(prev =>
                prev.map(item => (item.id === editData.id ? { ...item, ...updated } : item))
            );
            setEditModalOpen(false);
            setEditData(null);
        } catch {
            alert('Error al actualizar automatización');
        } finally {
            setUpdating(false);
        }
    };

    const tableData = data.map(row => ({
        ...row,
        Acciones: (
            <div style={{ display: 'flex', gap: 8 }}>
                <button
                    onClick={() => handleEditar(row)}
                    style={{
                        color: '#1976d2',
                        background: 'none',
                        border: '1px solid #1976d2',
                        borderRadius: 4,
                        cursor: 'pointer',
                        padding: '2px 10px',
                    }}
                >
                    Editar
                </button>
                <button
                    onClick={() => handleEliminar(row)}
                    style={{
                        color: '#f44336',
                        background: 'none',
                        border: '1px solid #f44336',
                        borderRadius: 4,
                        cursor: 'pointer',
                        padding: '2px 10px',
                    }}
                >
                    Eliminar
                </button>
            </div>
        ),
    }));

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
            }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Automatizaciones</h2>
                <button
                    onClick={() => setModalOpen(true)}
                    style={{
                        padding: '8px 20px',
                        fontWeight: 500,
                        fontSize: 16,
                        cursor: 'pointer',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                    }}
                >
                    + Nueva automatización
                </button>
            </div>
            <Table columns={columns} data={tableData} />

            {/* Modal para crear */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Crear nueva automatización">
                <FormCrearAutomatizacion
                    onSubmit={handleCrear}
                    onCancel={() => setModalOpen(false)}
                    loading={creating}
                />
            </Modal>

            {/* Modal para editar */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar automatización">
                <FormCrearAutomatizacion
                    onSubmit={handleUpdate}
                    onCancel={() => setEditModalOpen(false)}
                    loading={updating}
                    initialValues={editData}
                />
            </Modal>
        </div>
    );
}