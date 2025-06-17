'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import FormAutomatizacion from '../../components/automatizaciones/FormAutomatizacion'; // crea este form según tus campos
import {
    fetchAutomatizaciones,
    crearAutomatizacion,
    editarAutomatizacion,
    eliminarAutomatizacion,
} from '../../services/automatizacionesApi';
import { Automatizacion } from '../../types/Automatizacion';

const columns = [
    'ID',
    'Nombre',
    'Estado',
    'Fecha de creación',
    'Acciones',
];

export default function AutomatizacionesPage() {
    const [data, setData] = useState<Automatizacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Para crear y editar
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editing, setEditing] = useState<Automatizacion | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        cargarAutomatizaciones();
    }, []);

    const cargarAutomatizaciones = async () => {
        setLoading(true);
        try {
            const res = await fetchAutomatizaciones();
            setData(res.automatizaciones || []);
        } catch {
            alert('Error al cargar automatizaciones');
        } finally {
            setLoading(false);
        }
    };

    const handleCrear = async (formData: Omit<Automatizacion, 'id' | 'fecha_creacion'>) => {
        setSaving(true);
        try {
            await crearAutomatizacion(formData);
            setModalOpen(false);
            await cargarAutomatizaciones();
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert('Ocurrió un error desconocido');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleEditar = async (id: string, formData: Omit<Automatizacion, 'id' | 'fecha_creacion'>) => {
        setSaving(true);
        try {
            await editarAutomatizacion(id, formData);
            setEditing(null);
            await cargarAutomatizaciones();
        }catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert('Ocurrió un error desconocido');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleEliminar = async (id: string) => {
        if (confirm(`¿Seguro que quieres eliminar la automatización ${id}?`)) {
            setSaving(true);
            try {
                await eliminarAutomatizacion(id);
                await cargarAutomatizaciones();
            }catch (e: unknown) {
                if (e instanceof Error) {
                    alert(e.message);
                } else {
                    alert('Ocurrió un error desconocido');
                }
            } finally {
                setSaving(false);
            }
        }
    };

    const tableData = data.map((row) => ({
        ID: row.id,
        Nombre: row.nombre,
        Estado: row.estado,
        'Fecha de creación': row.fecha_creacion,
        Acciones: (
            <div style={{ display: 'flex', gap: 6 }}>
                <button
                    onClick={() => setEditing(row)}
                    style={{ fontSize: 12, padding: '2px 6px' }}
                >
                    Editar
                </button>
                <button
                    onClick={() => handleEliminar(row.id)}
                    style={{ fontSize: 12, color: '#f44336', border: '1px solid #f44336', borderRadius: 4, padding: '2px 6px' }}
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
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Crear automatización">
                <FormAutomatizacion
                    onSubmit={handleCrear}
                    onCancel={() => setModalOpen(false)}
                    loading={saving}
                />
            </Modal>

            {/* Modal para editar */}
            <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar automatización">
                {editing && (
                    <FormAutomatizacion
                        initial={editing}
                        onSubmit={(formData) => handleEditar(editing.id, formData)}
                        onCancel={() => setEditing(null)}
                        loading={saving}
                    />
                )}
            </Modal>
        </div>
    );
}