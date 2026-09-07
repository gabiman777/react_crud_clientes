import ClienteRow from '../ClienteRow.jsx'

//← recibe: clientes, onBorrarCliente, onEditarCliente, que son funciones que se ejecutarán cuando se realicen las respectivas acciones
function ClienteList({ clientes, onBorrarCliente, onEditarCliente }) {

    if (clientes.length === 0) {
        return <p>No hay clientes registrados.</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Empresa</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente => (
                    <ClienteRow key={cliente.id} cliente={cliente}
                    onBorrarCliente={onBorrarCliente}
                    onEditarCliente ={onEditarCliente} />
                ))}
            </tbody>
        </table>
    )
}

export default ClienteList