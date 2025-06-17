export async function fetchAutomatizaciones() {
    const res = await fetch('http://localhost:4000/api/automatizaciones');
    if (!res.ok) throw new Error('Error al cargar automatizaciones');
    return res.json();
}

export async function eliminarAutomatizacion(id: number) {
    const res = await fetch(`http://localhost:4000/api/automatizaciones/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar automatización');
    return res.json();
}