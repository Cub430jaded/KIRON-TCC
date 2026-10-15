import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './AbrirChamado.module.css';

const AbrirChamado = () => {
  const navigate = useNavigate();

  const [equipamentoId, setEquipamentoId] = useState('');
  const [categoria, setCategoria] = useState('Hardware');
  const [urgencia, setUrgencia] = useState('Média');
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');

  const [listaEquipamentos, setListaEquipamentos] = useState([]);
  const [carregandoEquipamentos, setCarregandoEquipamentos] = useState(true);

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const buscarEquipamentos = async () => {
      try {
        const res = await api.get('/equipamentos');
        setListaEquipamentos(res.data);
      } catch (err) {
        console.error('Erro ao buscar equipamentos:', err);
      } finally {
        setCarregandoEquipamentos(false);
      }
    };

    buscarEquipamentos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!equipamentoId) {
      alert('Por favor, selecione o equipamento afetado.');
      return;
    }

    const payload = {
      titulo: titulo || `${categoria} - ${urgencia}`,
      descricao,
      categoria,
      prioridade: urgencia,
      equipamentoId: Number(equipamentoId)
    };

    try {
      await api.post('/chamados', payload);
      alert('Chamado registrado com sucesso no banco de dados!');
      navigate('/MeusChamados');
    } catch (err) {
      console.error('Erro ao registrar chamado:', err);
      alert('Erro ao registrar chamado no servidor.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
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

      <main className={styles.mainContent}>
        <header className={styles.headerBlock}>
          <div>
            <h1>Abrir Novo Chamado</h1>
            <p className={styles.welcomeText}>Preencha os dados abaixo para registrar sua solicitação técnica</p>
          </div>
          <button className={styles.btnVoltar} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar ao Dashboard
          </button>
        </header>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-pen-to-square"></i> Detalhes da Solicitação
            </h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.formSheet}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label} htmlFor="textTitulo">
                <i className="fa-solid fa-heading"></i> Assunto / Título Resumido:
              </label>
              <input
                id="textTitulo"
                type="text"
                className={styles.selectField}
                placeholder="Ex: Monitor piscando sem sinal de vídeo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="selectEquipamento">
                <i className="fa-solid fa-desktop"></i> Equipamento Afetado:
              </label>
              <select
                id="selectEquipamento"
                className={styles.selectField}
                value={equipamentoId}
                onChange={(e) => setEquipamentoId(e.target.value)}
                required
              >
                <option value="">
                  {carregandoEquipamentos ? 'Carregando máquinas do banco...' : '-- Selecione o equipamento --'}
                </option>
                {listaEquipamentos.map((item) => (
                  <option key={item.id} value={item.id}>
                    #{item.id} - {item.nome} ({item.tipo})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="selectCategoria">
                  <i className="fa-solid fa-list"></i> Categoria:
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
                  <i className="fa-solid fa-triangle-exclamation"></i> Urgência:
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

            <div className={styles.inputGroupFull}>
              <label className={styles.label} htmlFor="textDescricao">
                <i className="fa-solid fa-align-left"></i> Descrição do Problema:
              </label>
              <textarea
                id="textDescricao"
                className={styles.textareaField}
                rows="6"
                placeholder="Descreva o problema com clareza..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              ></textarea>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSubmit}>
                <i className="fa-solid fa-paper-plane"></i> Enviar Chamado
              </button>
              <button type="button" className={styles.btnCancel} onClick={() => navigate('/MeusChamados')}>
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