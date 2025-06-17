export default function DetalleAutomatizacionPage({ params }: { params: { id: string } }) {
    return (
        <section>
            <h1>Detalle de Automatización</h1>
            <p>ID: {params.id}</p>
            <p>Aquí puedes ver la información detallada de la automatización seleccionada.</p>
        </section>
    );
}