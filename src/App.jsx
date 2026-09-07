import {useState, useEffect} from 'react'
import ClienteForm from './components/ClienteForm.jsx'
import ClienteList from './components/ClienteList.jsx'
import './App.css'

//API json-server local
// const API = 'http://localhost:3001/clientes'

//API json-server deployed in Render.com
const API = 'https://react-crud-clientes-5kq3.onrender.com/clientes'

function App() {

  const [clientes, setClientes] = useState([]) //starts with client's list empty
  const [loading, setLoading] = useState(true) //start with loading in true: al montar ya estás cargando
  const [error, setError] = useState(null) //start with no error
  const [clienteEditando, setClienteEditando] = useState(null) //object client in edition
  const [aviso, setAviso] = useState(null) // state to store the message to show in the page

  //creates a new client
  async function handleCrearCliente(nuevoCliente) {
    //v1. in memory: new client's id is added, with id generated random mode by browser (as an uuid) 
    //setClientes([...clientes, {...nuevoCliente, id: crypto.randomUUID()}])

    //v2. create client POST method using json-server API, ya no usamos solo memoria
    try{
      const res = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCliente)
      })
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}. No se pudo crear el cliente`)
      }
      const clienteCreado = await res.json()
      setClientes([...clientes, clienteCreado])
      setAviso(`Cliente ${clienteCreado.nombre} creado correctamente`) // show message in page
    } catch (error) {
      setError(error.message)
      console.error('Error creating client:', error)
    }
  }

  //delete one client by id
  async function handleBorrarCliente(id) {
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`HTTP ${res.status}: no se pudo borrar el cliente`)
      
      // Para efecto de la fila fantasma de mensaje "Eliminada"
      // 1. marcamos la fila como borrada (no la quitamos aún)
      setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, _borrado: true } : c)))
      if (clienteEditando?.id === id) setClienteEditando(null) // if the client being edited is deleted, exit edit mode

      // 2. quitarla de verdad a los 2,5 s
      setTimeout(() => {
        setClientes((prev) => prev.filter((c) => c.id !== id))
      }, 2500)

    }
    catch(e){
      setError(e.message)
    }
  }

  //update a client
  async function handleGuardarCliente(clienteEditado) {
    try {
      const res = await fetch(`${API}/${clienteEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteEditado),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}: no se pudo guardar`)
      const actualizado = await res.json()
      // reemplazar ese cliente en la lista, sin mutar:
      setClientes((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      )
      setClienteEditando(null)   // salir del modo edición
      setAviso(`Cliente ${actualizado.nombre} actualizado correctamente`) // show message in page
    } catch (e) {
      setError(e.message)
    }
  }

  //refresh the list of clients from API when the component mounts
  useEffect(() => {
    // Fetch the list of clients from the API when the component mounts
    /*v1. forma directa, sin otra funcion
    fetch(API)
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error fetching clients:', error));
    */

      /*
    //v2. con function sin loading ni error
    async function fetchClientes() {
      const res = await fetch(API)
      const data = await res.json()
      setClientes(data)
    }
    fetchClientes()
    */

    //v3. con function y loading y error
      async function fetchClientes() {
        setLoading(true)
        setError(null)
        try {
          const res = await fetch(API)
          if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}. No se pudieron cargar los datos`)
          }
          const data = await res.json()
          setClientes(data)
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false) //no matter what happens, we stop loading
        }
      }

      fetchClientes()
  }, []); // Empty dependency array means this runs once on mount

  //hide aviso automatically after 3 seconds
  useEffect(() => {
    if (!aviso) return
    const id = setTimeout(() => setAviso(null), 3000) // clear the message after 3 seconds
    return () => clearTimeout(id) // cleanup if aviso changes before timeout
  }, [aviso])
    

  return (
    <>
      <h1>Clientes</h1>
      
      <ClienteForm
        onCrearCliente={handleCrearCliente} 
        onGuardarCliente={handleGuardarCliente} // ← handleGuardarCliente (App)  →  onGuardarCliente 
        clienteInicial={clienteEditando}
        onCancelar={() => setClienteEditando(null)}
        key={clienteEditando ? clienteEditando.id : 'nuevo'}
      />

      {aviso && <p className="aviso-ok">{aviso}</p>}
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'crimson'}}>Error: {error}</p>}

      {!loading && !error && 
        (<ClienteList clientes={clientes} onBorrarCliente={handleBorrarCliente} onEditarCliente={setClienteEditando} />)
      }
    </>
  )
}

export default App