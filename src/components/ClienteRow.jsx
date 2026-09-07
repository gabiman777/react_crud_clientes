//← recibe: cliente, onBorrarCliente, onEditarCliente, que son funciones que se ejecutarán cuando se realicen las respectivas acciones
function ClienteRow({ cliente, onBorrarCliente, onEditarCliente }) {

    function handleBorrarClick() {
        if (window.confirm(`¿Está seguro de que desea borrar al cliente ${cliente.nombre}?`)) {
            onBorrarCliente(cliente.id)
        }
    }
    return (
        <tr>
            <td>{cliente.nombre}</td>
            <td>{cliente.email}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.empresa}</td>
            <td>{cliente.activo ? 'Sí' : 'No'}</td>
            <td>
                <button onClick={() => onEditarCliente(cliente)}>Editar</button>
                <button onClick={() => handleBorrarClick(cliente.id)}>Borrar</button>
            </td>
        </tr>
    )
}

export default ClienteRow