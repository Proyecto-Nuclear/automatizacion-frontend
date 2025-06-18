import React, { useState, ChangeEvent, FormEvent } from 'react';
import AulasDisponiblesSection, { AulaDisponible } from "@/components/AulasDisponiblesSection";
import AulasNoDisponiblesSection, { AulaNoDisponible } from "@/components/AulasNoDisponiblesSection";

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
interface ConsultaResponse {
    asignatura: Asignatura;
    horario_solicitado: HorarioSolicitado;
    aulas_disponibles: AulaDisponible[];
    aulas_no_disponibles: AulaNoDisponible[];
    total_disponibles: number;
    total_no_disponibles: number;
    error: string | null;
}

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const semestres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function VerificadorDisponibilidadAulas() {
    const [formData, setFormData] = useState({
        asignatura_id: '',
        hora_inicio: '',
        hora_fin: '',
        dia: '',
        cantidad_estudiantes: '',
        semestre: ''
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ConsultaResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const requestData = {
            ...formData,
            cantidad_estudiantes: Number(formData.cantidad_estudiantes),
            semestre: Number(formData.semestre)
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/aulas-disponibles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al consultar las aulas');
            }

            const data: ConsultaResponse = await response.json();
            setResults(data);
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            asignatura_id: '',
            hora_inicio: '',
            hora_fin: '',
            dia: '',
            cantidad_estudiantes: '',
            semestre: ''
        });
        setResults(null);
        setError(null);
    };

    return (
        <div className="w-full flex justify-center items-center py-12">
            <div className="bg-[#143e7a] p-10 rounded-2xl shadow-2xl min-w-[480px] max-w-2xl w-full">
                <h2 className="text-white text-3xl font-bold mb-8 text-center tracking-wide shadow-sm drop-shadow-sm">
                    Consulta de aulas disponibles
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/80 p-8 rounded-xl"
                >
                    <input
                        type="text"
                        name="asignatura_id"
                        value={formData.asignatura_id}
                        onChange={handleInputChange}
                        placeholder="ID Asignatura"
                        required
                        className="border-2 border-blue-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 text-lg"
                    />
                    <input
                        type="time"
                        name="hora_inicio"
                        value={formData.hora_inicio}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-blue-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 text-lg"
                    />
                    <input
                        type="time"
                        name="hora_fin"
                        value={formData.hora_fin}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-blue-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 text-lg"
                    />
                    <select
                        name="dia"
                        value={formData.dia}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-blue-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 text-lg"
                    >
                        <option value="">Día</option>
                        {dias.map(dia => (
                            <option key={dia} value={dia}>{dia}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="cantidad_estudiantes"
                        value={formData.cantidad_estudiantes}
                        onChange={handleInputChange}
                        placeholder="Cantidad de estudiantes"
                        min={1}
                        required
                        className="border-2 border-blue-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 text-lg"
                    />
                    <select
                        name="semestre"
                        value={formData.semestre}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-blue-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 text-lg"
                    >
                        <option value="">Semestre</option>
                        {semestres.map(sem => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-full bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold mt-2 hover:bg-blue-700 transition"
                    >
                        {loading ? 'Consultando...' : 'Verificar Disponibilidad'}
                    </button>
                    {results && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="col-span-full bg-gray-200 text-gray-700 py-3 rounded-lg text-lg mt-2 hover:bg-gray-300 transition"
                        >
                            Nueva Consulta
                        </button>
                    )}
                </form>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 mt-4 rounded">{error}</div>
                )}

                {results && (
                    <div className="mt-6 space-y-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <strong>Asignatura:</strong> {results.asignatura.nombre} ({results.asignatura.id})<br />
                            <strong>Horario:</strong> {results.horario_solicitado.dia} de {results.horario_solicitado.hora_inicio} a {results.horario_solicitado.hora_fin}<br />
                            <strong>Estudiantes:</strong> {results.horario_solicitado.cantidad_estudiantes} - <strong>Semestre:</strong> {results.horario_solicitado.semestre}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AulasDisponiblesSection
                                aulas={results.aulas_disponibles}
                                datosConsulta={{
                                    asignatura_id: results.asignatura.id,
                                    hora_inicio: results.horario_solicitado.hora_inicio,
                                    hora_fin: results.horario_solicitado.hora_fin,
                                    dia: results.horario_solicitado.dia,
                                    semestre: results.horario_solicitado.semestre,
                                    cantidad_estudiantes: results.horario_solicitado.cantidad_estudiantes,
                                }}
                            />
                            <AulasNoDisponiblesSection aulas={results.aulas_no_disponibles} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}