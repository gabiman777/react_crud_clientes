import {useState, useEffect} from 'react'
import ClienteForm from './components/ClienteForm.jsx'
import ClienteList from './components/ClienteList.jsx'

const API = 'http://localhost:3001/clientes'


function App() {

  const [clientes, setClientes] = useState([]) //starts with client's list empty
  const [loading, setLoading] = useState(true) //start with loading in true: al montar ya estás cargando
  const [error, setError] = useState(null) //start with no error


  async function handleCrearCliente(nuevoCliente) {
    //v1. new client's id is generated random mode by browser as an uuid 
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
    } catch (error) {
      setError(error.message)
      console.error('Error creating client:', error)
    }
  }

  function handleBorrarCliente(id) {
    setClientes(clientes.filter(c => c.id !== id))
  }

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

  return (
    <>
      <h1>Clientes</h1>
      <ClienteForm onCrearCliente={handleCrearCliente} />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'crimson'}}>Error: {error}</p>}
      {!loading && !error && <ClienteList clientes={clientes} onBorrarCliente={handleBorrarCliente} />}
    </>
  )
}

export default App