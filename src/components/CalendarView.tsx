"use client";
import { useState, useEffect } from "react";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const palette = {
    azul: "#1877f2",
    verde: "#0a6534",
    blanco: "#fff",
    negro: "#222",
    borde: "#1877f2",
};

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

// Función para parsear fechas en diferentes formatos
function parseFecha(fechaStr: string): Date {
    // Formato "YYYY-MM-DD"
    if (fechaStr.includes('-') && fechaStr.split('-')[0].length === 4) {
        return new Date(fechaStr + "T00:00:00");
    }
    // Formato "DD/MM/YYYY"
    if (fechaStr.includes('/')) {
        const [day, month, year] = fechaStr.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    // Fallback
    return new Date(fechaStr);
}

type Horario = {
    horario_id: string;
    programacion_id: string;
    aula_id: string;
    asignatura_id: string;
    docente_id: string;
    fecha: string;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    semestre: number;
    estado: string;
    fecha_confirmacion: string;
};

export default function CalendarView() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [semestre, setSemestre] = useState(2);
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [loading, setLoading] = useState(false);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // Carga los horarios al cambiar el semestre
    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/v1/horarios-por-semestre/${semestre}`)
            .then((res) => res.json())
            .then((data) => {
                setHorarios(Array.isArray(data.horarios) ? data.horarios : []);
            })
            .catch(() => setHorarios([]))
            .finally(() => setLoading(false));
    }, [semestre]);

    function prevMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    function nextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    const monthLabel = new Date(currentYear, currentMonth, 1).toLocaleString("es-ES", { month: "long" });

    // Mapea los horarios a los días del mes actual
    const reservasPorDia: Record<number, Horario[]> = {};
    horarios.forEach((horario) => {
        try {
            const fechaHorario = parseFecha(horario.fecha);
            if (
                fechaHorario.getFullYear() === currentYear &&
                fechaHorario.getMonth() === currentMonth
            ) {
                const day = fechaHorario.getDate();
                if (!reservasPorDia[day]) reservasPorDia[day] = [];
                reservasPorDia[day].push(horario);
            }
        } catch (error) {
            console.warn(`Error parsing fecha: ${horario.fecha}`, error);
        }
    });

    return (
        <div>
            {/* Filtro de semestre */}
            <div className="flex items-center gap-4 mb-4">
                <label htmlFor="semestre" className="font-semibold text-blue-700">
                    Filtrar por semestre:
                </label>
                <select
                    id="semestre"
                    value={semestre}
                    onChange={e => setSemestre(Number(e.target.value))}
                    className="border border-blue-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    {[1,2,3,4,5,6,7,8,9,10].map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                {loading && <span className="text-blue-700">Cargando...</span>}
            </div>

            {/* Controles del calendario */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    style={{
                        background: palette.azul,
                        color: palette.blanco,
                        border: `2px solid ${palette.azul}`,
                        borderRadius: 6,
                        width: 36,
                        height: 36,
                        fontWeight: 700,
                        fontSize: 20,
                        transition: "background .2s",
                    }}
                >
                    ←
                </button>
                <span
                    style={{
                        color: palette.azul,
                        fontWeight: 700,
                        fontSize: 20,
                        textAlign: "center",
                        textTransform: "capitalize",
                    }}
                >
                    {monthLabel} {currentYear}
                </span>
                <button
                    onClick={nextMonth}
                    style={{
                        background: palette.azul,
                        color: palette.blanco,
                        border: `2px solid ${palette.azul}`,
                        borderRadius: 6,
                        width: 36,
                        height: 36,
                        fontWeight: 700,
                        fontSize: 20,
                        transition: "background .2s",
                    }}
                >
                    →
                </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {daysOfWeek.map((d) => (
                    <div
                        key={d}
                        style={{
                            fontWeight: 700,
                            color: palette.azul,
                            fontSize: 17,
                            padding: 3,
                            borderRadius: 4,
                        }}
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-2">
                {Array(firstDay)
                    .fill(null)
                    .map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                {Array(daysInMonth)
                    .fill(null)
                    .map((_, i) => {
                        const day = i + 1;
                        const reservas = reservasPorDia[day];
                        const isToday =
                            day === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear();

                        let bg = palette.blanco;
                        let color = palette.negro;

                        if (reservas && reservas.length > 0) {
                            bg = palette.verde;
                            color = palette.blanco;
                        } else if (isToday) {
                            bg = palette.azul;
                            color = palette.blanco;
                        }

                        return (
                            <div
                                key={day}
                                style={{
                                    background: bg,
                                    color: color,
                                    border: `2px solid ${palette.borde}`,
                                    borderRadius: 8,
                                    minHeight: 80,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: 4,
                                    position: "relative",
                                    transition: "background .2s, color .2s",
                                }}
                            >
                                <span
                                    style={{
                                        color: color,
                                        fontWeight: reservas || isToday ? 700 : 600,
                                        fontSize: 16,
                                        marginBottom: 4,
                                    }}
                                >
                                    {day}
                                </span>

                                {reservas && (
                                    <div style={{ width: "100%", fontSize: 10 }}>
                                        {reservas.slice(0, 3).map((res) => {
                                            const aulaNumero = res.aula_id.replace(/^AU0?/, "");
                                            return (
                                                <div
                                                    key={res.horario_id}
                                                    style={{
                                                        background: "rgba(0,0,0,0.15)",
                                                        color: palette.blanco,
                                                        padding: "2px 4px",
                                                        marginBottom: 2,
                                                        borderRadius: 3,
                                                        fontSize: 9,
                                                        fontWeight: 500,
                                                        textAlign: "center",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                    title={`Aula ${aulaNumero} - ${res.hora_inicio}-${res.hora_fin} - ${res.asignatura_id}`}
                                                >
                                                    Aula {aulaNumero}
                                                    <br />
                                                    {res.hora_inicio}-{res.hora_fin}
                                                </div>
                                            );
                                        })}
                                        {reservas.length > 3 && (
                                            <div
                                                style={{
                                                    fontSize: 8,
                                                    color: palette.blanco,
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                +{reservas.length - 3} más
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>

            {/* Mensaje si no hay reservas */}
            {!loading && Object.keys(reservasPorDia).length === 0 && (
                <div className="text-center mt-4 text-gray-400">
                    No hay horarios reservados para este mes y semestre.
                </div>
            )}
        </div>
    );
}