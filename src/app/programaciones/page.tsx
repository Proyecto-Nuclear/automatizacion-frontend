"use client"
import React, { useEffect, useState } from 'react';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import {
    fetchProgramaciones,
    cambiarEstadoProgramacion,
    cancelarProgramacion,
} from '@/services/programacionesApi';

const columns = [
    'ID',
    'Asignatura',
    'Aula',
    'Docente',
    'Día',
    'Fecha',
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

    // Datos de referencia
    const [datos, setDatos] = useState<any>(null);

    // Para detalles
    const [detalleOpen, setDetalleOpen] = useState(false);
    const [detalleRow, setDetalleRow] = useState<any | null>(null);

    // Para cambiar estado
    const [changing, setChanging] = useState<string | null>(null);

    useEffect(() => {
        cargarProgramaciones();
        cargarDatos();
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

    const cargarDatos = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/v1/datos');
            const json = await res.json();
            setDatos(json);
        } catch {
            alert('Error al cargar datos de referencia');
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

    // Helpers para mostrar nombres
    const getAsignaturaNombre = (id: string) =>
        datos?.asignaturas?.find((a: any) => a.id === id)?.nombre || id;
    const getAulaNombre = (id: string) =>
        datos?.aulas?.find((a: any) => a.id === id)?.nombre || id;
    const getDocenteNombre = (id: string) => {
        const d = datos?.docentes?.find((doc: any) => doc.id === id);
        return d ? `${d.nombre} ${d.apellido}` : id;
    };

    const tableData = data.map((row) => ({
        ID: row.id,
        Asignatura: getAsignaturaNombre(row.asignatura_id),
        Aula: getAulaNombre(row.aula_id),
        Docente: getDocenteNombre(row.docente_id),
        Día: row.dia,
        Fecha: row.fecha,
        'Hora inicio': row.hora_inicio,
        'Hora fin': row.hora_fin,
        Estudiantes: row.estudiantes ?? '',
        Semestre: row.semestre,
        Estado: row.estado,
        Acciones: (
            <div style={{ display: 'flex', gap: 6 }}>
                <button
                    onClick={() => {
                        setDetalleRow(row);
                        setDetalleOpen(true);
                    }}
                    style={{ fontSize: 12, padding: '2px 6px' }}
                >
                    Detalles
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

    if (loading || !datos) return <div>Cargando...</div>;

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
            }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Programaciones (Reservas de Aula)</h2>
            </div>
            <Table columns={columns} data={tableData} />

            {/* Modal de detalles */}
            <Modal open={detalleOpen} onClose={() => setDetalleOpen(false)} title="Detalles de la programación">
                {detalleRow && (
                    <div style={{ lineHeight: 1.7 }}>
                        <b>ID:</b> {detalleRow.id}<br />
                        <b>Asignatura:</b> {getAsignaturaNombre(detalleRow.asignatura_id)}<br />
                        <b>Aula:</b> {getAulaNombre(detalleRow.aula_id)}<br />
                        <b>Docente:</b> {getDocenteNombre(detalleRow.docente_id)}<br />
                        <b>Día:</b> {detalleRow.dia}<br />
                        <b>Fecha:</b> {detalleRow.fecha}<br />
                        <b>Hora inicio:</b> {detalleRow.hora_inicio}<br />
                        <b>Hora fin:</b> {detalleRow.hora_fin}<br />
                        <b>Estudiantes:</b> {detalleRow.cantidad_estudiantes ?? ''}<br />
                        <b>Semestre:</b> {detalleRow.semestre}<br />
                        <b>Estado:</b> {detalleRow.estado}<br />
                        <b>Usuario:</b> {detalleRow.id_usuario}<br />
                        <b>Fecha creación:</b> {detalleRow.fecha_creacion}<br />
                        <b>Hora creación:</b> {detalleRow.hora_creacion}<br />
                        {detalleRow.fecha_confirmacion && (
                            <><b>Fecha confirmación:</b> {detalleRow.fecha_confirmacion}<br /></>
                        )}
                        {detalleRow.horario_id && (
                            <><b>ID Horario:</b> {detalleRow.horario_id}<br /></>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}