import {useState} from 'react'

//← recibe: onCrear Cliente, que es una función que se ejecutará cuando se cree un nuevo cliente
function ClienteForm({onCrearCliente}) {
    const[nombre, setNombre] = useState('')
    const[email, setEmail] = useState('')
    const[empresa, setEmpresa] = useState('')
    const[telefono, setTelefono] = useState('')
    const[activo, setActivo] = useState(true) //by default, new clients are active

    function handleSubmit(e) {
        e.preventDefault() //avoids browser reloads page
        
        if (nombre.trim() === '') {
            alert('El nombre es obligatorio') //TODO. cambiar por mensaje en la página en un div al lado o debajo del botón "Crear cliente"
            return
        }
        
        //send new client to parent component: App
        onCrearCliente({nombre, email, telefono, empresa, activo, fechaAlta: new Date().toISOString().slice(0, 10)}) 
        
        //reset fields of form after new client be created
        setNombre('') 
        setEmail('')
        setEmpresa('')
        setTelefono('')
        setActivo(true)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input 
                    type="text" 
                    placeholder="Nombre del cliente" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                />
            </label>

            <label>
                Email:
                <input 
                    type="email" 
                    placeholder="Email del cliente" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </label>

            <label>
                Empresa:
                <input 
                    type="text" 
                value={empresa} 
                onChange={(e) => setEmpresa(e.target.value)} 
            />
            </label>
            <label>
                Teléfono:
                <input 
                    type="tel" 
                    placeholder="Teléfono del cliente" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                />
            </label>
            <label>
            <input 
                type="checkbox" 
                checked={activo} 
                onChange={(e) => setActivo(e.target.checked)}/>
                Activo</label>
            <button type="submit">Crear Cliente</button>
        </form>
    )

}

export default ClienteForm