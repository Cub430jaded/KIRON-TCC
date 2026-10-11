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
import RecuperarSenha from "../pages/Publico-Usuario/RecuperarSenha/RecuperarSenha"
import Planos from "../pages/Publico-Usuario/Planos/Planos";

// Importações das páginas do Gestor-Cliente
import DashboardGestor from "../pages/Gestor-Cliente/DashboardGestor/DashboardGestor"
import ChamadosGestor from "../pages/Gestor-Cliente/ChamadosGestor/ChamadosGestor"
import CadastroEquipamento from "../pages/Gestor-Cliente/CadastroEquipamento/CadastroEquipamento"
import Financeiro from "../pages/Gestor-Cliente/Financeiro/Financeiro"
import Consultoria from "../pages/Gestor-Cliente/Consultoria/Consultoria"

// Importações das páginas do Equipe-Kiron
import FilaTecnico from "../pages/Equipe-Kiron/FilaTecnico/FilaTecnico"
import GerenciarSaude from "../pages/Equipe-Kiron/GerenciarSaude/GerenciarSaude"
import AgendaTecnico from "../pages/Equipe-Kiron/AgendaTecnico/AgendaTecnico"
import AtendimentoChamado from "../pages/Equipe-Kiron/AtendimentoChamado/AtendimentoChamado"

const AppRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={< HomeInstitucional/>} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/cadastro" element={<CadastroCliente />} />
                <Route path="/homeCliente" element={<HomeCliente />} />
                <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                <Route path="/planos" element={<Planos />} />
                {/* Rotas do Gestor-Cliente */}
                <Route path="/dashboardGestor" element={<DashboardGestor />} />
                <Route path="/chamadosGestor" element={<ChamadosGestor />} />
                <Route path="/cadastroEquipamento" element={<CadastroEquipamento />} />
                <Route path="/financeiro" element={<Financeiro />} />
                <Route path="/consultoria" element={<Consultoria />} />

                {/* Rotas da Equipe-Kiron */}
                <Route path="/filaTecnico" element={<FilaTecnico />} /> 
                <Route path="/agendaTecnico" element={<AgendaTecnico />} />
                <Route path="/atendimentoChamado" element={<AtendimentoChamado />} />
                <Route path="/gerenciarSaude" element={<GerenciarSaude />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes
