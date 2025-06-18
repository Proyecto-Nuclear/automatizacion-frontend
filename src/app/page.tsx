import CalendarView from "@/components/CalendarView";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Calendario */}
            <section className="md:col-span-2 bg-white dark:bg-blue-950 rounded-lg shadow p-6 min-h-[350px]">
                <h2 className="font-semibold text-xl text-blue-800 dark:text-white mb-4">Calendario de Reservas</h2>
                <CalendarView />
            </section>
            {/* Eventos próximos */}
            <section className="bg-white dark:bg-blue-950 rounded-lg shadow p-6 flex flex-col gap-4">
                <h2 className="font-semibold text-xl text-blue-800 dark:text-white mb-2">Eventos Próximos</h2>
                <ul className="flex flex-col gap-2">
                    <li className="flex justify-between items-center">
                        <span>Reserva Aula 101 - 10:00 AM</span>
                        <button className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-900">Ver</button>
                    </li>
                    {/* ...otros eventos */}
                </ul>
            </section>
            {/* Mapa de aulas */}
            <section className="md:col-span-3 bg-white dark:bg-blue-950 rounded-lg shadow p-6 mt-8">
                <h2 className="font-semibold text-xl text-blue-800 dark:text-white mb-4">Mapa de Aulas</h2>
                <div className="h-40 flex items-center justify-center text-gray-400 dark:text-gray-500">[Mapa visual de aulas]</div>
            </section>
        </div>
    );
}