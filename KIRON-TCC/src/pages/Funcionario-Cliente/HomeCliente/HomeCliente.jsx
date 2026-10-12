import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeCliente.module.css';

const HomeCliente = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: 'Bruno Silva',
    setor: 'Setor de Gestão e Operações'
  });

  const [estatisticas, setEstatisticas] = useState({
    abertos: 1,
    emAndamento: 1,
    concluidos: 2
  });

  const [chamadosRecentes, setChamadosRecentes] = useState([]);

  useEffect(() => {
    // Validação da Sessão
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // Carrega dados do usuário logado (Nome e Setor/Cargo)
    const dadosSalvos = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosSalvos) {
      setUsuario({
        nome: dadosSalvos.nome || 'Bruno Silva',
        setor: dadosSalvos.cargo ? `Setor: ${dadosSalvos.cargo}` : 'Setor de TI e Operações'
      });
    }

    // Carrega os chamados do localStorage para a lista rápida e contadores
    const listaChamados = JSON.parse(localStorage.getItem('kiron_lista_chamados')) || [
      {
        id: 'KR-8021',
        protocolo: '#KR-8021',
        equipamento: 'PC-FINANCEIRO-02',
        categoria: 'Rede',
        assunto: 'Lentidão na rede do setor Financeiro',
        status: 'Em Andamento',
        dataAbertura: '12/10/2026'
      },
      {
        id: 'KR-8019',
        protocolo: '#KR-8019',
        equipamento: 'PC-RECEPCAO-01',
        categoria: 'Software',
        assunto: 'Instalação de software de edição no PC-04',
        status: 'Aberto',
        dataAbertura: '11/10/2026'
      },
      {
        id: 'KR-7994',
        protocolo: '#KR-7994',
        equipamento: 'SERVIDOR-LOCAL',
        categoria: 'Segurança',
        assunto: 'Configuração de rotina de backup em nuvem',
        status: 'Concluído',
        dataAbertura: '09/10/2026'
      }
    ];

    // Calcula os contadores dinamicamente
    let qtdAbertos = 0;
    let qtdEmAndamento = 0;
    let qtdConcluidos = 0;

    listaChamados.forEach(c => {
      const st = (c.status || '').toLowerCase();
      if (st.includes('aberto') || st.includes('pendente')) qtdAbertos++;
      else if (st.includes('andamento') || st.includes('atendimento')) qtdEmAndamento++;
      else if (st.includes('concluído') || st.includes('finalizado')) qtdConcluidos++;
    });

    setEstatisticas({
      abertos: qtdAbertos || 1,
      emAndamento: qtdEmAndamento || 1,
      concluidos: qtdConcluidos || 2
    });

    // Pega os últimos 3 chamados para a lista rápida
    setChamadosRecentes(listaChamados.slice(0, 3));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/Login');
  };

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

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        
        {/* HEADER DE BOAS-VINDAS */}
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

        {/* 3 CARDS DE RESUMO / INDICADORES */}
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

        {/* LISTA RÁPIDA DOS ÚLTIMOS CHAMADOS */}
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
                  <th>Abertura</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {chamadosRecentes.length > 0 ? (
                  chamadosRecentes.map((item, idx) => {
                    const idLimpo = (item.protocolo || item.id || '').replace('#', '');
                    return (
                      <tr key={idx}>
                        <td className={styles.codeCell}>{item.protocolo || `#${item.id}`}</td>
                        <td>{item.equipamento}</td>
                        <td>{item.categoria}</td>
                        <td><strong>{item.assunto}</strong></td>
                        <td>
                          <span className={`${styles.badgeStatus} ${getBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.dataAbertura}</td>
                        <td>
                          <button
                            className={styles.actionBtn}
                            onClick={() => navigate(`/DetalhesChamado/${idLimpo}`, { state: { protocolo: item.protocolo || `#${item.id}` } })}
                          >
                            <i className="fa-solid fa-eye"></i> Detalhes
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className={styles.noResults}>
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