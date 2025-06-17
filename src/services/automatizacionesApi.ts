import { Automatizacion } from '../types/Automatizacion';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAutomatizaciones() {
    const res = await fetch(`${baseUrl}/automatizaciones`);
    if (!res.ok) throw new Error('Error al cargar automatizaciones');
    return res.json();
}

export async function crearAutomatizacion(data: Omit<Automatizacion, 'id' | 'fecha_creacion'>) {
    const res = await fetch(`${baseUrl}/automatizaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear automatización');
    return res.json();
}

export async function editarAutomatizacion(id: string, data: Omit<Automatizacion, 'id' | 'fecha_creacion'>) {
    const res = await fetch(`${baseUrl}/automatizaciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al editar automatización');
    return res.json();
}

export async function eliminarAutomatizacion(id: string) {
    const res = await fetch(`${baseUrl}/automatizaciones/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar automatización');
    return res.json();
}