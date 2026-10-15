import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './GerenciarSaude.module.css';

const GerenciarSaude = () => {
  const navigate = useNavigate();

  const [equipamentos, setEquipamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroSaude, setFiltroSaude] = useState('Todos');

  // Estados do Modal de Abrir Chamado Preventivo
  const [modalAberto, setModalAberto] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [formChamado, setFormChamado] = useState({
    categoria: 'Hardware',
    prioridade: 'Alta',
    descricao: ''
  });
  const [enviando, setEnviando] = useState(false);

  const [tecnico, setTecnico] = useState({
    nome: 'Técnico',
    cargo: 'Suporte Nível 2'
  });

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosUsuario) {
      setTecnico({
        nome: dadosUsuario.nome || 'Técnico de Suporte',
        cargo: dadosUsuario.cargo || 'Equipe Kiron TI'
      });
    }

    carregarEquipamentos();
  }, [navigate]);

  const carregarEquipamentos = async () => {
    try {
      setCarregando(true);
      const res = await api.get('/equipamentos');
      setEquipamentos(res.data);
    } catch (err) {
      console.error('Erro de conexão com a API ao buscar equipamentos:', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  // Correção da detecção do status "Verde" / Saudável
  const getSaudeBadge = (statusSaude) => {
    const st = (statusSaude || 'verde').toLowerCase();
    if (st.includes('ótimo') || st.includes('otimo') || st.includes('saudável') || st.includes('saudavel') || st.includes('verde')) {
      return { class: styles.badgeSaudavel, label: 'Saudável' };
    }
    if (st.includes('alerta') || st.includes('atenção') || st.includes('atencao') || st.includes('amarelo')) {
      return { class: styles.badgeAlerta, label: 'Em Alerta' };
    }
    return { class: styles.badgeCritico, label: 'Crítico' };
  };

  const equipamentosFiltrados = equipamentos.filter((eq) => {
    const atendeBusca = 
      (eq.nome || '').toLowerCase().includes(busca.toLowerCase()) ||
      (eq.tipo || '').toLowerCase().includes(busca.toLowerCase()) ||
      (eq.sistemaOperacional || '').toLowerCase().includes(busca.toLowerCase());

    const statusSaude = (eq.statusSaude || 'verde').toLowerCase();

    if (!atendeBusca) return false;
    if (filtroSaude === 'Todos') return true;
    if (filtroSaude === 'Saudável') return statusSaude.includes('ótimo') || statusSaude.includes('saudável') || statusSaude.includes('otimo') || statusSaude.includes('verde');
    if (filtroSaude === 'Alerta') return statusSaude.includes('alerta') || statusSaude.includes('atenção') || statusSaude.includes('amarelo');
    if (filtroSaude === 'Crítico') return statusSaude.includes('crítico') || statusSaude.includes('critico') || statusSaude.includes('vermelho');
    return true;
  });

  const totalEquipamentos = equipamentos.length;
  const qtdAlertas = equipamentos.filter(e => (e.statusSaude || '').toLowerCase().includes('alerta') || (e.statusSaude || '').toLowerCase().includes('amarelo')).length;
  const qtdCriticos = equipamentos.filter(e => (e.statusSaude || '').toLowerCase().includes('crítico') || (e.statusSaude || '').toLowerCase().includes('critico') || (e.statusSaude || '').toLowerCase().includes('vermelho')).length;

  // Abertura e envio do Modal Preventivo
  const handleAbrirModal = (eq) => {
    setEquipamentoSelecionado(eq);
    const badge = getSaudeBadge(eq.statusSaude);
    setFormChamado({
      categoria: 'Hardware',
      prioridade: badge.label === 'Crítico' ? 'Alta' : 'Média',
      descricao: ''
    });
    setModalAberto(true);
  };

  const handleSalvarChamadoPreventivo = async (e) => {
    e.preventDefault();

    if (!formChamado.descricao.trim()) {
      alert('Por favor, informe a descrição da manutenção ou problema observado.');
      return;
    }

    try {
      setEnviando(true);
      const payload = {
        titulo: `[Preventiva] ${equipamentoSelecionado.nome}`,
        descricao: formChamado.descricao,
        categoria: formChamado.categoria,
        prioridade: formChamado.prioridade,
        equipamentoId: equipamentoSelecionado.id
      };

      await api.post('/chamados', payload);
      alert(`Chamado preventivo registrado com sucesso para o equipamento ${equipamentoSelecionado.nome}!`);
      setModalAberto(false);
    } catch (err) {
      console.error('Erro ao registrar chamado preventivo:', err);
      alert('Erro ao enviar o chamado para o servidor. Verifique o console.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> <span className={styles.badgeStaff}>STAFF</span></h2>
        </div>
        <div className={styles.techProfile}>
          <div className={styles.avatar}><i className="fa-solid fa-headset"></i></div>
          <div>
            <p className={styles.techName}>{tecnico.nome}</p>
            <p className={styles.techRole}>{tecnico.cargo}</p>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <button onClick={() => navigate('/FilaTecnico')}>
            <i className="fa-solid fa-list-check"></i> Fila de Chamados
          </button>
          <button onClick={() => navigate('/agendaTecnico')}>
            <i className="fa-solid fa-calendar-days"></i> Minha Agenda
          </button>
          <button className={styles.activeMenu} onClick={() => navigate('/gerenciarSaude')}>
            <i className="fa-solid fa-heart-pulse"></i> Saúde dos PCs
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
          <h1>Monitoramento e Saúde dos Equipamentos</h1>
        </header>

        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconTotal}><i className="fa-solid fa-desktop"></i></div>
            <div className={styles.kpiInfo}>
              <p>Total Monitorado</p>
              <h3>{totalEquipamentos}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconWarning}><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Em Alerta</p>
              <h3>{qtdAlertas}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconDanger}><i className="fa-solid fa-circle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Críticos / Atenção Máxima</p>
              <h3>{qtdCriticos}</h3>
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Buscar por equipamento, tipo ou sistema..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className={styles.filterTabs}>
              <button 
                className={filtroSaude === 'Todos' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Todos')}
              >
                Todos ({equipamentos.length})
              </button>
              <button 
                className={filtroSaude === 'Saudável' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Saudável')}
              >
                Saudáveis
              </button>
              <button 
                className={filtroSaude === 'Alerta' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Alerta')}
              >
                Alerta
              </button>
              <button 
                className={filtroSaude === 'Crítico' ? styles.tabActive : styles.tab}
                onClick={() => setFiltroSaude('Crítico')}
              >
                Críticos
              </button>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Equipamento</th>
                  <th>Tipo</th>
                  <th>S.O.</th>
                  <th>Status de Saúde</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>Carregando saúde dos computadores...</td>
                  </tr>
                ) : equipamentosFiltrados.length > 0 ? (
                  equipamentosFiltrados.map((eq) => {
                    const badgeInfo = getSaudeBadge(eq.statusSaude);
                    return (
                      <tr key={eq.id}>
                        <td><strong>#EQ-{eq.id}</strong></td>
                        <td><strong>{eq.nome}</strong></td>
                        <td>{eq.tipo}</td>
                        <td>{eq.sistemaOperacional || 'Windows 11'}</td>
                        <td>
                          <span className={`${styles.badge} ${badgeInfo.class}`}>
                            {badgeInfo.label}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={styles.btnAcao}
                            onClick={() => handleAbrirModal(eq)}
                            title="Abrir chamado preventivo para este PC"
                          >
                            <i className="fa-solid fa-plus"></i> Abrir Chamado
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>
                      Nenhum equipamento encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal de Abertura de Chamado Preventivo */}
      {modalAberto && equipamentoSelecionado && (
        <div className={styles.modalOverlay} onClick={() => setModalAberto(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2><i className="fa-solid fa-headset"></i> Chamado Preventivo (NOC)</h2>
              <button className={styles.closeModalBtn} onClick={() => setModalAberto(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSalvarChamadoPreventivo} className={styles.modalForm}>
              <div className={styles.modalInfoBox}>
                <p><strong>Máquina Alvo:</strong> #{equipamentoSelecionado.id} - {equipamentoSelecionado.nome}</p>
                <p><strong>Tipo/SO:</strong> {equipamentoSelecionado.tipo} ({equipamentoSelecionado.sistemaOperacional || 'Windows 11'})</p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroupModal}>
                  <label>Categoria</label>
                  <select 
                    value={formChamado.categoria}
                    onChange={(e) => setFormChamado({...formChamado, categoria: e.target.value})}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Rede">Rede</option>
                    <option value="Manutenção">Manutenção Preventiva</option>
                  </select>
                </div>

                <div className={styles.inputGroupModal}>
                  <label>Prioridade</label>
                  <select 
                    value={formChamado.prioridade}
                    onChange={(e) => setFormChamado({...formChamado, prioridade: e.target.value})}
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroupModal}>
                <label>Descrição do Problema / Atuação *</label>
                <textarea 
                  rows="4"
                  placeholder="Descreva a anomalia ou ajuste preventivo necessário..."
                  value={formChamado.descricao}
                  onChange={(e) => setFormChamado({...formChamado, descricao: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancelModal} onClick={() => setModalAberto(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSubmitModal} disabled={enviando}>
                  {enviando ? 'Gerando Ticket...' : 'Abrir Chamado no Banco'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarSaude;