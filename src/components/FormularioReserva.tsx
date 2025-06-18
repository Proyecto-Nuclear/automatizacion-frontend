import React, { useState } from "react";
import {AulaDisponible, ConsultaAulasParams} from "@/services/aulasApi";
import {reservarAula} from "@/services/programacionesApi";


interface FormularioReservaProps {
    aula: AulaDisponible;
    params: ConsultaAulasParams;
    onClose: () => void;
}

export const FormularioReserva: React.FC<FormularioReservaProps> = ({
                                                                        aula,
                                                                        params,
                                                                        onClose,
                                                                    }) => {
    const [docente_id, setDocenteId] = useState("");
    const [id_usuario, setIdUsuario] = useState("");
    const [fecha, setFecha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await reservarAula({
                asignatura_id: params.asignatura_id,
                aula_id: aula.id,
                fecha,
                dia: params.dia,
                semestre: params.semestre,
                hora_inicio: params.hora_inicio,
                hora_fin: params.hora_fin,
                cantidad_estudiantes: params.cantidad_estudiantes,
                docente_id,
                id_usuario,
            });
            setSuccess("Aula reservada!");
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("Error al reservar aula");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 80,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#fff",
                border: "1px solid #aaa",
                padding: 24,
                zIndex: 1100,
                minWidth: 320,
                boxShadow: "0 2px 8px #0002",
            }}
        >
            <h4>Reservar aula: {aula.nombre}</h4>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                    <b>Día:</b> {params.dia}
                </div>
                <div>
                    <b>Hora inicio:</b> {params.hora_inicio}
                </div>
                <div>
                    <b>Hora fin:</b> {params.hora_fin}
                </div>
                <div>
                    <b>Capacidad requerida:</b> {params.cantidad_estudiantes}
                </div>
                <div>
                    <b>Semestre:</b> {params.semestre}
                </div>
                <input
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    type="date"
                    required
                    placeholder="Fecha"
                />
                <input
                    value={docente_id}
                    onChange={(e) => setDocenteId(e.target.value)}
                    required
                    placeholder="ID Docente"
                />
                <input
                    value={id_usuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                    required
                    placeholder="ID Usuario"
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Reservando..." : "Reservar"}
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioReserva;