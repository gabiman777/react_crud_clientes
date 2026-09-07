import {useState} from 'react'
import ClienteForm from './components/ClienteForm.jsx'
import ClienteList from './components/ClienteList.jsx'

const CLIENTES_INICIALES =  [
  { id: '1', nombre: 'Ana López', email: 'ana@acme.com', telefono: '0981-111-222', empresa: 'ACME', activo: true, fechaAlta: '2026-09-01' },
  { id: '2', nombre: 'Beto Martínez', email: 'beto@globex.com', telefono: '0982-333-444', empresa: 'Globex', activo: false, fechaAlta: '2026-09-03' },
]


function App() {

  const [clientes, setClientes] = useState(CLIENTES_INICIALES)

  function handleCrearCliente(nuevoCliente) {
    setClientes([...clientes, {...nuevoCliente, id: crypto.randomUUID()}])
  }

  function handleBorrarCliente(id) {
    setClientes(clientes.filter(cliente => cliente.id !== id))
  }

  return (
    <>
      <h1>Clientes</h1>
      <ClienteForm onCrearCliente={handleCrearCliente} />
      <ClienteList clientes={clientes} onBorrarCliente={handleBorrarCliente} />
    </>
  )
}

export default App