import React, { useState } from 'react';

type Props = {
    onSubmit: (data: unknown) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
};

export default function FormReservarAula({ onSubmit, onCancel, loading }: Props) {
    // Aquí define los campos que requiere tu backend para reservar aula
    const [form, setForm] = useState({
        asignatura_id: '',
        aula_id: '',
        hora_inicio: '',
        hora_fin: '',
        dia: '',
        cantidad_estudiantes: '',
        semestre: '',
        id_usuario: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Convierte los campos numéricos
        const payload = {
            ...form,
            cantidad_estudiantes: Number(form.cantidad_estudiantes),
            semestre: Number(form.semestre),
        };
        await onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Asignatura ID:
                <input name="asignatura_id" value={form.asignatura_id} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Aula ID:
                <input name="aula_id" value={form.aula_id} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Día:
                <input name="dia" value={form.dia} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Hora inicio:
                <input name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required placeholder="Ej: 08:00" />
            </label>
            <br />
            <label>
                Hora fin:
                <input name="hora_fin" value={form.hora_fin} onChange={handleChange} required placeholder="Ej: 10:00" />
            </label>
            <br />
            <label>
                Cantidad estudiantes:
                <input
                    name="cantidad_estudiantes"
                    type="number"
                    value={form.cantidad_estudiantes}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Semestre:
                <input
                    name="semestre"
                    type="number"
                    value={form.semestre}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Usuario ID:
                <input name="id_usuario" value={form.id_usuario} onChange={handleChange} required />
            </label>
            <br />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                <button type="button" onClick={onCancel} disabled={loading}>Cancelar</button>
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}