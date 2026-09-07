import {useState, useEffect} from 'react'
import ClienteForm from './components/ClienteForm.jsx'
import ClienteList from './components/ClienteList.jsx'

const API = 'http://localhost:3001/clientes'


function App() {

  const [clientes, setClientes] = useState([]) //arranca con lista de clientes vacía

  function handleCrearCliente(nuevoCliente) {
    //new client's id is generated random mode by browser as an uuid 
    setClientes([...clientes, {...nuevoCliente, id: crypto.randomUUID()}])
  }

  function handleBorrarCliente(id) {
    setClientes(clientes.filter(c => c.id !== id))
  }

  useEffect(() => {
    // Fetch the list of clients from the API when the component mounts
    fetch(API)
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <h1>Clientes</h1>
      <ClienteForm onCrearCliente={handleCrearCliente} />
      <ClienteList clientes={clientes} onBorrarCliente={handleBorrarCliente} />
    </>
  )
}

export default App