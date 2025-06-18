// src/components/CalendarView.tsx
"use client";
import { useState } from "react";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

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

    // Ejemplo de reservas (puedes reemplazarlo por tus datos reales)
    const reservas = [
        { day: 5, aula: "101", hora: "10:00" },
        { day: 12, aula: "202", hora: "14:00" },
        { day: 18, aula: "303", hora: "08:00" },
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

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700"
                >
                    ←
                </button>
                <span className="font-semibold text-lg text-blue-800 dark:text-white">
          {today.toLocaleString("es-ES", { month: "long" })} {currentYear}
        </span>
                <button
                    onClick={nextMonth}
                    className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700"
                >
                    →
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((d) => (
                    <div key={d} className="font-bold text-blue-800 dark:text-blue-100">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
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
                        return (
                            <div
                                key={day}
                                className={`relative h-14 flex flex-col items-center justify-center rounded-lg border
                  ${isToday ? "border-blue-700 bg-blue-100 dark:bg-blue-900" : "border-blue-50 dark:border-blue-800"}
                  ${reserva ? "bg-green-100 dark:bg-green-900 border-green-400" : ""}
                `}
                            >
                                <span className="font-semibold">{day}</span>
                                {reserva && (
                                    <span className="text-xs text-green-700 dark:text-green-300 mt-1">
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