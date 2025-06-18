export interface AulaDisponible {
    id: string;
    nombre: string;
    capacidad: number;
}

export interface ConsultaAulasParams {
    asignatura_id: string;
    hora_inicio: string;
    hora_fin: string;
    dia: string;
    cantidad_estudiantes: number;
    semestre: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAulasDisponibles(params: ConsultaAulasParams): Promise<AulaDisponible[]> {
    const res = await fetch(`${baseUrl}/api/v1/aulas-disponibles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Error al consultar aulas disponibles');
    return res.json();
}