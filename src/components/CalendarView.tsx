"use client";
import { useState } from "react";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Paleta basada en tu imagen y aclaraciones
const palette = {
    azul: "#1877f2",
    verde: "#0a6534",
    blanco: "#fff",
    negro: "#222", // para mejor contraste que el #000 puro
    borde: "#1877f2",
};

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export default function CalendarView() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // Ejemplo de reservas
    const reservas = [
        { day: 5, aula: "101", hora: "10:00" },
        { day: 12, aula: "202", hora: "14:00" },
        { day: 20, aula: "103", hora: "08:00" },
    ];

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

    return (
        <div>
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
                        const reserva = reservas.find((r) => r.day === day);
                        const isToday =
                            day === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear();

                        // Fondo azul para el día seleccionado (hoy), verde para reservados, blanco para normales
                        let bg = palette.blanco;
                        let color = palette.negro;
                        if (reserva) {
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
                                    height: 56,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: reserva || isToday ? 700 : 500,
                                    fontSize: 16,
                                    position: "relative",
                                    transition: "background .2s, color .2s",
                                }}
                            >
                <span
                    style={{
                        color: color,
                        fontWeight: reserva || isToday ? 700 : 600,
                        fontSize: 17,
                    }}
                >
                  {day}
                </span>
                                {reserva && (
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: palette.blanco,
                                            marginTop: 2,
                                            borderRadius: 3,
                                            padding: "0 4px",
                                            fontWeight: 500,
                                            background: "rgba(0,0,0,.10)",
                                            letterSpacing: 0.2,
                                        }}
                                    >
                    Aula {reserva.aula}
                  </span>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}