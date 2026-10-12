import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AbrirChamado.module.css';

const AbrirChamado = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [dispositivo, setDispositivo] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [categoria, setCategoria] = useState('Hardware');
  const [descricao, setDescricao] = useState('');
  const [arquivo, setArquivo] = useState(null);

  useEffect(() => {
    // Validação da Sessão do Usuário
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    navigate('/Login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Gera protocolo único aleatório
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    const novoProtocolo = `#KR-${numeroAleatorio}`;
    const dataAtual = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

    // 2. Cria estrutura do novo chamado mantendo todos os campos
    const novoChamado = {
      protocolo: novoProtocolo,
      assunto: titulo,
      categoria: categoria,
      dispositivo: dispositivo,
      prioridade: prioridade,
      status: 'Em Atendimento',
      dataAbertura: dataAtual,
      solicitante: 'Bruno Silva (Gestor)',
      tecnicoResponsavel: 'Suporte Kiron TI',
      descricaoInicial: descricao,
      historico: [
        {
          autor: 'Bruno Silva',
          papel: 'Cliente',
          data: dataAtual,
          mensagem: `Chamado aberto. Relato: ${descricao}`,
        },
        {
          autor: 'Suporte Kiron TI',
          papel: 'Suporte Kiron TI',
          data: dataAtual,
          mensagem: 'Ticket recebido com sucesso pela nossa equipe técnica. Em breve entraremos em contato.',
        }
      ]
    };

    // 3. Salva no localStorage preservando o histórico existente
    const chamadosSalvos = JSON.parse(localStorage.getItem('kiron_lista_chamados')) || [];
    const novaLista = [novoChamado, ...chamadosSalvos];
    localStorage.setItem('kiron_lista_chamados', JSON.stringify(novaLista));

    alert(`Chamado ${novoProtocolo} aberto com sucesso! Redirecionando para seus chamados.`);
    navigate('/MeusChamados');
  };

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
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/AbrirChamado')}>
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
        
        {/* CABEÇALHO */}
        <header className={styles.headerBlock}>
          <div>
            <h1>Novo Chamado Técnico</h1>
            <p className={styles.welcomeText}>Preencha as informações para encaminhar sua solicitação à equipe Kiron TI</p>
          </div>
          <button className={styles.btnVoltar} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar ao Dashboard
          </button>
        </header>

        {/* FORMULÁRIO ESTILO PLANILHA EXECUTIVA */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-file-signature"></i> Formulário de Abertura de Ticket
            </h2>
            <span className={styles.protocolBadge}>
              <i className="fa-solid fa-hashtag"></i> Gerando Protocolo Automático
            </span>
          </div>

          <form onSubmit={handleSubmit} className={styles.formSheet}>
            
            {/* LINHA 1: TÍTULO E DISPOSITIVO */}
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-pen-to-square"></i> Título / Assunto Resumido:
                </label>
                <input 
                  type="text" 
                  className={styles.inputField} 
                  placeholder="Ex: Lentidão intermitente no sistema de faturamento"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-desktop"></i> Dispositivo Afetado:
                </label>
                <select 
                  className={styles.inputField}
                  value={dispositivo}
                  onChange={(e) => setDispositivo(e.target.value)}
                  required
                >
                  <option value="">Selecione o equipamento cadastrado...</option>
                  <option value="PC-RECEPCAO-01">PC-RECEPCAO-01 (Recepção)</option>
                  <option value="PC-FINANCEIRO-02">PC-FINANCEIRO-02 (Financeiro)</option>
                  <option value="SERVIDOR-LOCAL">SERVIDOR-LOCAL (Data Center)</option>
                  <option value="Outro">Outro equipamento / Problema Geral</option>
                </select>
              </div>
            </div>

            {/* LINHA 2: CATEGORIA E SELETOR VISUAL DE PRIORIDADE */}
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-layer-group"></i> Categoria do Incidente:
                </label>
                <select 
                  className={styles.inputField}
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="Hardware">Hardware / Peças / Periféricos</option>
                  <option value="Software">Software / Programas / Sistema Operacional</option>
                  <option value="Rede">Rede / Conectividade / Internet</option>
                  <option value="Segurança">Segurança / Antivírus / Backup</option>
                  <option value="Outros">Outros assuntos / Dúvidas</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-triangle-exclamation"></i> Nível de Prioridade:
                </label>
                <div className={styles.priorityGrid}>
                  <button
                    type="button"
                    className={`${styles.priorityCard} ${styles.priorityLow} ${prioridade === 'Baixa' ? styles.selectedPriority : ''}`}
                    onClick={() => setPrioridade('Baixa')}
                  >
                    <i className="fa-solid fa-arrow-down"></i> Baixa
                  </button>

                  <button
                    type="button"
                    className={`${styles.priorityCard} ${styles.priorityMedium} ${prioridade === 'Média' ? styles.selectedPriority : ''}`}
                    onClick={() => setPrioridade('Média')}
                  >
                    <i className="fa-solid fa-minus"></i> Média
                  </button>

                  <button
                    type="button"
                    className={`${styles.priorityCard} ${styles.priorityHigh} ${prioridade === 'Alta' ? styles.selectedPriority : ''}`}
                    onClick={() => setPrioridade('Alta')}
                  >
                    <i className="fa-solid fa-fire"></i> Alta / Urgente
                  </button>
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO DO PROBLEMA */}
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>
                <i className="fa-solid fa-align-left"></i> Descrição Detalhada da Ocorrência:
              </label>
              <textarea 
                className={styles.textareaField} 
                rows="5"
                placeholder="Detalhe o que está acontecendo, mensagens de erro exibidas, horários do problema e passos para reproduzir..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              ></textarea>
            </div>

            {/* ÁREA DE UPLOAD DE ANEXOS MODERNA */}
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>
                <i className="fa-solid fa-paperclip"></i> Anexar Capturas de Tela / Evidências:
              </label>
              <div className={styles.fileDropZone}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <div className={styles.fileDropText}>
                  <strong>Clique para selecionar um arquivo</strong> ou arraste até aqui
                </div>
                <span className={styles.fileHint}>Formatos aceitos: PNG, JPG, PDF (Tamanho máximo: 10MB)</span>
                <input 
                  type="file" 
                  className={styles.hiddenFileInput}
                  onChange={(e) => setArquivo(e.target.files[0])}
                />
                {arquivo && (
                  <div className={styles.selectedFileName}>
                    <i className="fa-solid fa-file-check"></i> Arquivo selecionado: <strong>{arquivo.name}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* AÇÕES */}
            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSubmit}>
                <i className="fa-solid fa-check"></i> Finalizar e Enviar Chamado
              </button>
              <button type="button" className={styles.btnCancel} onClick={() => navigate('/HomeCliente')}>
                Cancelar
              </button>
            </div>

          </form>
        </section>

      </main>

    </div>
  );
};

export default AbrirChamado;