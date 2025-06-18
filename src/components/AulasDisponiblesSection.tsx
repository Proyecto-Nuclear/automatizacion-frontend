import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface Sede {
    id: string;
    nombre: string;
}
export interface Recurso {
    id: string;
    nombre: string;
}
export interface AulaDisponible {
    id: string;
    nombre: string;
    tipo: string;
    capacidad: number;
    sede: Sede;
    recursos: Recurso[];
}

export interface ReservaResponse {
    success: boolean;
    message: string;
    reserva?: {
        id: string;
        aula_id: string;
        docente_id: string;
        asignatura_id: string;
        fecha: string;
        hora_inicio: string;
        hora_fin: string;
        id_usuario: string;
        fecha_creacion: string;
        hora_creacion: string;
        estado: string;
        dia: string;
        semestre: number;
    };
}

interface Props {
    aulas: AulaDisponible[];
    datosConsulta: {
        asignatura_id: string;
        hora_inicio: string;
        hora_fin: string;
        dia: string;
        semestre: number;
        cantidad_estudiantes: number;
    };
}

const initialReservaData = {
    fecha: '',
    docente_id: '',
    id_usuario: '',
};

export default function AulasDisponiblesSection({ aulas, datosConsulta }: Props) {
    const [showForm, setShowForm] = useState<string | null>(null);
    const [reservaData, setReservaData] = useState(initialReservaData);
    const [reservaResult, setReservaResult] = useState<ReservaResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleReservaInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReservaData(prev => ({ ...prev, [name]: value }));
    };

    const handleReservar = (aula_id: string) => {
        setShowForm(aula_id);
        setReservaResult(null);
        setError(null);
        setReservaData(initialReservaData);
    };

    const handleReservaSubmit = async (e: FormEvent, aula_id: string) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setReservaResult(null);

        const payload = {
            ...datosConsulta,
            aula_id,
            fecha: reservaData.fecha,
            docente_id: reservaData.docente_id,
            id_usuario: reservaData.id_usuario,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/reservar-aula', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data: ReservaResponse = await response.json();
            setReservaResult(data);
            if (data.success) {
                setShowForm(null);
                setReservaData(initialReservaData); // Limpiar formulario
            }
        } catch (err: unknown) {
            setError('Error al reservar el aula');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-green-50 p-4 rounded">
            <strong>Aulas Disponibles</strong>
            {aulas.length === 0 && <div className="text-gray-500 mt-2">No hay aulas disponibles.</div>}
            {aulas.map((aula) => (
                <div key={aula.id} className="mt-2 border-b pb-2">
                    <div>
                        <strong>{aula.nombre}</strong> ({aula.tipo})<br />
                        Capacidad: {aula.capacidad} | Sede: {aula.sede.nombre}<br />
                        Recursos: {aula.recursos.map((r) => r.nombre).join(', ') || 'Ninguno'}
                    </div>
                    <button
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleReservar(aula.id)}
                    >
                        Reservar
                    </button>
                    {showForm === aula.id && (
                        <form
                            className="mt-2 bg-white p-2 rounded shadow space-y-2"
                            onSubmit={(e) => handleReservaSubmit(e, aula.id)}
                        >
                            <input
                                type="date"
                                name="fecha"
                                value={reservaData.fecha}
                                onChange={handleReservaInput}
                                required
                                className="border p-1 rounded w-full"
                            />
                            <input
                                type="text"
                                name="docente_id"
                                value={reservaData.docente_id}
                                onChange={handleReservaInput}
                                placeholder="ID Docente"
                                required
                                className="border p-1 rounded w-full"
                            />
                            <input
                                type="text"
                                name="id_usuario"
                                value={reservaData.id_usuario}
                                onChange={handleReservaInput}
                                placeholder="ID Usuario"
                                required
                                className="border p-1 rounded w-full"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                                {loading ? 'Reservando...' : 'Confirmar Reserva'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(null)}
                                className="ml-2 text-gray-500 hover:underline"
                            >
                                Cancelar
                            </button>
                            {error && <div className="text-red-600">{error}</div>}
                        </form>
                    )}
                    {reservaResult && reservaResult.reserva?.aula_id === aula.id && (
                        <div className={`mt-2 p-2 rounded ${reservaResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {reservaResult.message}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}