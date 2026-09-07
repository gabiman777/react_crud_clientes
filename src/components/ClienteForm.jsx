import {useState} from 'react'

function ClienteForm({onCrearCliente}) {
    const[nombre, setNombre] = useState('')

    function handleSubmit(e) {
        e.preventDefault() //evitar que el navegador recargue la página
        if (nombre.trim() === '') {
            alert('El nombre es obligatorio')
            return
        }
        //enviar el nuevo cliente al componente padre
        onCrearCliente({nombre, email: '', telefono: '', empresa: '', activo: true, fechaAlta: new Date().toISOString().slice(0, 10)}) 
        setNombre('') //limpiar el campo/formulario tras crear el cliente
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nombre del cliente" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
            />
            <button type="submit">Crear Cliente</button>
        </form>
    )

}

export default ClienteForm