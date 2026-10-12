import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MeusChamados.module.css';

const MeusChamados = () => {
  const navigate = useNavigate();

  // Estado do Filtro Ativo por Status
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [listaChamados, setListaChamados] = useState([]);

  useEffect(() => {
    // Validação de Sessão
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // Carrega a lista do localStorage ou inicializa os dados padrão
    const chamadosIniciais = [
      {
        id: 'KR-8021',
        protocolo: '#KR-8021',
        equipamento: 'PC-FINANCEIRO-02',
        categoria: 'Rede',
        status: 'Em Andamento',
        dataAbertura: '12/10/2026',
        assunto: 'Lentidão na rede do setor Financeiro',
        solicitante: 'Bruno Silva',
        descricao: 'Os computadores do setor financeiro estão com quedas intermitentes.',
        parecerTecnico: '',
        historico: [
          { dataHora: '12/10/2026 às 10:15', evento: 'Aberto pelo cliente', descricao: 'Chamado registrado.' },
          { dataHora: '12/10/2026 às 10:35', evento: 'Técnico assumiu', descricao: 'Analisando porta do switch.' }
        ]
      },
      {
        id: 'KR-8019',
        protocolo: '#KR-8019',
        equipamento: 'PC-RECEPCAO-01',
        categoria: 'Software',
        status: 'Aberto',
        dataAbertura: '11/10/2026',
        assunto: 'Instalação de software de edição no PC-04',
        solicitante: 'Lucas Patrick',
        descricao: 'Solicitação de instalação e licença para pacote gráfico.',
        parecerTecnico: '',
        historico: [
          { dataHora: '11/10/2026 às 16:40', evento: 'Aberto pelo cliente', descricao: 'Aguardando atribuição.' }
        ]
      },
      {
        id: 'KR-7994',
        protocolo: '#KR-7994',
        equipamento: 'SERVIDOR-LOCAL',
        categoria: 'Segurança',
        status: 'Concluído',
        dataAbertura: '09/10/2026',
        assunto: 'Configuração de rotina de backup em nuvem',
        solicitante: 'Diego Bryan',
        descricao: 'Ajuste de agendamento diário do backup automático.',
        parecerTecnico: 'Rotina de backup diário configurada e testada no servidor com redundância na nuvem AWS.',
        historico: [
          { dataHora: '09/10/2026 às 09:00', evento: 'Aberto pelo cliente', descricao: 'Solicitação registrada.' },
          { dataHora: '09/10/2026 às 09:30', evento: 'Técnico assumiu', descricao: 'Mariana Costa iniciou a configuração.' },
          { dataHora: '09/10/2026 às 11:30', evento: 'Concluído', descricao: 'Backup validado e chamado encerrado.' }
        ]
      }
    ];

    const salvos = JSON.parse(localStorage.getItem('kiron_lista_chamados'));
    if (!salvos || salvos.length === 0) {
      localStorage.setItem('kiron_lista_chamados', JSON.stringify(chamadosIniciais));
      setListaChamados(chamadosIniciais);
    } else {
      setListaChamados(salvos);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/Login');
  };

  // Filtragem conforme a aba selecionada
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
      {/* SIDEBAR PADRÃO */}
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        
        {/* CABEÇALHO DA PÁGINA */}
        <header className={styles.headerBlock}>
          <div>
            <h1>Meus Chamados</h1>
            <p className={styles.welcomeText}>Acompanhe o andamento e histórico de todas as suas solicitações</p>
          </div>
          <button className={styles.btnNovoChamado} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-plus-circle"></i> Abrir Novo Chamado
          </button>
        </header>

        {/* FILTROS RÁPIDOS (ABAS POR STATUS) */}
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

        {/* TABELA DE CHAMADOS */}
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
                {chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((item, idx) => {
                    const idLimpo = (item.id || item.protocolo || '').replace('#', '');
                    const protocoloExibido = item.protocolo || `#${item.id}`;

                    return (
                      <tr key={idx}>
                        <td className={styles.codeCell}>{protocoloExibido}</td>
                        <td><strong>{item.equipamento}</strong></td>
                        <td>{item.categoria}</td>
                        <td>{item.dataAbertura}</td>
                        <td>
                          <span className={`${styles.badgeStatus} ${getBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className={styles.actionBtn}
                            onClick={() =>
                              navigate(`/DetalhesChamado/${idLimpo}`, {
                                state: { protocolo: protocoloExibido, ticketId: idLimpo }
                              })
                            }
                          >
                            <i className="fa-solid fa-eye"></i> Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noResults}>
                      <i className="fa-solid fa-folder-open"></i> Nenhum chamado encontrado para o filtro selecionado.
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