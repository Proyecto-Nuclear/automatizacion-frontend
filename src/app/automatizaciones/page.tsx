"use client";
import React, { useState } from 'react';
import { crearHorarioCompletoSemestre, HorarioSemestreResponse } from '@/services/horariosService';
import HorarioSemestreTable from "@/components/HorarioSemestreTable";

export default function HorariosPage() {
    const [semestre, setSemestre] = useState<number | null>(null);
    const [data, setData] = useState<HorarioSemestreResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerarHorario = async () => {
        if (!semestre) return;
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const result = await crearHorarioCompletoSemestre(semestre, true);
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Error al crear el horario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 py-8">
            <div className="w-full max-w-2xl mx-auto mb-8">
                <label className="block mb-2 text-lg font-semibold text-gray-700">
                    Selecciona el semestre:
                </label>
                <select
                    className="w-full p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={semestre ?? ''}
                    onChange={e => setSemestre(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">-- Selecciona un semestre --</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>
                            Semestre {num}
                        </option>
                    ))}
                </select>
                <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition disabled:opacity-50"
                    onClick={handleGenerarHorario}
                    disabled={!semestre || loading}
                >
                    {loading ? 'Generando...' : 'Generar horario'}
                </button>
            </div>
            <HorarioSemestreTable data={data} loading={loading} error={error} />
        </main>
    );
}