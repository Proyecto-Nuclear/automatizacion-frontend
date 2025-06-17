export default function EditarAutomatizacionPage({ params }: { params: { id: string } }) {
    return (
        <section>
            <h1>Editar Automatización</h1>
            <p>Editando automatización con ID: {params.id}</p>
        </section>
    );
}