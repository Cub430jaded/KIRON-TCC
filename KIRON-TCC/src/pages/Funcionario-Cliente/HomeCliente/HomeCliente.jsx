import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './HomeCliente.module.css';

const HomeCliente = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: 'Bruno Silva',
    setor: 'Setor de Gestão e Operações'
  });

  const [estatisticas, setEstatisticas] = useState({
    abertos: 0,
    emAndamento: 0,
    concluidos: 0
  });

  const [chamadosRecentes, setChamadosRecentes] = useState([]);

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const dadosSalvos = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosSalvos) {
      setUsuario({
        nome: dadosSalvos.nome || 'Bruno Silva',
        setor: dadosSalvos.cargo ? `Setor: ${dadosSalvos.cargo}` : 'Setor de TI e Operações'
      });
    }

    const carregarDadosDashboard = async () => {
      try {
        const res = await api.get('/chamados');
        const listaChamados = res.data;

        let qtdAbertos = 0;
        let qtdEmAndamento = 0;
        let qtdConcluidos = 0;

        listaChamados.forEach((c) => {
          const st = (c.status || '').toLowerCase();
          if (st.includes('aberto') || st.includes('pendente')) qtdAbertos++;
          else if (st.includes('andamento') || st.includes('atendimento')) qtdEmAndamento++;
          else if (st.includes('concluído') || st.includes('finalizado')) qtdConcluidos++;
        });

        setEstatisticas({
          abertos: qtdAbertos,
          emAndamento: qtdEmAndamento,
          concluidos: qtdConcluidos
        });

        setChamadosRecentes(listaChamados.slice(0, 3));
      } catch (err) {
        console.error('Erro ao conectar com API:', err);
      }
    };

    carregarDadosDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

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
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-table-columns"></i> Dashboard
          </button>
          <button className={styles.navItem} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-circle-plus"></i> Abrir Chamado
          </button>
          <button className={styles.navItem} onClick={() => navigate('/MeusChamados')}>
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
            <h1>Olá, {usuario.nome}</h1>
            <p className={styles.welcomeText}>
              <i className="fa-solid fa-building-user"></i> {usuario.setor} &bull; Painel Geral de Suporte Técnico
            </p>
          </div>
          <button className={styles.btnDestaque} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-plus-circle"></i> Abrir Novo Chamado
          </button>
        </header>

        <section className={styles.cardsGrid}>
          <div className={styles.summaryCard}>
            <div className={`${styles.cardIcon} ${styles.iconAberto}`}>
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardNumber}>{estatisticas.abertos}</span>
              <span className={styles.cardLabel}>Chamados Abertos</span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={`${styles.cardIcon} ${styles.iconAndamento}`}>
              <i className="fa-solid fa-spinner"></i>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardNumber}>{estatisticas.emAndamento}</span>
              <span className={styles.cardLabel}>Em Andamento</span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={`${styles.cardIcon} ${styles.iconConcluido}`}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardNumber}>{estatisticas.concluidos}</span>
              <span className={styles.cardLabel}>Concluídos</span>
            </div>
          </div>
        </section>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-clock-rotate-left"></i> Últimos Chamados Abertos
            </h2>
            <button className={styles.linkVerTodos} onClick={() => navigate('/MeusChamados')}>
              Ver Histórico Completo &rarr;
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Equipamento</th>
                  <th>Categoria</th>
                  <th>Assunto</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {chamadosRecentes.length > 0 ? (
                  chamadosRecentes.map((item) => (
                    <tr key={item.id}>
                      <td className={styles.codeCell}>#KR-{item.id}</td>
                      <td>{item.equipamento?.nome || 'N/A'}</td>
                      <td>{item.categoria}</td>
                      <td><strong>{item.titulo || item.descricao}</strong></td>
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
                          <i className="fa-solid fa-eye"></i> Detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noResults}>
                      Nenhum chamado registrado no momento.
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

export default HomeCliente;