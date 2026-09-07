import {useState} from 'react'

//← recibe: onCrear Cliente, que es una función que se ejecutará cuando se cree un nuevo cliente
function ClienteForm({onCrearCliente}) {
    const ESTADO_INICIAL = { nombre: '', email: '', telefono: '', empresa: '', activo: true }
    const [formData, setFormData] = useState(ESTADO_INICIAL)
    
    //handle change in form
    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,   // clave computada
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (formData.nombre.trim() === '') { alert('El nombre es obligatorio'); return }
        onCrearCliente({ ...formData, fechaAlta: new Date().toISOString().slice(0, 10) })
        setFormData(ESTADO_INICIAL)   // reset form's fields
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input name="nombre"   placeholder="Nombre"   value={formData.nombre}   onChange={handleChange} />
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
            <button type="submit">Crear Cliente</button>
        </form>
    )

}

export default ClienteForm