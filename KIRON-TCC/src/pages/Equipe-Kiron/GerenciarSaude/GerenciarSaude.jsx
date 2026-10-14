import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './GerenciarSaude.module.css';

const GerenciarSaude = () => {
  const navigate = useNavigate();

  // Estados dos Equipamentos e Filtros
  const [equipamentos, setEquipamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroSaude, setFiltroSaude] = useState('Todos');

  // Dados do Técnico Logado
  const [tecnico, setTecnico] = useState({
    nome: 'Técnico',
    cargo: 'Suporte Nível 2'
  });

  useEffect(() => {
    // 1. Validação da Sessão
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    // 2. Carrega dados do Técnico logado
    const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosUsuario) {
      setTecnico({
        nome: dadosUsuario.nome || 'Técnico de Suporte',
        cargo: dadosUsuario.cargo || 'Equipe Kiron TI'
      });
    }

    // 3. Busca lista real de equipamentos cadastrados na API Java / MySQL via Axios
    const carregarEquipamentos = async () => {
      try {
        setCarregando(true);
        const res = await api.get('/equipamentos');
        setEquipamentos(res.data);
      } catch (err) {
        console.error('Erro de conexão com a API ao buscar equipamentos:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarEquipamentos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  // Regra visual de badge de Saúde conforme o status do equipamento
  const getSaudeBadge = (statusSaude) => {
    const st = (statusSaude || 'Crítico').toLowerCase();
    if (st.includes('ótimo') || st.includes('otimo') || st.includes('saudável') || st.includes('saudavel')) {
      return { class: styles.badgeSaudavel, label: 'Saudável' };
    }
    if (st.includes('alerta') || st.includes('atenção') || st.includes('atencao')) {
      return { class: styles.badgeAlerta, label: 'Em Alerta' };
    }
    return { class: styles.badgeCritico, label: 'Crítico' };
  };

  // Filtragem combinada por busca textual e status de saúde
  const equipamentosFiltrados = equipamentos.filter((eq) => {
    const atendeBusca = 
      (eq.nome || '').toLowerCase().includes(busca.toLowerCase()) ||
      (eq.tipo || '').toLowerCase().includes(busca.toLowerCase()) ||
      (eq.sistemaOperacional || '').toLowerCase().includes(busca.toLowerCase());

    const statusSaude = (eq.statusSaude || 'Crítico').toLowerCase();

    if (!atendeBusca) return false;
    if (filtroSaude === 'Todos') return true;
    if (filtroSaude === 'Saudável') return statusSaude.includes('ótimo') || statusSaude.includes('saudável') || statusSaude.includes('otimo');
    if (filtroSaude === 'Alerta') return statusSaude.includes('alerta') || statusSaude.includes('atenção');
    if (filtroSaude === 'Crítico') return statusSaude.includes('crítico') || statusSaude.includes('critico');
    return true;
  });

  // KPIs dinâmicos
  const totalEquipamentos = equipamentos.length;
  const qtdAlertas = equipamentos.filter(e => (e.statusSaude || '').toLowerCase().includes('alerta')).length;
  const qtdCriticos = equipamentos.filter(e => (e.statusSaude || '').toLowerCase().includes('crítico') || (e.statusSaude || '').toLowerCase().includes('critico')).length;

  return (
    <div className={styles.pageContainer}>
      {/* Menu Lateral Staff */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> <span className={styles.badgeStaff}>STAFF</span></h2>
        </div>
        <div className={styles.techProfile}>
          <div className={styles.avatar}><i className="fa-solid fa-headset"></i></div>
          <div>
            <p className={styles.techName}>{tecnico.nome}</p>
            <p className={styles.techRole}>{tecnico.cargo}</p>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <button onClick={() => navigate('/FilaTecnico')}>
            <i className="fa-solid fa-list-check"></i> Fila de Chamados
          </button>
          <button onClick={() => navigate('/agendaTecnico')}>
            <i className="fa-solid fa-calendar-days"></i> Minha Agenda
          </button>
          <button className={styles.activeMenu} onClick={() => navigate('/gerenciarSaude')}>
            <i className="fa-solid fa-heart-pulse"></i> Saúde dos PCs
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Monitoramento e Saúde dos Equipamentos</h1>
        </header>

        {/* KPIs de Saúde do Parque */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconTotal}><i className="fa-solid fa-desktop"></i></div>
            <div className={styles.kpiInfo}>
              <p>Total Monitorado</p>
              <h3>{totalEquipamentos}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconWarning}><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Em Alerta</p>
              <h3>{qtdAlertas}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconDanger}><i className="fa-solid fa-circle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Críticos / Atenção Máxima</p>
              <h3>{qtdCriticos}</h3>
            </div>
          </div>
        </section>

        {/* Área de Filtros e Busca */}
        <section className={styles.listSection}>
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Buscar por equipamento, tipo ou sistema..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className={styles.filterTabs}>
              <button 
                className={filtroSaude === 'Todos' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Todos')}
              >
                Todos ({equipamentos.length})
              </button>
              <button 
                className={filtroSaude === 'Saudável' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Saudável')}
              >
                Saudáveis
              </button>
              <button 
                className={filtroSaude === 'Alerta' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Alerta')}
              >
                Alerta
              </button>
              <button 
                className={filtroSaude === 'Crítico' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Crítico')}
              >
                Críticos
              </button>
            </div>
          </div>

          {/* Tabela de Dispositivos */}
          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Equipamento</th>
                  <th>Tipo</th>
                  <th>S.O.</th>
                  <th>Status de Saúde</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>Carregando saúde dos computadores...</td>
                  </tr>
                ) : equipamentosFiltrados.length > 0 ? (
                  equipamentosFiltrados.map((eq) => {
                    const badgeInfo = getSaudeBadge(eq.statusSaude);
                    return (
                      <tr key={eq.id}>
                        <td><strong>#EQ-{eq.id}</strong></td>
                        <td><strong>{eq.nome}</strong></td>
                        <td>{eq.tipo}</td>
                        <td>{eq.sistemaOperacional || 'Windows 11'}</td>
                        <td>
                          <span className={`${styles.badge} ${badgeInfo.class}`}>
                            {badgeInfo.label}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={styles.btnAcao}
                            onClick={() => navigate('/AbrirChamado')}
                            title="Abrir chamado preventivo para este PC"
                          >
                            <i className="fa-solid fa-plus"></i> Abrir Chamado
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>
                      Nenhum equipamento encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GerenciarSaude;