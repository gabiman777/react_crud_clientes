import ClienteRow from './ClienteRow'

function ClienteList({ clientes, onBorrarCliente }) {

    if (clientes.length === 0) {
        return <p>No hay clientes registrados.</p>
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Empresa</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente => (
                    <ClienteRow key={cliente.id} cliente={cliente} onBorrarCliente={onBorrarCliente} />
                ))}
            </tbody>
        </table>
    )
}

export default ClienteList