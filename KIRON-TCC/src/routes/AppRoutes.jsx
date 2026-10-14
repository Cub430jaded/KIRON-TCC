import {
    HashRouter,
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

// Importações das páginas do Funcionario-Cliente
import HomeCliente from "../pages/Funcionario-Cliente/HomeCliente/HomeCliente"
import AbrirChamado from "../pages/Funcionario-Cliente/AbrirChamado/AbrirChamado"
import MeusChamados from "../pages/Funcionario-Cliente/MeusChamados/MeusChamados"
import DetalhesChamado from "../pages/Funcionario-Cliente/DetalhesChamado/DetalhesChamado"
import PerfilUsuario from "../pages/Funcionario-Cliente/PerfilUsuario/PerfilUsuario"


// Importações das páginas do Público-Usuario
import LoginUsuario from "../pages/Publico-Usuario/LoginUsuario/LoginUsuario"
import CadastroCliente from "../pages/Publico-Usuario/CadastroCliente/CadastroCliente"
import HomeInstitucional from "../pages/Publico-Usuario/HomeInstitucional/HomeInstitucional"
import RecuperarSenha from "../pages/Publico-Usuario/RecuperarSenha/RecuperarSenha"
import Planos from "../pages/Publico-Usuario/Planos/Planos";
import TermosUso from "../pages/Publico-Usuario/TermosUso/TermosUso";
import PoliticaPrivacidade from "../pages/Publico-Usuario/PoliticaPrivacidade/PoliticaPrivacidade";

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
                
                
                
                {/* Rotas do Público-Usuario */}
                <Route path="/" element={< HomeInstitucional/>} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/cadastro" element={<CadastroCliente />} />
                <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                <Route path="/planos" element={<Planos />} />
                <Route path="/termosUso" element={<TermosUso />} />
                <Route path="/politicaPrivacidade" element={<PoliticaPrivacidade />} />

                {/* Rotas do Funcionario-Cliente */}
                <Route path="/homeCliente" element={<HomeCliente />} />
                <Route path="/abrirChamado" element={<AbrirChamado />} />
                <Route path="/meusChamados" element={<MeusChamados />} />
                <Route path="/detalhesChamado" element={<DetalhesChamado />} />
                <Route path="/DetalhesChamado/:id" element={<DetalhesChamado />} />
                <Route path="/perfilUsuario" element={<PerfilUsuario />} />

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
