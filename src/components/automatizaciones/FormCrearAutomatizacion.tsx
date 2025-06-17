import React, { useState, useEffect } from 'react';

type Props = {
    onSubmit: (data: { nombre: string; estado: string }) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    initialValues?: { nombre: string; estado: string };
};

export default function FormCrearAutomatizacion({
                                                    onSubmit,
                                                    onCancel,
                                                    loading,
                                                    initialValues,
                                                }: Props) {
    const [nombre, setNombre] = useState(initialValues?.nombre || '');
    const [estado, setEstado] = useState(initialValues?.estado || 'Activa');

    useEffect(() => {
        setNombre(initialValues?.nombre || '');
        setEstado(initialValues?.estado || 'Activa');
    }, [initialValues]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ nombre, estado });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
                <label>
                    Nombre:<br />
                    <input
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                        style={{ width: '100%' }}
                        placeholder="Ej: Enviar reporte mensual"
                    />
                </label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>
                    Estado:<br />
                    <select
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                        style={{ width: '100%' }}
                    >
                        <option value="Activa">Activa</option>
                        <option value="Inactiva">Inactiva</option>
                    </select>
                </label>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={onCancel} disabled={loading}>Cancelar</button>
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}