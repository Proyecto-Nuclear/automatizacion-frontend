import React, { useState } from 'react';
import { AulaDisponible, ConsultaAulasParams, fetchAulasDisponibles } from "@/services/aulasApi";
import { reservarAula } from "@/services/programacionesApi";

interface FormularioReservaProps {
    aula: AulaDisponible;
    params: ConsultaAulasParams;
    onClose: () => void;
}

const FormularioReserva: React.FC<FormularioReservaProps> = ({
                                                                 aula,
                                                                 params,
                                                                 onClose,
                                                             }) => {
    const [docente_id, setDocenteId] = useState('');
    const [id_usuario, setIdUsuario] = useState('');
    const [fecha, setFecha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await reservarAula({
                asignatura_id: params.asignatura_id,
                aula_id: aula.id,
                fecha,
                dia: params.dia,
                semestre: params.semestre,
                hora_inicio: params.hora_inicio,
                hora_fin: params.hora_fin,
                cantidad_estudiantes: params.cantidad_estudiantes,
                docente_id,
                id_usuario,
            });
            setSuccess('Aula reservada!');
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("Error al reservar aula");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 80,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                border: '1px solid #aaa',
                padding: 24,
                zIndex: 1100,
                minWidth: 320,
                boxShadow: '0 2px 8px #0002',
            }}
        >
            <h4>Reservar aula: {aula.nombre}</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div><b>Día:</b> {params.dia}</div>
                <div><b>Hora inicio:</b> {params.hora_inicio}</div>
                <div><b>Hora fin:</b> {params.hora_fin}</div>
                <div><b>Capacidad requerida:</b> {params.cantidad_estudiantes}</div>
                <div><b>Semestre:</b> {params.semestre}</div>
                <input
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    type="date"
                    required
                    placeholder="Fecha"
                />
                <input
                    value={docente_id}
                    onChange={e => setDocenteId(e.target.value)}
                    required
                    placeholder="ID Docente"
                />
                <input
                    value={id_usuario}
                    onChange={e => setIdUsuario(e.target.value)}
                    required
                    placeholder="ID Usuario"
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Reservando...' : 'Reservar'}
                    </button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export function ConsultaAulasDisponibles() {
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
    const [aulaAReservar, setAulaAReservar] = useState<AulaDisponible | null>(null);
    const [paramsReserva, setParamsReserva] = useState<ConsultaAulasParams | null>(null);

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
            const res = await fetchAulasDisponibles(form);

            console.log('Respuesta de la API:', res); // <--- Nuevo

            let lista: AulaDisponible[] = [];
            if (Array.isArray(res)) {
                lista = res;
            } else if (res && Array.isArray(res.aulas)) {
                // Si tu backend responde { aulas: [...] }
                lista = res.aulas;
            } else {
                // Si nada de lo anterior, muestra error y el resultado
                setError('Respuesta inesperada del servidor');
                console.error('Respuesta inesperada de la API:', res);
                lista = [];
            }
            setAulas(lista);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            setAulas([]);
        } finally {
            setLoading(false);
        }
    };

    function handleReservarClick(aula: AulaDisponible) {
        setAulaAReservar(aula);
        setParamsReserva(form);
    }

    function handleCerrarReserva() {
        setAulaAReservar(null);
        setParamsReserva(null);
    }

    const dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    return (
        <div>
            <h3>Consultar aulas disponibles</h3>
            <form onSubmit={handleSubmit}
                  style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: "10px", maxWidth: 350 }}>
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
                        {dias.map(dia => (
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
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Capacidad</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ubicación</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(aulas) && aulas.length > 0 ? (
                    aulas.map((aula) => (
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
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                <button onClick={() => handleReservarClick(aula)}>
                                    Reservar
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    !loading && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>
                                No hay aulas disponibles para ese horario.
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>

            {aulaAReservar && paramsReserva && (
                <FormularioReserva
                    aula={aulaAReservar}
                    params={paramsReserva}
                    onClose={handleCerrarReserva}
                />
            )}
        </div>
    );
}