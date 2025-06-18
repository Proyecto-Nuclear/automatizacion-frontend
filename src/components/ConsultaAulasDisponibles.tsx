import React, { useState } from 'react';
import {AulaDisponible, ConsultaAulasParams, fetchAulasDisponibles} from "@/services/aulasApi";


const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default function ConsultaAulasDisponibles() {
    const [form, setForm] = useState<ConsultaAulasParams>({
        asignatura_id: '',
        hora_inicio: '',
        hora_fin: '',
        dia: '',
        cantidad_estudiantes: 0,
        semestre: 1,
    });
    const [aulas, setAulas] = useState<AulaDisponible[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'cantidad_estudiantes' || name === 'semestre'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetchAulasDisponibles(form); // res debe ser AulaDisponible[]
            setAulas(res);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Consultar aulas disponibles</h3>
            <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: "10px", maxWidth: 350 }}>
                <label>
                    Asignatura ID:
                    <input
                        name="asignatura_id"
                        value={form.asignatura_id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Día:
                    <select name="dia" value={form.dia} onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        {dias.map((dia) => (
                            <option key={dia} value={dia}>
                                {dia}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Hora inicio:
                    <input
                        name="hora_inicio"
                        type="time"
                        value={form.hora_inicio}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Hora fin:
                    <input
                        name="hora_fin"
                        type="time"
                        value={form.hora_fin}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cantidad de estudiantes:
                    <input
                        name="cantidad_estudiantes"
                        type="number"
                        value={form.cantidad_estudiantes}
                        min={1}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Semestre:
                    <input
                        name="semestre"
                        type="number"
                        value={form.semestre}
                        min={1}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: 16,
                }}
            >
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                        Capacidad
                    </th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                        Ubicación
                    </th>
                </tr>
                </thead>
                <tbody>
                {aulas.map((aula) => (
                    <tr key={aula.id}>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                            {aula.id}
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                            {aula.nombre}
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                            {aula.capacidad}
                        </td>
                    </tr>
                ))}
                {aulas.length === 0 && !loading && (
                    <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>
                            No hay aulas disponibles para ese horario.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}