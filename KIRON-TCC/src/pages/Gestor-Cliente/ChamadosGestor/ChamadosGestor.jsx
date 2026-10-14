import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import api from '../../services/api';
import styles from './ChamadosGestor.module.css';

const ChamadosGestor = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca lista real de chamados no banco MySQL via Axios
  const carregarChamados = async () => {
    try {
      setCarregando(true);
      const res = await api.get('/chamados');
      setChamados(res.data);
    } catch (err) {
      console.error('Erro ao buscar chamados:', err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    carregarChamados();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const chamadosFiltrados = chamados.filter((chamado) => {
    if (filtroAtivo === 'Todos') return true;
    const st = (chamado.status || '').toLowerCase();
    if (filtroAtivo === 'Aberto') return st.includes('aberto') || st.includes('pendente');
    if (filtroAtivo === 'Em Andamento') return st.includes('andamento') || st.includes('atendimento');
    if (filtroAtivo === 'Concluído') return st.includes('concluído') || st.includes('finalizado');
    return true;
  });

  const abrirDetalhes = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
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
          <button className={styles.activeMenu}>
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
          <h1>Central de Chamados</h1>
          <button className={styles.btnNovaAbertura} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-plus"></i> Abrir Chamado
          </button>
        </header>

        <section className={styles.listSection}>
          <div className={styles.filterTabs}>
            <button 
              className={filtroAtivo === 'Todos' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Todos')}
            >
              Todos ({chamados.length})
            </button>
            <button 
              className={filtroAtivo === 'Aberto' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Aberto')}
            >
              Abertos
            </button>
            <button 
              className={filtroAtivo === 'Em Andamento' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Em Andamento')}
            >
              Em Andamento
            </button>
            <button 
              className={filtroAtivo === 'Concluído' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Concluído')}
            >
              Concluídos
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID / Data</th>
                  <th>Equipamento</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      Carregando chamados do banco...
                    </td>
                  </tr>
                ) : chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((chamado) => (
                    <tr key={chamado.id}>
                      <td>
                        <strong>#KR-{chamado.id}</strong>
                        <br/>
                        <span className={styles.dateText}>
                          {chamado.dataCriacao ? new Date(chamado.dataCriacao).toLocaleDateString('pt-BR') : 'Hoje'}
                        </span>
                      </td>
                      <td>{chamado.equipamento ? chamado.equipamento.nome : 'N/A'}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + (chamado.prioridade || 'Media')]}`}>
                          {chamado.prioridade || 'Média'}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles['status' + (chamado.status || 'Aberto').replace(/\s+/g, '')]}`}>
                          {chamado.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnAction} onClick={() => abrirDetalhes(chamado)} title="Ver Detalhes">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      Nenhum chamado encontrado para este filtro.
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

export default ChamadosGestor;