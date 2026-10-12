import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './DetalhesChamado.module.css';

const DetalhesChamado = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [novaMensagem, setNovaMensagem] = useState('');
  const [chamado, setChamado] = useState(null);
  const [nomeUsuarioAtual, setNomeUsuarioAtual] = useState('Bruno Silva Almeida');

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // Pega o nome real atualizado do Perfil / Login / Cadastro
    const usuarioLogado = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (usuarioLogado && usuarioLogado.nome) {
      setNomeUsuarioAtual(usuarioLogado.nome);
    }

    const protocoloAlvo = location.state?.protocolo || '#KR-8021';
    const listaSalva = JSON.parse(localStorage.getItem('kiron_lista_chamados')) || [];

    const encontrado = listaSalva.find((c) => c.protocolo === protocoloAlvo);

    if (encontrado) {
      // Garante que o solicitante reflita o usuário atual da sessão
      encontrado.solicitante = usuarioLogado?.nome ? `${usuarioLogado.nome} (Gestor)` : encontrado.solicitante;
      setChamado(encontrado);
    } else {
      setChamado(listaSalva[0] || {
        protocolo: '#KR-8021',
        assunto: 'Lentidão na rede do setor Financeiro',
        categoria: 'Rede e Conectividade',
        dispositivo: 'PC-FINANCEIRO-02',
        prioridade: 'Alta',
        status: 'Em Atendimento',
        solicitante: usuarioLogado?.nome ? `${usuarioLogado.nome} (Gestor)` : 'Bruno Silva (Gestor)',
        tecnicoResponsavel: 'Carlos Eduardo (Suporte Nível 2)',
        dataAbertura: '12/10/2026 - 10:15',
        descricaoInicial: 'Os computadores do setor financeiro estão apresentando quedas intermitentes de conexão.',
        historico: [
          { autor: usuarioLogado?.nome || 'Bruno Silva', papel: 'Cliente', data: '12/10/2026 - 10:15', mensagem: 'Chamado aberto.' }
        ]
      });
    }
  }, [location.state, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/Login');
  };

  const handleEnviarResposta = (e) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !chamado) return;

    const dataAtual = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

    // Usa o nome atualizado do usuário no chat
    const novaInteracao = {
      autor: nomeUsuarioAtual,
      papel: 'Cliente',
      data: dataAtual,
      mensagem: novaMensagem,
    };

    const chamadoAtualizado = {
      ...chamado,
      historico: [...chamado.historico, novaInteracao]
    };

    setChamado(chamadoAtualizado);

    const listaSalva = JSON.parse(localStorage.getItem('kiron_lista_chamados')) || [];
    const novaLista = listaSalva.map((c) => c.protocolo === chamado.protocolo ? chamadoAtualizado : c);
    localStorage.setItem('kiron_lista_chamados', JSON.stringify(novaLista));

    setNovaMensagem('');
  };

  if (!chamado) return null;

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
        <header className={styles.headerBlock}>
          <div>
            <h1>Detalhes do Ticket {chamado.protocolo}</h1>
            <p className={styles.welcomeText}>
              Acompanhe o andamento técnico e troque mensagens com a equipe Kiron TI
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnVoltar} onClick={() => navigate('/MeusChamados')}>
              <i className="fa-solid fa-arrow-left"></i> Voltar à Lista
            </button>
          </div>
        </header>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-file-lines"></i> Ficha de Controle do Chamado
            </h2>
            <div className={styles.statusGroup}>
              <span className={`${styles.badgePriority} ${chamado.prioridade === 'Alta' ? styles.high : chamado.prioridade === 'Média' ? styles.medium : styles.low}`}>
                Prioridade: {chamado.prioridade}
              </span>
              <span className={`${styles.badgeStatus} ${styles.inProgress}`}>
                Status: {chamado.status}
              </span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Informação</th>
                  <th>Campo</th>
                  <th>Informação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Protocolo</strong></td>
                  <td className={styles.codeCell}>{chamado.protocolo}</td>
                  <td><strong>Data/Hora Abertura</strong></td>
                  <td>{chamado.dataAbertura}</td>
                </tr>
                <tr>
                  <td><strong>Assunto / Título</strong></td>
                  <td><strong>{chamado.assunto}</strong></td>
                  <td><strong>Categoria</strong></td>
                  <td>{chamado.categoria}</td>
                </tr>
                <tr>
                  <td><strong>Equipamento Afetado</strong></td>
                  <td>{chamado.dispositivo}</td>
                  <td><strong>Solicitante</strong></td>
                  <td>{chamado.solicitante}</td>
                </tr>
                <tr>
                  <td><strong>Técnico Responsável</strong></td>
                  <td>{chamado.tecnicoResponsavel}</td>
                  <td><strong>SLA Estimado</strong></td>
                  <td>Até 2 horas úteis</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.initialDescriptionBox}>
            <strong><i className="fa-solid fa-align-left"></i> Relato Inicial do Incidente:</strong>
            <p>{chamado.descricaoInicial}</p>
          </div>
        </section>

        <section className={styles.sheetSection}>
          <h2 className={styles.sectionTitle}>
            <i className="fa-solid fa-comments"></i> Histórico de Interações
          </h2>

          <div className={styles.timelineList}>
            {chamado.historico && chamado.historico.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.timelineCard} ${
                  item.papel === 'Cliente' ? styles.clientMsg : styles.supportMsg
                }`}
              >
                <div className={styles.timelineHeader}>
                  <span className={styles.authorName}>
                    <i className={item.papel === 'Cliente' ? "fa-solid fa-user" : "fa-solid fa-user-shield"}></i>{' '}
                    <strong>{item.autor}</strong> ({item.papel})
                  </span>
                  <span className={styles.msgDate}>{item.data}</span>
                </div>
                <div className={styles.timelineBody}>{item.mensagem}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleEnviarResposta} className={styles.replyForm}>
            <label className={styles.replyLabel}>
              <i className="fa-solid fa-reply"></i> Responder ao Técnico:
            </label>
            <textarea
              className={styles.replyTextarea}
              rows="4"
              placeholder="Escreva sua resposta..."
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              required
            ></textarea>

            <div className={styles.replyFooter}>
              <button type="submit" className={styles.btnSend}>
                <i className="fa-solid fa-paper-plane"></i> Enviar Mensagem
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DetalhesChamado;