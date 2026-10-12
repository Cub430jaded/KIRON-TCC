import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styles from './DetalhesChamado.module.css';

const DetalhesChamado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [chamado, setChamado] = useState(null);

  useEffect(() => {
    // Validação da Sessão
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // Busca o ID vindo da rota ou do state
    const ticketIdAlvo = id || location.state?.ticketId || location.state?.protocolo?.replace('#', '');
    const listaSalva = JSON.parse(localStorage.getItem('kiron_lista_chamados')) || [];

    // Procura o chamado correspondente
    const encontrado = listaSalva.find(
      (c) => (c.id === ticketIdAlvo) || (c.protocolo === `#${ticketIdAlvo}`) || (c.protocolo === ticketIdAlvo)
    );

    if (encontrado) {
      setChamado(encontrado);
    } else {
      // Fallback de segurança caso acesse direto sem ID válido
      setChamado(listaSalva[0] || {
        id: 'KR-8021',
        protocolo: '#KR-8021',
        equipamento: 'PC-FINANCEIRO-02',
        categoria: 'Rede',
        urgencia: 'Alta',
        status: 'Em Andamento',
        dataAbertura: '12/10/2026',
        solicitante: 'Bruno Silva',
        assunto: 'Lentidão na rede do setor Financeiro',
        descricao: 'Os computadores do setor financeiro estão apresentando quedas intermitentes de conexão.',
        parecerTecnico: '',
        historico: [
          { dataHora: '12/10/2026 às 10:15', evento: 'Aberto pelo cliente', descricao: 'Chamado registrado no sistema.' },
          { dataHora: '12/10/2026 às 10:35', evento: 'Técnico assumiu', descricao: 'Carlos Eduardo iniciou a verificação do switch.' }
        ]
      });
    }
  }, [id, location.state, navigate]);

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

  if (!chamado) return null;

  return (
    <div className={styles.pageWrapper}>
      {/* SIDEBAR FIXA */}
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
        
        {/* CABEÇALHO DO TICKET */}
        <header className={styles.headerBlock}>
          <div>
            <h1>Detalhes do Ticket {chamado.protocolo || `#${chamado.id}`}</h1>
            <p className={styles.welcomeText}>
              <i className="fa-solid fa-calendar-days"></i> Data de Abertura: {chamado.dataAbertura}
            </p>
          </div>
          <div className={styles.headerRight}>
            <span className={`${styles.badgeStatus} ${getBadgeClass(chamado.status)}`}>
              Status: {chamado.status}
            </span>
            <button className={styles.btnVoltar} onClick={() => navigate('/MeusChamados')}>
              <i className="fa-solid fa-arrow-left"></i> Voltar à Lista
            </button>
          </div>
        </header>

        {/* DADOS DO PROBLEMA */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-circle-info"></i> Informações da Ocorrência
            </h2>
          </div>

          <div className={styles.gridInfo}>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Equipamento Afetado:</span>
              <span className={styles.infoValue}>{chamado.equipamento}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Categoria:</span>
              <span className={styles.infoValue}>{chamado.categoria}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Urgência:</span>
              <span className={styles.infoValue}>{chamado.urgencia || chamado.prioridade || 'Média'}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Solicitante:</span>
              <span className={styles.infoValue}>{chamado.solicitante}</span>
            </div>
          </div>

          <div className={styles.descriptionBox}>
            <strong><i className="fa-solid fa-align-left"></i> Relato / Descrição do Problema:</strong>
            <p>{chamado.descricao || chamado.assunto}</p>
          </div>
        </section>

        {/* ÁREA DE PARECER TÉCNICO (EXIGÊNCIA DO TCC) */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-file-shield"></i> Parecer Técnico de Fechamento
            </h2>
          </div>

          {chamado.parecerTecnico ? (
            <div className={styles.parecerBoxSuccess}>
              <div className={styles.parecerHeader}>
                <i className="fa-solid fa-circle-check"></i> <strong>Conclusão da Equipe Kiron TI:</strong>
              </div>
              <p>{chamado.parecerTecnico}</p>
            </div>
          ) : (
            <div className={styles.parecerBoxPending}>
              <i className="fa-solid fa-clock"></i> O chamado encontra-se em andamento. O parecer técnico detalhado será disponibilizado assim que a ocorrência for finalizada pela equipe de suporte.
            </div>
          )}
        </section>

        {/* HISTÓRICO / TIMELINE DE MUDANÇAS DE STATUS */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-timeline"></i> Histórico e Linha do Tempo
            </h2>
          </div>

          <div className={styles.timelineList}>
            {chamado.historico && chamado.historico.length > 0 ? (
              chamado.historico.map((hist, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeaderTime}>
                      <strong>{hist.evento}</strong>
                      <span className={styles.timeTag}>{hist.dataHora}</span>
                    </div>
                    <p className={styles.timelineDesc}>{hist.descricao}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noHistory}>Nenhum registro no histórico.</p>
            )}
          </div>
        </section>

      </main>
    </div>
  );
};

export default DetalhesChamado;