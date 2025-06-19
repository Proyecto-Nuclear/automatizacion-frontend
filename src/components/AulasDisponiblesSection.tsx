import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

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

export interface Reserva {
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
}

export interface Docente {
    id: string;
    nombre: string;
    apellido: string;
}

export interface DatosResponse {
    docentes: Docente[];
}

export interface ReservaResponse {
    success: boolean;
    message: string;
    reservas?: Reserva[];
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
    id_usuario: 'USR001',
};

function formatFecha(fechaISO: string) {
    if (!fechaISO) return '';
    const [yyyy, mm, dd] = fechaISO.split('-');
    return `${dd}/${mm}/${yyyy}`;
}

export async function getDatosBase(): Promise<DatosResponse> {
    const res = await fetch('http://127.0.0.1:8000/api/v1/datos');
    if (!res.ok) throw new Error('Error al cargar los datos base');
    return res.json();
}

export default function AulasDisponiblesSection({ aulas, datosConsulta }: Props) {
    const [showForm, setShowForm] = useState<string | null>(null);
    const [reservaData, setReservaData] = useState(initialReservaData);
    const [reservaResult, setReservaResult] = useState<{ [aulaId: string]: ReservaResponse | null }>({});
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [docentes, setDocentes] = useState<Docente[]>([]);

    useEffect(() => {
        getDatosBase()
            .then(data => setDocentes(data.docentes))
            .catch(() => setError('No se pudo cargar la lista de docentes'));
    }, []);

    const handleReservaInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReservaData(prev => ({ ...prev, [name]: value }));
    };

    const handleReservar = (aula_id: string) => {
        setShowForm(aula_id);
        setError(null);
        setReservaData(initialReservaData);
    };

    const handleReservaSubmit = async (e: FormEvent, aula_id: string) => {
        e.preventDefault();
        setLoading(aula_id);
        setError(null);

        const payload = {
            ...datosConsulta,
            aula_id,
            fecha: formatFecha(reservaData.fecha),
            docente_id: reservaData.docente_id,
            id_usuario: reservaData.id_usuario,
        };

        console.log('Payload reserva:', payload);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/reservar-aula', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data: ReservaResponse = await response.json();
            setReservaResult(prev => ({ ...prev, [aula_id]: data }));
            if (data.success) {
                setShowForm(null);
                setReservaData(initialReservaData);
            }
        } catch (err: unknown) {
            setError('Error al reservar el aula');
        } finally {
            setLoading(null);
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
                            <select
                                name="docente_id"
                                value={reservaData.docente_id}
                                onChange={handleReservaInput}
                                required
                                className="border p-1 rounded w-full"
                            >
                                <option value="">Selecciona un docente</option>
                                {docentes.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                        {doc.nombre} {doc.apellido}
                                    </option>
                                ))}
                            </select>
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
                                disabled={loading === aula.id}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                                {loading === aula.id ? 'Reservando...' : 'Confirmar Reserva'}
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
                    {reservaResult[aula.id] && (
                        <div className={`mt-2 p-2 rounded ${reservaResult[aula.id]?.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <div className="font-semibold">{reservaResult[aula.id]?.message}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}