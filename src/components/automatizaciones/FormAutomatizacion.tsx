import React, { useState } from 'react';
import { Automatizacion } from '../../types/Automatizacion';

type Props = {
    initial?: Partial<Omit<Automatizacion, 'id' | 'fecha_creacion'>>;
    onSubmit: (data: Omit<Automatizacion, 'id' | 'fecha_creacion'>) => void;
    onCancel: () => void;
    loading?: boolean;
};

export default function FormAutomatizacion({ initial = {}, onSubmit, onCancel, loading }: Props) {
    const [form, setForm] = useState<Omit<Automatizacion, 'id' | 'fecha_creacion'>>({
        nombre: initial.nombre || '',
        estado: initial.estado || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Estado:
                <input name="estado" value={form.estado} onChange={handleChange} required />
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