import {useState} from 'react'

//← recibe: onCrear Cliente, que es una función que se ejecutará cuando se cree un nuevo cliente
function ClienteForm({onCrearCliente}) {
    const[nombre, setNombre] = useState('')
    const[email, setEmail] = useState('')
    const[empresa, setEmpresa] = useState('')
    const[telefono, setTelefono] = useState('')

    function handleSubmit(e) {
        e.preventDefault() //avoids browser reloads page
        
        if (nombre.trim() === '') {
            alert('El nombre es obligatorio') //TODO. cambiar por mensaje en la página en un div al lado o debajo del botón "Crear cliente"
            return
        }
        
        //send new client to parent component: App
        onCrearCliente({nombre, email, telefono: '', empresa, activo: true, fechaAlta: new Date().toISOString().slice(0, 10)}) 
        //clean fields/form after new client be created
        setNombre('') 
        setEmail('')
        setEmpresa('')
        setTelefono('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nombre del cliente" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Email del cliente" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Empresa del cliente" 
                value={empresa} 
                onChange={(e) => setEmpresa(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Teléfono del cliente" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
            />
            <button type="submit">Crear Cliente</button>
        </form>
    )

}

export default ClienteForm