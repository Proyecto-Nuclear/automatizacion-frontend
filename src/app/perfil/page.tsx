"use client";

import Image from "next/image";

export default function Perfil() {
    // Datos de ejemplo, reemplaza por tus datos reales
    const usuario = {
        nombre: "Santiago Rincon Martinez",
        ubicacion: "Armenia-Quindio",
        web: "https://unihumboldt.edu.co",
        bio: "Coordinador Academico",
        email: "coordinacioningenieriasoftware@unihumboldt.edu",
        telefono: "+57 3102507751",
        idiomas: ["Español", "Inglés"],
        social: [
            { icon: "linkedin", url: "#" },
            { icon: "github", url: "#" },
        ],
        cursos: [
            {
                nombre: "Desarrollo de aplicaciones web con Angular",
                horas: 124,
                estado: "superado",
                fecha: "viernes, 27 de febrero de 2015",
            },
            {
                nombre: "Coordinador Academico",
                estado: "Activo",
                fecha: "jueves, 28 de mayo de 2015",
            },
        ],
        resumen: {
            alumnoDesde: "2015",
            cursos: 2,
            horas: 457,
        },
        foto: "/profile-photo.jpg", // Cambia por la ruta real de tu foto
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-10">
            {/* Columna izquierda */}
            <aside className="w-full md:w-1/3 flex flex-col items-center bg-white dark:bg-blue-950 rounded-lg shadow p-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-4">
                    <Image
                        src={usuario.foto}
                        alt={usuario.nombre}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="bg-blue-800 text-white rounded-lg px-4 py-3 text-sm w-full mb-6">
                    <div>Alumno desde {usuario.resumen.alumnoDesde}</div>
                    <div>{usuario.resumen.cursos} Cursos</div>
                    <div>{usuario.resumen.horas} Horas de formación</div>
                </div>
                <div className="w-full mb-6">
                    <h3 className="font-semibold text-blue-800 dark:text-white mb-2">Contacto</h3>
                    <div className="text-sm mb-1">
                        <span className="font-semibold">E-Mail:</span>{" "}
                        <a href={`mailto:${usuario.email}`} className="text-blue-700 hover:underline">{usuario.email}</a>
                    </div>
                    <div className="text-sm mb-1">
                        <span className="font-semibold">Teléfono:</span> {usuario.telefono}
                    </div>
                </div>
                <div className="w-full mb-6">
                    <h3 className="font-semibold text-blue-800 dark:text-white mb-2">Idiomas</h3>
                    <div className="text-sm">{usuario.idiomas.join(", ")}</div>
                </div>
                <div className="w-full">
                    <h3 className="font-semibold text-blue-800 dark:text-white mb-2">Social</h3>
                    <div className="flex gap-3">
                        <a href="#" className="text-blue-700 hover:text-blue-900" title="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                        </a>
                        <a href="#" className="text-blue-700 hover:text-blue-900" title="GitHub">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5c-6.62 0-12 5.38-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.823 1.096.823 2.21 0 1.595-.015 2.88-.015 3.27 0 .32.216.694.825.576 4.765-1.587 8.2-6.086 8.2-11.385 0-6.62-5.38-12-12-12z"/></svg>
                        </a>
                    </div>
                </div>
            </aside>

            {/* Columna derecha */}
            <main className="flex-1">
                <h1 className="text-2xl font-bold text-blue-800 dark:text-white mb-1">{usuario.nombre}</h1>
                <div className="text-gray-500 dark:text-gray-300 mb-1">{usuario.ubicacion}</div>
                <div className="text-blue-700 dark:text-blue-200 mb-4">{usuario.web}</div>
                <div className="mb-8 text-gray-700 dark:text-gray-200">{usuario.bio}</div>

                <h2 className="text-lg font-semibold text-blue-800 dark:text-white mb-4">Cursos realizados en campusMVP</h2>
                <div className="flex flex-col gap-4">
                    {usuario.cursos.map((curso, idx) => (
                        <div key={idx} className="bg-white dark:bg-blue-900 border border-gray-200 dark:border-blue-800 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-blue-800 dark:text-white">{curso.nombre}</div>
                                <span className="text-xs text-gray-500">{curso.horas} Horas</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                {curso.estado === "superado" ? (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Superado</span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">En curso</span>
                                )}
                                <span className="text-xs text-gray-500">{curso.fecha}</span>
                            </div>
                            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                                Ver en detalle
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}