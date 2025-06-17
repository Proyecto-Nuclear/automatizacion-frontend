'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import FormReservarAula from '../../components/programaciones/FormReservarAula';
import {
    fetchProgramaciones,
    reservarAula,
    cambiarEstadoProgramacion,
    cancelarProgramacion,
} from '../../services/programacionesApi';

const columns = [
    'ID',
    'Asignatura',
    'Aula',
    'Día',
    'Hora inicio',
    'Hora fin',
    'Estudiantes',
    'Semestre',
    'Estado',
    'Acciones',
];

export default function ProgramacionesPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Para crear
    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    // Para cambiar estado
    const [changing, setChanging] = useState<string | null>(null);

    useEffect(() => {
        cargarProgramaciones();
        // eslint-disable-next-line
    }, []);

    const cargarProgramaciones = async () => {
        setLoading(true);
        try {
            const res = await fetchProgramaciones();
            setData(res.programaciones || []);
        } catch {
            alert('Error al cargar programaciones');
        } finally {
            setLoading(false);
        }
    };

    const handleReservar = async (formData: any) => {
        setCreating(true);
        try {
            await reservarAula(formData);
            setModalOpen(false);
            await cargarProgramaciones();
        } catch (e: any) {
            alert(e.message);
        } finally {
            setCreating(false);
        }
    };

    const handleCambiarEstado = async (row: any, nuevo_estado: string) => {
        setChanging(row.id);
        try {
            await cambiarEstadoProgramacion(row.id, nuevo_estado);
            await cargarProgramaciones();
        } catch (e: any) {
            alert(e.message);
        } finally {
            setChanging(null);
        }
    };

    const handleCancelar = async (row: any) => {
        if (confirm(`¿Seguro que quieres cancelar la programación ${row.id}?`)) {
            setChanging(row.id);
            try {
                await cancelarProgramacion(row.id);
                await cargarProgramaciones();
            } catch (e: any) {
                alert(e.message);
            } finally {
                setChanging(null);
            }
        }
    };

    const tableData = data.map((row) => ({
        ID: row.id,
        Asignatura: row.asignatura_id,
        Aula: row.aula_id,
        Día: row.dia,
        'Hora inicio': row.hora_inicio,
        'Hora fin': row.hora_fin,
        Estudiantes: row.cantidad_estudiantes,
        Semestre: row.semestre,
        Estado: row.estado,
        Acciones: (
            <div style={{ display: 'flex', gap: 6 }}>
                <button
                    onClick={() => handleCambiarEstado(row, 'reservado')}
                    disabled={changing === row.id || row.estado === 'reservado'}
                    style={{ fontSize: 12, padding: '2px 6px' }}
                >
                    Reservar
                </button>
                <button
                    onClick={() => handleCambiarEstado(row, 'ocupado')}
                    disabled={changing === row.id || row.estado === 'ocupado'}
                    style={{ fontSize: 12, padding: '2px 6px' }}
                >
                    Ocupar
                </button>
                <button
                    onClick={() => handleCancelar(row)}
                    disabled={changing === row.id || row.estado === 'cancelado'}
                    style={{ fontSize: 12, color: '#f44336', border: '1px solid #f44336', borderRadius: 4, padding: '2px 6px' }}
                >
                    Cancelar
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
                <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Programaciones (Reservas de Aula)</h2>
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
                    + Nueva reserva
                </button>
            </div>
            <Table columns={columns} data={tableData} />

            {/* Modal para reservar */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Reservar aula">
                <FormReservarAula
                    onSubmit={handleReservar}
                    onCancel={() => setModalOpen(false)}
                    loading={creating}
                />
            </Modal>
        </div>
    );
}