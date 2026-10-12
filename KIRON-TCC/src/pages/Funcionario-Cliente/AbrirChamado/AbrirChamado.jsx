import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AbrirChamado.module.css';

const AbrirChamado = () => {
  const navigate = useNavigate();

  // Estados dos Campos do Formulário conforme especificação do TCC
  const [equipamento, setEquipamento] = useState('');
  const [categoria, setCategoria] = useState('Hardware');
  const [urgencia, setUrgencia] = useState('Média');
  const [descricao, setDescricao] = useState('');

  // Lista de Equipamentos (Simulando o consumo de GET /api/equipamentos)
  const [listaEquipamentos, setListaEquipamentos] = useState([
    { id: '1', nome: 'Notebook Dell - ID #1' },
    { id: '2', nome: 'PC Desktop Recepção - ID #2' },
    { id: '3', nome: 'PC Desktop Financeiro - ID #3' },
    { id: '4', nome: 'Servidor Local Data Center - ID #4' },
    { id: '5', nome: 'Impressora HP Laser - ID #5' }
  ]);

  useEffect(() => {
    // Validação da Sessão do Usuário
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/Login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!equipamento) {
      alert('Por favor, selecione o equipamento afetado.');
      return;
    }

    // Pega dados do usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    const nomeSolicitante = usuarioLogado?.nome || 'Bruno Silva';
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // Gera ID / Protocolo único
    const numeroId = Math.floor(1000 + Math.random() * 9000);
    const novoProtocolo = `#KR-${numeroId}`;

    // Estrutura completa do chamado conforme padrão do TCC
    const novoTicket = {
      id: `KR-${numeroId}`,
      protocolo: novoProtocolo,
      equipamento: equipamento,
      categoria: categoria,
      urgencia: urgencia,
      prioridade: urgencia, // para compatibilidade de termos
      status: 'Aberto',
      dataAbertura: dataAtual,
      solicitante: nomeSolicitante,
      descricao: descricao,
      parecerTecnico: '', // Será preenchido pelo técnico no fechamento
      historico: [
        {
          dataHora: `${dataAtual} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
          evento: 'Aberto pelo cliente',
          descricao: `Chamado registrado por ${nomeSolicitante}.`
        }
      ]
    };

    // Grava no localStorage
    const chamadosSalvos = JSON.parse(localStorage.getItem('kiron_lista_chamados')) || [];
    const novaLista = [novoTicket, ...chamadosSalvos];
    localStorage.setItem('kiron_lista_chamados', JSON.stringify(novaLista));

    // Redireciona para a lista de chamados
    navigate('/MeusChamados');
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
            <h1>Abrir Novo Chamado</h1>
            <p className={styles.welcomeText}>Preencha os dados abaixo para registrar sua solicitação técnica</p>
          </div>
          <button className={styles.btnVoltar} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar ao Dashboard
          </button>
        </header>

        {/* FORMULÁRIO */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-pen-to-square"></i> Detalhes da Solicitação
            </h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.formSheet}>
            
            {/* SELECT DE EQUIPAMENTO (GET /api/equipamentos) */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="selectEquipamento">
                <i className="fa-solid fa-desktop"></i> Equipamento Afetado:
              </label>
              <select
                id="selectEquipamento"
                className={styles.selectField}
                value={equipamento}
                onChange={(e) => setEquipamento(e.target.value)}
                required
              >
                <option value="">-- Selecione o equipamento cadastrado --</option>
                {listaEquipamentos.map((item) => (
                  <option key={item.id} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* SELECT DE CATEGORIA & SELECT DE URGÊNCIA (GRID DUPLO) */}
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="selectCategoria">
                  <i className="fa-solid fa-list"></i> Categoria do Problema:
                </label>
                <select
                  id="selectCategoria"
                  className={styles.selectField}
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Rede">Rede</option>
                  <option value="Impressora">Impressora</option>
                  <option value="Acesso/Senha">Acesso / Senha</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="selectUrgencia">
                  <i className="fa-solid fa-triangle-exclamation"></i> Nível de Urgência:
                </label>
                <select
                  id="selectUrgencia"
                  className={styles.selectField}
                  value={urgencia}
                  onChange={(e) => setUrgencia(e.target.value)}
                  required
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>

            {/* CAMPO DE DESCRIÇÃO (TEXTAREA) */}
            <div className={styles.inputGroupFull}>
              <label className={styles.label} htmlFor="textDescricao">
                <i className="fa-solid fa-align-left"></i> Descrição do Problema:
              </label>
              <textarea
                id="textDescricao"
                className={styles.textareaField}
                rows="6"
                placeholder="Descreva o problema com clareza (ex: A tela fica piscando ao abrir a planilha de faturamento)..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              ></textarea>
            </div>

            {/* AÇÕES DE ENVIO E CANCELAMENTO */}
            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSubmit}>
                <i className="fa-solid fa-paper-plane"></i> Enviar Chamado
              </button>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={() => navigate('/MeusChamados')}
              >
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