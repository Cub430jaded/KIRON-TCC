import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import api from '../../../services/api';
import styles from './ChamadosGestor.module.css';

const ChamadosGestor = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  const [chamados, setChamados] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do Modal de Abertura de Chamado pelo Gestor
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [formNovoChamado, setFormNovoChamado] = useState({
    titulo: '',
    equipamentoId: '',
    categoria: 'Hardware',
    prioridade: 'Média',
    descricao: ''
  });

  const carregarChamados = async () => {
    try {
      setCarregando(true);
      const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
      const usuarioId = dadosUsuario ? dadosUsuario.id : null;

      if (usuarioId) {
        const res = await api.get(`/chamados/usuario/${usuarioId}`);
        setChamados(res.data);
      } else {
        setChamados([]);
      }
    } catch (err) {
      console.error('Erro ao buscar chamados:', err);
    } finally {
      setCarregando(false);
    }
  };

  const carregarEquipamentos = async () => {
    try {
      const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
      const usuarioId = dadosUsuario ? dadosUsuario.id : null;

      if (usuarioId) {
        const res = await api.get(`/equipamentos/usuario/${usuarioId}`);
        setEquipamentos(res.data);
      }
    } catch (err) {
      console.error('Erro ao buscar equipamentos:', err);
    }
  };

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    carregarChamados();
    carregarEquipamentos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const handleCriarChamado = async (e) => {
    e.preventDefault();

    if (!formNovoChamado.equipamentoId) {
      alert('Por favor, selecione o equipamento afetado.');
      return;
    }

    try {
      setEnviando(true);
      const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));

      const payload = {
        titulo: formNovoChamado.titulo,
        descricao: formNovoChamado.descricao,
        categoria: formNovoChamado.categoria,
        prioridade: formNovoChamado.prioridade,
        equipamentoId: Number(formNovoChamado.equipamentoId),
        usuarioId: dadosUsuario?.id ? Number(dadosUsuario.id) : null
      };

      await api.post('/chamados', payload);
      alert('Chamado registrado com sucesso!');
      setModalNovoAberto(false);
      setFormNovoChamado({
        titulo: '',
        equipamentoId: '',
        categoria: 'Hardware',
        prioridade: 'Média',
        descricao: ''
      });
      carregarChamados();
    } catch (err) {
      console.error('Erro ao registrar chamado:', err);
      alert('Erro ao registrar chamado. Verifique os dados e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const chamadosFiltrados = chamados.filter((chamado) => {
    if (filtroAtivo === 'Todos') return true;
    const st = (chamado.status || '').toLowerCase();
    if (filtroAtivo === 'Aberto') return st.includes('aberto') || st.includes('pendente');
    if (filtroAtivo === 'Em Andamento') return st.includes('andamento') || st.includes('atendimento');
    if (filtroAtivo === 'Concluído') return st.includes('concluído') || st.includes('finalizado');
    return true;
  });

  const abrirDetalhes = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
  };

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> Gestor</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <button onClick={() => navigate('/dashboardGestor')}>
            <i className="fa-solid fa-chart-pie"></i> Visão Geral
          </button>
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-ticket"></i> Chamados
          </button>
          <button onClick={() => navigate('/cadastroEquipamento')}>
            <i className="fa-solid fa-desktop"></i> Equipamentos
          </button>
          <button onClick={() => navigate('/cadastroFuncionario')}>
            <i className="fa-solid fa-user-plus"></i> Funcionários
          </button>
          <button onClick={() => navigate('/financeiro')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Financeiro
          </button>
          <button onClick={() => navigate('/consultoria')}>
            <i className="fa-solid fa-handshake"></i> Consultoria
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
          <h1>Central de Chamados</h1>
          <button className={styles.btnNovaAbertura} onClick={() => setModalNovoAberto(true)}>
            <i className="fa-solid fa-plus"></i> Abrir Chamado
          </button>
        </header>

        <section className={styles.listSection}>
          <div className={styles.filterTabs}>
            <button 
              className={filtroAtivo === 'Todos' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Todos')}
            >
              Todos ({chamados.length})
            </button>
            <button 
              className={filtroAtivo === 'Aberto' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Aberto')}
            >
              Abertos
            </button>
            <button 
              className={filtroAtivo === 'Em Andamento' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Em Andamento')}
            >
              Em Andamento
            </button>
            <button 
              className={filtroAtivo === 'Concluído' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Concluído')}
            >
              Concluídos
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID / Data</th>
                  <th>Equipamento</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      Carregando chamados do banco...
                    </td>
                  </tr>
                ) : chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((chamado) => (
                    <tr key={chamado.id}>
                      <td>
                        <strong>#KR-{chamado.id}</strong>
                        <br/>
                        <span className={styles.dateText}>
                          {chamado.dataCriacao ? new Date(chamado.dataCriacao).toLocaleDateString('pt-BR') : 'Hoje'}
                        </span>
                      </td>
                      <td>{chamado.equipamento ? chamado.equipamento.nome : 'N/A'}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + (chamado.prioridade || 'Media')]}`}>
                          {chamado.prioridade || 'Média'}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles['status' + (chamado.status || 'Aberto').replace(/\s+/g, '')]}`}>
                          {chamado.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnAction} onClick={() => abrirDetalhes(chamado)} title="Ver Detalhes">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      Nenhum chamado encontrado para este filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal de Detalhes do Chamado */}
      <ModalDetalhesChamado 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        chamado={chamadoSelecionado} 
      />

      {/* Modal de Abertura de Chamado pelo Gestor */}
      {modalNovoAberto && (
        <div className={styles.modalOverlay} onClick={() => setModalNovoAberto(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2><i className="fa-solid fa-circle-plus"></i> Abrir Novo Chamado</h2>
              <button className={styles.closeModalBtn} onClick={() => setModalNovoAberto(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleCriarChamado} className={styles.modalForm}>
              <div className={styles.inputGroupModal}>
                <label>Assunto / Título Resumido *</label>
                <input 
                  type="text" 
                  placeholder="Ex: Falha de conexão na rede local"
                  value={formNovoChamado.titulo}
                  onChange={(e) => setFormNovoChamado({...formNovoChamado, titulo: e.target.value})}
                  required
                />
              </div>

              <div className={styles.inputGroupModal}>
                <label>Equipamento Afetado *</label>
                <select 
                  value={formNovoChamado.equipamentoId}
                  onChange={(e) => setFormNovoChamado({...formNovoChamado, equipamentoId: e.target.value})}
                  required
                >
                  <option value="">-- Selecione o equipamento --</option>
                  {equipamentos.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      #{eq.id} - {eq.nome} ({eq.tipo})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroupModal}>
                  <label>Categoria</label>
                  <select 
                    value={formNovoChamado.categoria}
                    onChange={(e) => setFormNovoChamado({...formNovoChamado, categoria: e.target.value})}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Rede">Rede</option>
                    <option value="Impressora">Impressora</option>
                    <option value="Acesso/Senha">Acesso / Senha</option>
                  </select>
                </div>

                <div className={styles.inputGroupModal}>
                  <label>Prioridade</label>
                  <select 
                    value={formNovoChamado.prioridade}
                    onChange={(e) => setFormNovoChamado({...formNovoChamado, prioridade: e.target.value})}
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroupModal}>
                <label>Descrição do Problema *</label>
                <textarea 
                  rows="4"
                  placeholder="Descreva o problema observado..."
                  value={formNovoChamado.descricao}
                  onChange={(e) => setFormNovoChamado({...formNovoChamado, descricao: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancelModal} onClick={() => setModalNovoAberto(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSubmitModal} disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Registrar Chamado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChamadosGestor;