import './App.css'
import { useState } from 'react'
import LoginUsuario from './pages/LoginUsuario/LoginUsuario.jsx'
import CadastroCliente from './pages/CadastroCliente/CadastroCliente.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <>
      {currentPage === 'login' ? (
        <LoginUsuario onCadastro={() => setCurrentPage('cadastro')} />
      ) : (
        <CadastroCliente />
      )}
    </>
  )
}

export default App
