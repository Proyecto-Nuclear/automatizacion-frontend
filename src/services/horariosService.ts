// src/services/horariosService.ts

export interface Docente {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    cedula_ciudadania: string;
    area_especialidad: string;
    preferencias: string[];
    estado: string;
}

export interface Aula {
    id: string;
    nombre: string;
    estado: string;
    codigo: string;
    descripcion: string;
    tipo: string;
    capacidad: number;
    id_sede: string;
    id_recursos: string[];
}

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

export interface Sede {
    id: string;
    nombre: string;
    estado: string;
    direccion: string;
    telefono: string;
    cantidad_aulas: number;
    ciudad: string;
    departamento: string;
}

export interface Horario {
    id: string;
    tipo: string;
    docente: Docente;
    aula: Aula;
    asignatura: Asignatura;
    sede: Sede;
    grupo: any;
    start_time: string;
    end_time: string;
    dia: string;
    modalidad: string;
    estado: string;
    created_at: string;
    updated_at: string;
}

export interface HorarioSemestreResponse {
    success: boolean;
    semestre: number;
    total_horarios: number;
    horarios: Horario[];
    errores: any[];
    estadisticas: {
        estadisticas: {
            horarios_creados: number;
            validaciones_exitosas: number;
            validaciones_fallidas: number;
            restricciones_violadas: Record<string, any>;
            tipos_horarios_creados: Record<string, any>;
        };
    };
    validacion_conjunto: string;
}

export async function crearHorarioCompletoSemestre(
    semestre: number,
    validarConjunto: boolean = true
): Promise<HorarioSemestreResponse> {
    const res = await fetch(
        `http://127.0.0.1:8000/api/v1/crear-horario-completo-semestre/${semestre}?validar_conjunto=${validarConjunto}`,
        {
            method: 'POST', // Cambia a POST si el endpoint lo requiere, si es GET déjalo como GET
        }
    );
    if (!res.ok) throw new Error('Error al crear el horario del semestre');
    return res.json();
}