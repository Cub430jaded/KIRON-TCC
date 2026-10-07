import {
    HashRouter,
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import HomeCliente from "../pages/Funcionario-Cliente/HomeCliente/HomeCliente"
import LoginUsuario from "../pages/Publico-Usuario/LoginUsuario/LoginUsuario"
import CadastroCliente from "../pages/Publico-Usuario/CadastroCliente/CadastroCliente"
import HomeInstitucional from "../pages/Publico-Usuario/HomeInstitucional/HomeInstitucional"
const AppRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomeInstitucional />} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/cadastro" element={<CadastroCliente />} />
                <Route path="/homeCliente" element={<HomeCliente />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes
