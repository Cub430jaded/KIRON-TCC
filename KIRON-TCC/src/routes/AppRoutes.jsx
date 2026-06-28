import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"


import LoginUsuario from "../pages/LoginUsuario/LoginUsuario"
import CadastroCliente from "../pages/CadastroCliente/CadastroCliente"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginUsuario />} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/cadastro" element={<CadastroCliente />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
