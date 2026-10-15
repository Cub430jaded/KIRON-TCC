import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './CadastroFuncionario.module.css';

const CadastroFuncionario = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [senhaProvisoria, setSenhaProvisoria] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastrarFuncionario = async (e) => {
    e.preventDefault();


    const gestorLogado = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));

    const payload = {
      nome: nome.trim(),
      email: email.trim(),
      senha: senhaProvisoria,
      cargo: cargo.trim(),
      empresa: gestorLogado?.empresa || 'Sua Empresa S.A.',
      cnpj: gestorLogado?.cnpj || '',
      perfil: 'CLIENTE'
    };

    try {
      setCarregando(true);
      await api.post('/auth/register', payload);

      alert(`Funcionário ${nome} cadastrado com sucesso no banco de dados!`);
      setNome('');
      setEmail('');
      setCargo('');
      setSenhaProvisoria('');
    } catch (err) {
      console.error('Erro ao cadastrar funcionário:', err);
      const msg = err.response?.data || 'Erro de conexão ao cadastrar funcionário.';
      alert('Falha no cadastro: ' + msg);
    } finally {
      setCarregando(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> Gestor</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <button onClick={() => navigate('/dashboardGestor')}>
            <i className="fa-solid fa-chart-pie"></i> Visão Geral
          </button>
          <button onClick={() => navigate('/chamadosGestor')}>
            <i className="fa-solid fa-ticket"></i> Chamados
          </button>
          <button onClick={() => navigate('/cadastroEquipamento')}>
            <i className="fa-solid fa-desktop"></i> Equipamentos
          </button>
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-user-plus"></i> Funcionários
          </button>
          <button onClick={() => navigate('/financeiro')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Financeiro
          </button>
          <button onClick={() => navigate('/consultoria')}>
            <i className="fa-solid fa-handshake"></i> Consultoria
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Cadastro de Funcionários</h1>
        </header>

        <div className={styles.contentGrid}>
          <section className={styles.formSection}>
            <h2>Novo Colaborador</h2>
            <p>Cadastre os membros da sua equipe para que eles possam abrir solicitações de suporte.</p>

            <form onSubmit={handleCadastrarFuncionario} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Ex: João Souza" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>E-mail Corporativo</label>
                <input 
                  type="email" 
                  placeholder="joao@empresa.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Cargo / Setor</label>
                <input 
                  type="text" 
                  placeholder="Ex: Analista de RH" 
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Senha Provisória</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={senhaProvisoria}
                  onChange={(e) => setSenhaProvisoria(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className={styles.btnSubmit} disabled={carregando}>
                {carregando ? 'Cadastrando...' : 'Cadastrar Funcionário'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CadastroFuncionario;