import CalendarView from "@/components/CalendarView";
import MapaAulas from "@/components/MapaAulas";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white min-h-screen p-4">
            {/* Calendario */}
            <section className="md:col-span-2 bg-white rounded-lg shadow-lg border border-gray-200 p-6 min-h-[350px]">
                <h2 className="font-semibold text-xl text-blue-700 mb-4">Calendario de Reservas</h2>
                <CalendarView />
            </section>

            {/* Eventos próximos */}
            <section className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col gap-4">
                <h2 className="font-semibold text-xl text-blue-700 mb-2">Eventos Próximos</h2>
                <ul className="flex flex-col gap-2">
                    <li className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-gray-700">Reserva Aula 101 - 10:00 AM</span>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
                            Ver
                        </button>
                    </li>
                    <li className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-gray-700">Reserva Aula 205 - 2:00 PM</span>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
                            Ver
                        </button>
                    </li>
                    <li className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-gray-700">Reserva Aula 302 - 4:00 PM</span>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
                            Ver
                        </button>
                    </li>
                </ul>
            </section>

            {/* Mapa de aulas */}
            <section className="md:col-span-3 bg-white rounded-lg shadow-lg border border-gray-200 p-6 mt-8">
                <h2 className="font-semibold text-xl text-blue-700 mb-4">Mapa de Aulas</h2>
                <MapaAulas />
            </section>
        </div>
    );
}