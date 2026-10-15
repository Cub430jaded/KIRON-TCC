import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './MeusChamados.module.css';

const MeusChamados = () => {
  const navigate = useNavigate();

  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [listaChamados, setListaChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const carregarChamados = async () => {
      try {
        const res = await api.get('/chamados');
        setListaChamados(res.data);
      } catch (err) {
        console.error('Erro ao conectar com a API de Chamados:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarChamados();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const chamadosFiltrados = listaChamados.filter((item) => {
    if (filtroStatus === 'Todos') return true;
    const st = (item.status || '').toLowerCase();
    if (filtroStatus === 'Abertos') return st.includes('aberto') || st.includes('pendente');
    if (filtroStatus === 'Em Andamento') return st.includes('andamento') || st.includes('atendimento');
    if (filtroStatus === 'Concluídos') return st.includes('concluído') || st.includes('finalizado');
    return true;
  });

  const getBadgeClass = (status) => {
    const st = (status || '').toLowerCase();
    if (st.includes('aberto') || st.includes('pendente')) return styles.badgeAberto;
    if (st.includes('andamento') || st.includes('atendimento')) return styles.badgeEmAndamento;
    return styles.badgeConcluido;
  };

  return (
    <div className={styles.pageWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea} onClick={() => navigate('/HomeCliente')}>
          <span className={styles.logoKiron}>Kiron</span>
          <span className={styles.logoTi}>TI</span>
        </div>

        <nav className={styles.navMenu}>
          <button className={styles.navItem} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-table-columns"></i> Dashboard
          </button>
          <button className={styles.navItem} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-circle-plus"></i> Abrir Chamado
          </button>
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/MeusChamados')}>
            <i className="fa-solid fa-headset"></i> Meus Chamados
          </button>
          <button className={styles.navItem} onClick={() => navigate('/PerfilUsuario')}>
            <i className="fa-solid fa-user-gear"></i> Perfil do Usuário
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Sair do Sistema
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.headerBlock}>
          <div>
            <h1>Meus Chamados</h1>
            <p className={styles.welcomeText}>Acompanhe o andamento e histórico de todas as suas solicitações</p>
          </div>
          <button className={styles.btnNovoChamado} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-plus-circle"></i> Abrir Novo Chamado
          </button>
        </header>

        <section className={styles.filterTabsSection}>
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabBtn} ${filtroStatus === 'Todos' ? styles.activeTab : ''}`}
              onClick={() => setFiltroStatus('Todos')}
            >
              Todos ({listaChamados.length})
            </button>
            <button
              className={`${styles.tabBtn} ${filtroStatus === 'Abertos' ? styles.activeTab : ''}`}
              onClick={() => setFiltroStatus('Abertos')}
            >
              Abertos
            </button>
            <button
              className={`${styles.tabBtn} ${filtroStatus === 'Em Andamento' ? styles.activeTab : ''}`}
              onClick={() => setFiltroStatus('Em Andamento')}
            >
              Em Andamento
            </button>
            <button
              className={`${styles.tabBtn} ${filtroStatus === 'Concluídos' ? styles.activeTab : ''}`}
              onClick={() => setFiltroStatus('Concluídos')}
            >
              Concluídos
            </button>
          </div>
        </section>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-list-check"></i> Histórico de Chamados
            </h2>
            <span className={styles.counterBadge}>
              Exibindo {chamadosFiltrados.length} registro(s)
            </span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Número do Ticket</th>
                  <th>Equipamento</th>
                  <th>Categoria</th>
                  <th>Data de Abertura</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="6" className={styles.noResults}>Carregando chamados do banco...</td>
                  </tr>
                ) : chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((item) => (
                    <tr key={item.id}>
                      <td className={styles.codeCell}>#KR-{item.id}</td>
                      <td><strong>{item.equipamento?.nome || 'N/A'}</strong></td>
                      <td>{item.categoria}</td>
                      <td>{item.dataCriacao ? new Date(item.dataCriacao).toLocaleDateString('pt-BR') : 'Hoje'}</td>
                      <td>
                        <span className={`${styles.badgeStatus} ${getBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.actionBtn}
                          onClick={() => navigate(`/DetalhesChamado/${item.id}`)}
                        >
                          <i className="fa-solid fa-eye"></i> Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noResults}>
                      <i className="fa-solid fa-folder-open"></i> Nenhum chamado encontrado.
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

export default MeusChamados;