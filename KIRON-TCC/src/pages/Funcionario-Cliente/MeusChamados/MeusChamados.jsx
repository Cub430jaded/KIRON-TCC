import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MeusChamados.module.css';

const MeusChamados = () => {
  const navigate = useNavigate();

  // Estados de Filtro e Busca
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('Todas');
  const [listaChamados, setListaChamados] = useState([]);

  useEffect(() => {
    // Validação da Sessão do Usuário
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // Lista Inicial Padrão
    const chamadosIniciais = [
      {
        protocolo: '#KR-8021',
        assunto: 'Lentidão na rede do setor Financeiro',
        categoria: 'Rede',
        dispositivo: 'PC-FINANCEIRO-02',
        prioridade: 'Alta',
        status: 'Em Atendimento',
        dataAbertura: '12/10/2026 - 10:15',
        solicitante: 'Bruno Silva (Gestor)',
        tecnicoResponsavel: 'Carlos Eduardo (Suporte Nível 2)',
        descricaoInicial: 'Os computadores do setor financeiro estão apresentando quedas intermitentes de conexão.',
        historico: [
          { autor: 'Bruno Silva', papel: 'Cliente', data: '12/10/2026 - 10:15', mensagem: 'Chamado aberto.' }
        ]
      },
      {
        protocolo: '#KR-8019',
        assunto: 'Instalação de software de edição no PC-04',
        categoria: 'Software',
        dispositivo: 'PC-RECEPCAO-01',
        prioridade: 'Baixa',
        status: 'Pendente',
        dataAbertura: '11/10/2026 - 16:40',
        solicitante: 'Lucas Patrick',
        tecnicoResponsavel: 'Aguardando Atribuição',
        descricaoInicial: 'Solicitação de licença para pacote gráfico.',
        historico: [
          { autor: 'Lucas Patrick', papel: 'Cliente', data: '11/10/2026 - 16:40', mensagem: 'Aguardando aprovação.' }
        ]
      },
      {
        protocolo: '#KR-7994',
        assunto: 'Configuração de rotina de backup em nuvem',
        categoria: 'Segurança',
        dispositivo: 'SERVIDOR-LOCAL',
        prioridade: 'Média',
        status: 'Concluído',
        dataAbertura: '09/10/2026 - 09:00',
        solicitante: 'Diego Bryan',
        tecnicoResponsavel: 'Mariana Costa (Infraestrutura)',
        descricaoInicial: 'Configuração do job diário de backup redundante.',
        historico: [
          { autor: 'Diego Bryan', papel: 'Cliente', data: '09/10/2026 - 09:00', mensagem: 'Solicito a verificação.' }
        ]
      }
    ];

    const chamadosSalvos = JSON.parse(localStorage.getItem('kiron_lista_chamados'));
    if (!chamadosSalvos || chamadosSalvos.length === 0) {
      localStorage.setItem('kiron_lista_chamados', JSON.stringify(chamadosIniciais));
      setListaChamados(chamadosIniciais);
    } else {
      setListaChamados(chamadosSalvos);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    navigate('/Login');
  };

  // Lógica de Filtragem
  const chamadosFiltrados = listaChamados.filter((chamado) => {
    const atendeBusca =
      chamado.protocolo.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.assunto.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.dispositivo.toLowerCase().includes(busca.toLowerCase());

    const atendeStatus =
      filtroStatus === 'Todos' || chamado.status === filtroStatus;

    const atendePrioridade =
      filtroPrioridade === 'Todas' || chamado.prioridade === filtroPrioridade;

    return atendeBusca && atendeStatus && atendePrioridade;
  });

  return (
    <div className={styles.pageWrapper}>
      {/* BARRA LATERAL (SIDEBAR) */}
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
            <h1>Gerenciamento de Chamados</h1>
            <p className={styles.welcomeText}>
              Consulte e acompanhe o histórico completo dos tickets da sua empresa
            </p>
          </div>
          <button className={styles.btnNovoChamado} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-plus"></i> Abrir Novo Chamado
          </button>
        </header>

        {/* BARRA DE FILTROS E PESQUISA DA PLANILHA */}
        <section className={styles.filterSection}>
          <div className={styles.searchBox}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar por protocolo, assunto ou dispositivo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterSelectWrapper}>
              <label><i className="fa-solid fa-filter"></i> Status:</label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="Todos">Todos os Status</option>
                <option value="Em Atendimento">Em Atendimento</option>
                <option value="Pendente">Pendente</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>

            <div className={styles.filterSelectWrapper}>
              <label><i className="fa-solid fa-triangle-exclamation"></i> Prioridade:</label>
              <select
                value={filtroPrioridade}
                onChange={(e) => setFiltroPrioridade(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="Todas">Todas as Prioridades</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>
        </section>

        {/* TABELA PLANILHA EXECUTIVA */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-table-list"></i> Histórico de Registros
            </h2>
            <span className={styles.counterBadge}>
              Exibindo {chamadosFiltrados.length} de {listaChamados.length} chamados
            </span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Assunto / Ocorrência</th>
                  <th>Categoria</th>
                  <th>Equipamento</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Abertura</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((item, idx) => (
                    <tr key={idx}>
                      <td className={styles.codeCell}>{item.protocolo}</td>
                      <td><strong>{item.assunto}</strong></td>
                      <td>{item.categoria}</td>
                      <td>{item.dispositivo}</td>
                      <td>
                        <span
                          className={`${styles.badgePriority} ${
                            item.prioridade === 'Alta'
                              ? styles.high
                              : item.prioridade === 'Média'
                              ? styles.medium
                              : styles.low
                          }`}
                        >
                          {item.prioridade}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.badgeStatus} ${
                            item.status === 'Em Atendimento'
                              ? styles.inProgress
                              : item.status === 'Pendente'
                              ? styles.pending
                              : styles.done
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.dataAbertura}</td>
                      <td>
                        <button
                          className={styles.actionBtn}
                          onClick={() => navigate('/DetalhesChamado', { state: { protocolo: item.protocolo } })}
                          title="Ver detalhes do chamado"
                        >
                          <i className="fa-solid fa-eye"></i> Detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className={styles.noResults}>
                      <i className="fa-solid fa-folder-open"></i> Nenhum chamado encontrado com os filtros aplicados.
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