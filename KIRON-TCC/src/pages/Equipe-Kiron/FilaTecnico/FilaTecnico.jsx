import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import api from '../../services/api';
import styles from './FilaTecnico.module.css';

const FilaTecnico = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('Fila Geral');

  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [tecnico, setTecnico] = useState({
    nome: 'Técnico',
    cargo: 'Suporte Nível 2'
  });

  const carregarChamados = async () => {
    try {
      setCarregando(true);
      const res = await api.get('/chamados');
      setChamados(res.data);
    } catch (err) {
      console.error('Erro ao buscar fila de chamados:', err);
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

    const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosUsuario) {
      setTecnico({
        nome: dadosUsuario.nome || 'Técnico de Suporte',
        cargo: dadosUsuario.cargo || 'Equipe Kiron TI'
      });
    }

    carregarChamados();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const chamadosFiltrados = chamados.filter((chamado) => {
    const st = (chamado.status || '').toLowerCase();
    if (filtro === 'Fila Geral') return st === 'aberto' || st === 'pendente';
    if (filtro === 'Meus Chamados') return st === 'em andamento' || st === 'atendimento';
    return true;
  });

  const qtdFilaGeral = chamados.filter(c => (c.status || '').toLowerCase() === 'aberto').length;
  const qtdMeusChamados = chamados.filter(c => (c.status || '').toLowerCase() === 'em andamento').length;

  const abrirDetalhes = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
  };

  const assumirChamado = async (id) => {
    try {
      await api.put(`/chamados/${id}/status`, { status: 'Em Andamento' });
      alert(`Você assumiu o chamado #KR-${id}! Ele agora está em andamento na sua lista.`);
      carregarChamados();
    } catch (err) {
      console.error('Erro ao assumir chamado:', err);
      alert('Erro ao assumir o chamado no banco de dados.');
    }
  };

  return (
    <div className={styles.pageContainer}>
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
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-list-check"></i> Fila de Chamados
          </button>
          <button onClick={() => navigate('/agendaTecnico')}>
            <i className="fa-solid fa-calendar-days"></i> Minha Agenda
          </button>
          <button onClick={() => navigate('/gerenciarSaude')}>
            <i className="fa-solid fa-heart-pulse"></i> Saúde dos PCs
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
          <h1>Painel de Atendimentos</h1>
        </header>

        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconAlert}><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Fila Geral (Não Assumidos)</p>
              <h3>{qtdFilaGeral}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconSuccess}><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <div className={styles.kpiInfo}>
              <p>Meus Chamados Atuais</p>
              <h3>{qtdMeusChamados}</h3>
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className={styles.filterTabs}>
            <button 
              className={filtro === 'Fila Geral' ? styles.tabActive : styles.tab}
              onClick={() => setFiltro('Fila Geral')}
            >
              Fila Geral (Para Pegar)
            </button>
            <button 
              className={filtro === 'Meus Chamados' ? styles.tabActive : styles.tab}
              onClick={() => setFiltro('Meus Chamados')}
            >
              Meus Atendimentos
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipamento</th>
                  <th>Categoria</th>
                  <th>Prioridade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>Carregando chamados do banco de dados...</td>
                  </tr>
                ) : chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((chamado) => (
                    <tr key={chamado.id}>
                      <td><strong>#KR-{chamado.id}</strong></td>
                      <td>{chamado.equipamento ? `${chamado.equipamento.nome}` : 'Equipamento N/A'}</td>
                      <td>{chamado.categoria || 'Geral'}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + (chamado.prioridade || 'Media')]}`}>
                          {chamado.prioridade || 'Média'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button className={styles.btnIcon} onClick={() => abrirDetalhes(chamado)} title="Detalhes">
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          
                          {filtro === 'Fila Geral' ? (
                            <button className={styles.btnAssumir} onClick={() => assumirChamado(chamado.id)}>
                              Assumir
                            </button>
                          ) : (
                            <button className={styles.btnResolver} onClick={() => navigate(`/atendimentoChamado/${chamado.id}`)}>
                              Resolver
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      Nenhum chamado nesta lista.
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

export default FilaTecnico;