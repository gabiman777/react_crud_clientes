function ClienteRow({ cliente, onBorrarCliente }) {
    return (
        <tr>
            <td>{cliente.nombre}</td>
            <td>{cliente.email}</td>
            <td>{cliente.empresa}</td>
            <td>{cliente.activo ? 'Sí' : 'No'}</td>
            <td>
                <button onClick={() => onBorrarCliente(cliente.id)}>Borrar</button>
            </td>
        </tr>
    )
}

export default ClienteRow