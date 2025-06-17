export async function fetchAutomatizaciones() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/automatizaciones');
    if (!res.ok) throw new Error('Error al cargar automatizaciones');
    return res.json();
}

export async function eliminarAutomatizacion(id: number) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/automatizaciones/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar automatización');
    return res.json();
}

export async function crearAutomatizacion(data: { nombre: string; estado: string }) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/automatizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear automatización');
    return res.json();
}