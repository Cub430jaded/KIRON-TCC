import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import HomeCliente from "../pages/HomeCliente/HomeCliente"
import LoginUsuario from "../pages/LoginUsuario/LoginUsuario"
import CadastroCliente from "../pages/CadastroCliente/CadastroCliente"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginUsuario />} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/cadastro" element={<CadastroCliente />} />
                <Route path="/homeCliente" element={<HomeCliente />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
