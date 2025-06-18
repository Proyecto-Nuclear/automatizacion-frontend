const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Listar todas las programaciones
export async function fetchProgramaciones() {
    const res = await fetch(`${baseUrl}/programaciones`);
    if (!res.ok) throw new Error('Error al cargar programaciones');
    return res.json();
}

// Crear una nueva reserva de aula
export async function reservarAula(data: {
    asignatura_id: string;
    aula_id: string;
    fecha: string;
    dia: string;
    semestre: number;
    hora_inicio: string;
    hora_fin: string;
    cantidad_estudiantes: number;
    docente_id: string;
    id_usuario: string
}) {
    const res = await fetch(`${baseUrl}/reservar-aula`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al reservar aula');
    }
    return res.json();
}

// Cambiar el estado de una programación
export async function cambiarEstadoProgramacion(id: string, nuevo_estado: string) {
    const res = await fetch(`${baseUrl}/programaciones/${id}/estado?nuevo_estado=${nuevo_estado}`, {
        method: 'PUT',
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al cambiar estado');
    }
    return res.json();
}

// Cancelar (eliminar) una programación
export async function cancelarProgramacion(id: string) {
    const res = await fetch(`${baseUrl}/programaciones/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al cancelar programación');
    }
    return res.json();
}