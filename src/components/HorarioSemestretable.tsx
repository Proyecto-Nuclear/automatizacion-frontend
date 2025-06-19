import React from 'react';
import { Horario, HorarioSemestreResponse } from '@/services/horariosService';

interface Props {
    data: HorarioSemestreResponse | null;
    loading: boolean;
    error: string | null;
}

export default function HorarioSemestreTable({ data, loading, error }: Props) {
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                🗓️ Horario Completo del Semestre
            </h2>
            {loading && (
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Generando horario...
                </div>
            )}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            {data && (
                <>
                    <div className="overflow-x-auto rounded-lg shadow mb-6">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700">
                                <th className="p-3 border-b">Asignatura</th>
                                <th className="p-3 border-b">Aula</th>
                                <th className="p-3 border-b">Docente</th>
                                <th className="p-3 border-b">Día</th>
                                <th className="p-3 border-b">Hora</th>
                                <th className="p-3 border-b">Modalidad</th>
                                <th className="p-3 border-b">Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.horarios.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center p-6 text-gray-400">
                                        No hay horarios generados para este semestre.
                                    </td>
                                </tr>
                            )}
                            {data.horarios.map((h: Horario) => (
                                <tr key={h.id} className="hover:bg-blue-50 transition">
                                    <td className="p-3 border-b">
                                        <div className="font-semibold">{h.asignatura.nombre}</div>
                                        <div className="text-xs text-gray-500">{h.asignatura.descripcion}</div>
                                    </td>
                                    <td className="p-3 border-b">
                                        <div>{h.aula.nombre}</div>
                                        <div className="text-xs text-gray-500">{h.aula.tipo} ({h.aula.capacidad} cupos)</div>
                                    </td>
                                    <td className="p-3 border-b">
                                        <div>{h.docente.nombre} {h.docente.apellido}</div>
                                        <div className="text-xs text-gray-500">{h.docente.area_especialidad}</div>
                                    </td>
                                    <td className="p-3 border-b">{h.dia}</td>
                                    <td className="p-3 border-b">{h.start_time} - {h.end_time}</td>
                                    <td className="p-3 border-b capitalize">{h.modalidad}</td>
                                    <td className="p-3 border-b text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          h.estado === 'confirmado'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {h.estado}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Estadísticas y validación */}
                    <div className="bg-gray-50 p-4 rounded shadow flex flex-wrap gap-6 items-center">
                        <div>
                            <span className="font-bold">Validación de conjunto:</span>{' '}
                            <span className="text-green-700">{data.validacion_conjunto}</span>
                        </div>
                        <div>
                            <span className="font-bold">Horarios creados:</span>{' '}
                            {data.estadisticas.estadisticas.horarios_creados}
                        </div>
                        <div>
                            <span className="font-bold">Validaciones exitosas:</span>{' '}
                            {data.estadisticas.estadisticas.validaciones_exitosas}
                        </div>
                        <div>
                            <span className="font-bold">Validaciones fallidas:</span>{' '}
                            {data.estadisticas.estadisticas.validaciones_fallidas}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}