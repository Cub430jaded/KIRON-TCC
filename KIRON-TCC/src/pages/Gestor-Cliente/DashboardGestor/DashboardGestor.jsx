import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import api from '../../services/api';
import styles from './DashboardGestor.module.css';

const DashboardGestor = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  // Estados dinâmicos do Dashboard
  const [usuarioNome, setUsuarioNome] = useState('Gestor');
  const [kpis, setKpis] = useState({
    chamadosAbertos: 0,
    equipamentosAtivos: 0
  });

  const [ultimosChamados, setUltimosChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    // Lê os dados do gestor logado
    const dadosSalvos = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosSalvos && dadosSalvos.nome) {
      setUsuarioNome(dadosSalvos.nome);
    }

    // Carrega estatísticas reais de Chamados e Equipamentos via Axios
    const carregarDadosDashboard = async () => {
      try {
        setCarregando(true);
        const [resChamados, resEquipamentos] = await Promise.all([
          api.get('/chamados'),
          api.get('/equipamentos')
        ]);

        const listaChamados = resChamados.data;
        const listaEquipamentos = resEquipamentos.data;

        // Filtra chamados não concluídos
        const ativos = listaChamados.filter((c) => {
          const st = (c.status || '').toLowerCase();
          return !st.includes('concluído') && !st.includes('finalizado');
        }).length;

        setKpis({
          chamadosAbertos: ativos,
          equipamentosAtivos: listaEquipamentos.length
        });

        // Pega os 5 chamados mais recentes
        setUltimosChamados(listaChamados.slice(0, 5));
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const abrirDetalhes = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> Gestor</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-chart-pie"></i> Visão Geral
          </button>
          <button onClick={() => navigate('/chamadosGestor')}>
            <i className="fa-solid fa-ticket"></i> Chamados
          </button>
          <button onClick={() => navigate('/cadastroEquipamento')}>
            <i className="fa-solid fa-desktop"></i> Equipamentos
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
          <h1>Visão Geral da TI</h1>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{usuarioNome}</span>
            <div className={styles.avatar}><i className="fa-solid fa-user"></i></div>
          </div>
        </header>

        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><i className="fa-solid fa-ticket"></i></div>
            <div className={styles.kpiInfo}>
              <p>Chamados Ativos</p>
              <h3>{kpis.chamadosAbertos}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><i className="fa-solid fa-desktop"></i></div>
            <div className={styles.kpiInfo}>
              <p>Equipamentos</p>
              <h3>{kpis.equipamentosAtivos}</h3>
            </div>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>Últimos Chamados</h2>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipamento</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                      Carregando últimos chamados do banco...
                    </td>
                  </tr>
                ) : ultimosChamados.length > 0 ? (
                  ultimosChamados.map((chamado) => (
                    <tr key={chamado.id} className={styles.tableRow}>
                      <td>#KR-{chamado.id}</td>
                      <td>{chamado.equipamento ? chamado.equipamento.nome : 'N/A'}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + (chamado.prioridade || 'Media')]}`}>
                          {chamado.prioridade || 'Média'}
                        </span>
                      </td>
                      <td>{chamado.status}</td>
                      <td>
                        <button 
                          className={styles.btnAction} 
                          onClick={() => abrirDetalhes(chamado)}
                          title="Ver Detalhes"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                      Nenhum chamado registrado no banco.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <ModalDetalhesChamado 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        chamado={chamadoSelecionado} 
      />
    </div>
  );
};

export default DashboardGestor;