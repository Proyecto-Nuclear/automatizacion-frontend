// src/components/MapaAulas.tsx

// Ejemplo de datos de aulas (puedes reemplazarlo por tus datos reales)
const aulas = [
    { nombre: "101", estado: "libre" },
    { nombre: "102", estado: "ocupada" },
    { nombre: "103", estado: "mantenimiento" },
    { nombre: "104", estado: "libre" },
    { nombre: "201", estado: "ocupada" },
    { nombre: "202", estado: "libre" },
    { nombre: "203", estado: "ocupada" },
    { nombre: "204", estado: "libre" },
];

const estadoColor = {
    libre: "bg-green-100 text-green-800 border-green-400 dark:bg-green-900 dark:text-green-200",
    ocupada: "bg-red-100 text-red-800 border-red-400 dark:bg-red-900 dark:text-red-200",
    mantenimiento: "bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-yellow-900 dark:text-yellow-200",
};

const estadoLabel = {
    libre: "Libre",
    ocupada: "Ocupada",
    mantenimiento: "Mantenimiento",
};

export default function MapaAulas() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {aulas.map((aula) => (
                    <div
                        key={aula.nombre}
                        className={`flex flex-col items-center justify-center border-2 rounded-lg p-4 h-24 shadow transition ${estadoColor[aula.estado]}`}
                    >
                        <span className="font-bold text-lg">Aula {aula.nombre}</span>
                    </div>
                ))}
            </div>
            {/* Leyenda */}
            <div className="flex gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-green-400 inline-block" />
                    <span className="text-black">Libre</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-red-400 inline-block" />
                    <span className="text-black">Ocupada</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-yellow-400 inline-block" />
                    <span className="text-black">Mantenimiento</span>
                </div>
            </div>
        </div>
    );
}