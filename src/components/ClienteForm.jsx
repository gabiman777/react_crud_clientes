import {useState} from 'react'

//← recibe: onCrear Cliente, que es una función que se ejecutará cuando se cree un nuevo cliente
function ClienteForm({ clienteInicial, onCrearCliente, onGuardarCliente, onCancelar }) {
    
    const ESTADO_INICIAL = { nombre: '', email: '', telefono: '', empresa: '', activo: true }
    
    const [formData, setFormData] = useState(clienteInicial ?? ESTADO_INICIAL)

    const modoEdicion = Boolean(clienteInicial) // true si clienteInicial es un objeto, false si es null
    
    //handle change in form
    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,   // clave computada
        }))
    }

    function handleSubmit(e) {
        e.preventDefault() //avoids browser reloads page
        
        if (formData.nombre.trim() === '') { alert('El nombre es obligatorio'); return }

        if (modoEdicion){
            onGuardarCliente(formData)   // formData ya trae id y fechaAlta de clienteInicial
        }
        else{
            onCrearCliente({ ...formData, fechaAlta: new Date().toISOString().slice(0, 10) })
            setFormData(ESTADO_INICIAL)   // reset form's fields to a new client
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input name="nombre" placeholder="Nombre"   value={formData.nombre}   onChange={handleChange} />
            </label>

            <label>
                Email:
                <input 
                    type="email"
                    name="email"
                    placeholder="Email del cliente" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
            </label>

            <label>
                Empresa:
                <input 
                    type="text" 
                    name="empresa"
                    placeholder="Empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                />
            </label>
            <label>
                Teléfono:
                <input 
                    type="tel" 
                    name="telefono"
                    placeholder="Teléfono del cliente" 
                    value={formData.telefono} 
                    onChange={handleChange} 
                />
            </label>
            <label>
            <input 
                type="checkbox" 
                name="activo"
                checked={formData.activo} 
                onChange={handleChange}/>
                Activo</label>
            <button type="submit">{modoEdicion ? 'Guardar cambios' : 'Crear Cliente'}</button>
            {modoEdicion && <button type="button" onClick={onCancelar}>Cancelar</button>}
        </form>
    )

}

export default ClienteForm