export interface Asignatura {
    id: string;
    nombre: string;
    estado: string;
    duracion: string;
    semestre: number;
    creditos: number;
    descripcion: string;
    requiereRecursos: string[];
    tipo: string;
}

export interface DatosResponse {
    asignaturas: Asignatura[];
    aulas: never[];
    docentes: never[];
    recursos: never[];
    sedes: never[];
}

export async function getDatosBase(): Promise<DatosResponse> {
    const res = await fetch('http://127.0.0.1:8000/api/v1/datos');
    if (!res.ok) throw new Error('Error al cargar los datos base');
    return res.json();
}