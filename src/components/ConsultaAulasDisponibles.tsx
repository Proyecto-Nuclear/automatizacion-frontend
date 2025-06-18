'use client'
import React, { useState } from 'react';
import { fetchAulasDisponibles, ConsultaAulasParams } from '@/services/aulasApi';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Tipos para la nueva estructura de respuesta
interface Sede {
    id: string;
    nombre: string;
}

interface Recurso {
    id: string;
    nombre: string;
}

interface AulaDisponible {
    id: string;
    nombre: string;
    tipo: string;
    capacidad: number;
    sede: Sede;
    recursos: Recurso[];
}

interface AulaNoDisponible {
    id: string;
    nombre: string;
    razon: string;
}

interface Asignatura {
    id: string;
    nombre: string;
    tipo: string;
}

interface HorarioSolicitado {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    cantidad_estudiantes: number;
    semestre: number;
}

interface RespuestaAulas {
    asignatura: Asignatura;
    horario_solicitado: HorarioSolicitado;
    aulas_disponibles: AulaDisponible[];
    aulas_no_disponibles: AulaNoDisponible[];
    total_disponibles: number;
    total_no_disponibles: number;
    error: string | null;
}

export default function ConsultaAulasDisponibles() {
    const [form, setForm] = useState<ConsultaAulasParams>({
        asignatura_id: '',
        hora_inicio: '',
        hora_fin: '',
        dia: '',
        cantidad_estudiantes: 0,
        semestre: 1,
    });

    const [respuesta, setRespuesta] = useState<RespuestaAulas | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'cantidad_estudiantes' || name === 'semestre' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRespuesta(null);

        try {
            const res = await fetchAulasDisponibles(form);
            setRespuesta(res);

            // Si hay error en la respuesta del backend
            if (res.error) {
                setError(res.e);
            }
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Consultar aulas disponibles</h3>
            <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
                <label>
                    Asignatura ID:
                    <input name="asignatura_id" value={form.asignatura_id} onChange={handleChange} required />
                </label>
                <label>
                    Día:
                    <select name="dia" value={form.dia} onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        {dias.map(dia => (
                            <option key={dia} value={dia}>{dia}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Hora inicio:
                    <input name="hora_inicio" type="time" value={form.hora_inicio} onChange={handleChange} required />
                </label>
                <label>
                    Hora fin:
                    <input name="hora_fin" type="time" value={form.hora_fin} onChange={handleChange} required />
                </label>
                <label>
                    Cantidad de estudiantes:
                    <input name="cantidad_estudiantes" type="number" value={form.cantidad_estudiantes} min={1} onChange={handleChange} required />
                </label>
                <label>
                    Semestre:
                    <input name="semestre" type="number" value={form.semestre} min={1} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}

            {respuesta && (
                <div>
                    {/* Información de la consulta */}
                    <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                        <h4>Información de la consulta</h4>
                        <p><strong>Asignatura:</strong> {respuesta.asignatura.nombre} ({respuesta.asignatura.id}) - {respuesta.asignatura.tipo}</p>
                        <p><strong>Horario:</strong> {respuesta.horario_solicitado.dia} de {respuesta.horario_solicitado.hora_inicio} a {respuesta.horario_solicitado.hora_fin}</p>
                        <p><strong>Estudiantes:</strong> {respuesta.horario_solicitado.cantidad_estudiantes} | <strong>Semestre:</strong> {respuesta.horario_solicitado.semestre}</p>
                        <p><strong>Resultados:</strong> {respuesta.total_disponibles} disponibles, {respuesta.total_no_disponibles} no disponibles</p>
                    </div>

                    {/* Aulas disponibles */}
                    <div style={{ marginBottom: 20 }}>
                        <h4 style={{ color: 'green' }}>Aulas Disponibles ({respuesta.total_disponibles})</h4>
                        {respuesta.aulas_disponibles.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                <tr style={{ backgroundColor: '#f9f9f9' }}>
                                    <th style={{ border: '1px solid #ddd', padding: 8 }}>ID</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Nombre</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Tipo</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Capacidad</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Sede</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Recursos</th>
                                </tr>
                                </thead>
                                <tbody>
                                {respuesta.aulas_disponibles.map(aula => (
                                    <tr key={aula.id}>
                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{aula.id}</td>
                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{aula.nombre}</td>
                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{aula.tipo}</td>
                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{aula.capacidad}</td>
                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{aula.sede.nombre}</td>
                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>
                                            {aula.recursos.map(recurso => recurso.nombre).join(', ')}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p style={{ color: '#666' }}>No hay aulas disponibles para este horario.</p>
                        )}
                    </div>

                    {/* Aulas no disponibles */}
                    {respuesta.aulas_no_disponibles.length > 0 && (
                        <div>
                            <h4 style={{ color: 'orange' }}>Aulas No Disponibles ({respuesta.total_no_disponibles})</h4>
                            <div style={{ backgroundColor: '#fff3cd', padding: 16, borderRadius: 4, border: '1px solid #ffeaa7' }}>
                                {respuesta.aulas_no_disponibles.map(aula => (
                                    <div key={aula.id} style={{ marginBottom: 12 }}>
                                        <strong>{aula.nombre} ({aula.id})</strong>
                                        <p style={{ margin: '4px 0', fontSize: '14px', color: '#856404' }}>
                                            {aula.razon}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}