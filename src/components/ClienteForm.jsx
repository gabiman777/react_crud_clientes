import {useState} from 'react'

//← recibe: onCrear Cliente, que es una función que se ejecutará cuando se cree un nuevo cliente
function ClienteForm({ clienteInicial, onCrearCliente, onGuardarCliente, onCancelar }) {
    
    const ESTADO_INICIAL = { nombre: '', email: '', telefono: '', empresa: '', activo: true }
    
    const [formData, setFormData] = useState(clienteInicial ?? ESTADO_INICIAL)

    const modoEdicion = Boolean(clienteInicial) // true si clienteInicial es un objeto, false si es null
    
    const [errores, setErrores] = useState({}) // object to store validation errors for each field

    function validar(datos){
        const nuevosErrores = {}

        //field name is required
        if (formData.nombre.trim() === ''){ 
            nuevosErrores.nombre = 'El nombre es obligatorio'; 
        }

        //field email is optional, but if user fills it, it must to have valid format
        if (datos.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
            nuevosErrores.email = 'El email no tiene un formato válido';
        }

        return nuevosErrores
    }
    
    //handle change in any input of form
    function handleChange(e) {
        const { name, value, type, checked } = e.target
        
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,   // clave computada
        }))

        setErrores((prev) => ({ ...prev, [name]: '' })) // clear error for the field being edited (limpiar el error del campo al escribir en él)
    }

    //handle form's submit
    function handleSubmit(e) {
        e.preventDefault() //avoids browser reloads page
        
        const nuevosErrores = validar(formData)
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores)
            return
        }
        setErrores({}) // clear previous errors if any
        
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
            {errores.nombre && <p className="error-campo">{errores.nombre}</p>}

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
            {errores.email && <p className="error-campo">{errores.email}</p>}

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