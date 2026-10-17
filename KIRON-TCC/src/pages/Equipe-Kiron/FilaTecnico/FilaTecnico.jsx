import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './FilaTecnico.module.css';

const FilaTecnico = () => {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState('Fila Geral');
  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [chamadoDetalhes, setChamadoDetalhes] = useState(null);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [chamadoEdicao, setChamadoEdicao] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [formEdicao, setFormEdicao] = useState({
    parecerTecnico: '',
    prioridade: 'Média',
    status: 'Em Andamento'
  });

  const [tecnico, setTecnico] = useState({
    nome: 'Técnico',
    cargo: 'Suporte Nível 2'
  });

  const carregarChamados = async () => {
    try {
      setCarregando(true);
      const res = await api.get('/chamados');
      setChamados(res.data);
    } catch (err) {
      console.error('Erro ao buscar fila de chamados:', err);
    } finally {
      setCarregando(false);
    }
  };

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

    carregarChamados();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const dadosUsuarioLogado = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
  const meuId = dadosUsuarioLogado ? dadosUsuarioLogado.id : null;

  const chamadosFiltrados = chamados.filter((chamado) => {
    const st = (chamado.status || '').toLowerCase();
    
    if (filtro === 'Fila Geral') {
      return st === 'aberto' || st === 'pendente';
    }
    
    if (filtro === 'Meus Chamados') {
      return (st === 'em andamento' || st === 'atendimento') && chamado.tecnicoId === meuId;
    }

    if (filtro === 'Concluídos') {
      return (st === 'concluído' || st === 'concluido' || st === 'finalizado') && chamado.tecnicoId === meuId;
    }
    
    return true;
  });

  // KPIs
  const qtdFilaGeral = chamados.filter(c => (c.status || '').toLowerCase() === 'aberto').length;
  const qtdMeusChamados = chamados.filter(c => 
    (c.status || '').toLowerCase() === 'em andamento' && c.tecnicoId === meuId
  ).length;
  const qtdConcluidosMeus = chamados.filter(c => 
    ((c.status || '').toLowerCase() === 'concluído' || (c.status || '').toLowerCase() === 'concluido') && c.tecnicoId === meuId
  ).length;

  const getNomeEmpresa = (chamado) => {
    if (chamado.usuario?.empresa && chamado.usuario.empresa.trim() !== '') {
      return chamado.usuario.empresa;
    }
    if (chamado.equipamento?.usuario?.empresa && chamado.equipamento.usuario.empresa.trim() !== '') {
      return chamado.equipamento.usuario.empresa;
    }
    if (chamado.empresa && chamado.empresa.trim() !== '') {
      return chamado.empresa;
    }
    return 'Empresa N/A';
  };

  const assumirChamado = async (id) => {
    try {
      const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
      
      const payload = { 
        status: 'Em Andamento',
        tecnicoId: String(dadosUsuario.id)
      };

      await api.put(`/chamados/${id}/status`, payload);
      alert(`Você assumiu o chamado #KR-${id}! Ele agora está em andamento na sua lista.`);
      carregarChamados();
    } catch (err) {
      console.error('Erro ao assumir chamado:', err);
      alert('Erro ao assumir o chamado no banco de dados.');
    }
  };

  // Opens Modal for Viewing Details (Read-only)
  const abrirVisualizacao = (chamado) => {
    setChamadoDetalhes(chamado);
    setModalDetalhesAberto(true);
  };

  // Opens Modal for Editing Parameters
  const abrirModalGerenciar = (chamado) => {
    setChamadoEdicao(chamado);
    setFormEdicao({
      parecerTecnico: chamado.parecerTecnico || '',
      prioridade: chamado.prioridade || 'Média',
      status: chamado.status || 'Em Andamento'
    });
    setModalEditarAberto(true);
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    if (!chamadoEdicao) return;

    try {
      setSalvando(true);
      const payload = {
        parecerTecnico: formEdicao.parecerTecnico,
        prioridade: formEdicao.prioridade,
        status: formEdicao.status
      };

      await api.put(`/chamados/${chamadoEdicao.id}/parecer`, payload);
      alert('Chamado atualizado com sucesso!');
      setModalEditarAberto(false);
      carregarChamados();
    } catch (err) {
      console.error('Erro ao salvar alterações do chamado:', err);
      alert('Erro ao atualizar o chamado.');
    } finally {
      setSalvando(false);
    }
  };

  const handleReabrir = async () => {
    if (!chamadoEdicao) return;
    if (!window.confirm('Deseja realmente reabrir este chamado para "Em Andamento"?')) return;

    try {
      setSalvando(true);
      const payload = {
        status: 'Em Andamento',
        parecerTecnico: formEdicao.parecerTecnico,
        prioridade: formEdicao.prioridade
      };

      await api.put(`/chamados/${chamadoEdicao.id}/parecer`, payload);
      alert('Chamado reaberto com sucesso!');
      setModalEditarAberto(false);
      carregarChamados();
    } catch (err) {
      console.error('Erro ao reabrir chamado:', err);
      alert('Erro ao reabrir o chamado.');
    } finally {
      setSalvando(false);
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
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-list-check"></i> Fila de Chamados
          </button>
          <button onClick={() => navigate('/agendaTecnico')}>
            <i className="fa-solid fa-calendar-days"></i> Minha Agenda
          </button>
          <button onClick={() => navigate('/gerenciarSaude')}>
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
          <h1>Painel de Atendimentos</h1>
        </header>

        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconAlert}><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Fila Geral (Não Assumidos)</p>
              <h3>{qtdFilaGeral}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconSuccess}><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <div className={styles.kpiInfo}>
              <p>Meus Chamados Atuais</p>
              <h3>{qtdMeusChamados}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconDone} style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className={styles.kpiInfo}>
              <p>Meus Atendimentos Concluídos</p>
              <h3>{qtdConcluidosMeus}</h3>
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className={styles.filterTabs}>
            <button 
              className={filtro === 'Fila Geral' ? styles.tabActive : styles.tab}
              onClick={() => setFiltro('Fila Geral')}
            >
              Fila Geral (Para Pegar)
            </button>
            <button 
              className={filtro === 'Meus Chamados' ? styles.tabActive : styles.tab}
              onClick={() => setFiltro('Meus Chamados')}
            >
              Meus Atendimentos
            </button>
            <button 
              className={filtro === 'Concluídos' ? styles.tabActive : styles.tab}
              onClick={() => setFiltro('Concluídos')}
            >
              Histórico / Concluídos
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empresa</th>
                  <th>Equipamento</th>
                  <th>Categoria</th>
                  <th>Prioridade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>Carregando chamados do banco de dados...</td>
                  </tr>
                ) : chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((chamado) => (
                    <tr key={chamado.id}>
                      <td><strong>#KR-{chamado.id}</strong></td>
                      <td>
                        <strong>{getNomeEmpresa(chamado)}</strong>
                      </td>
                      <td>{chamado.equipamento ? `${chamado.equipamento.nome}` : 'Equipamento N/A'}</td>
                      <td>{chamado.categoria || 'Geral'}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + (chamado.prioridade || 'Media')]}`}>
                          {chamado.prioridade || 'Média'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          {filtro === 'Fila Geral' && (
                            <>
                              <button className={styles.btnIcon} onClick={() => abrirVisualizacao(chamado)} title="Visualizar Detalhes">
                                <i className="fa-solid fa-eye"></i>
                              </button>
                              <button className={styles.btnAssumir} onClick={() => assumirChamado(chamado.id)}>
                                Assumir
                              </button>
                            </>
                          )}

                          {filtro === 'Meus Chamados' && (
                            <>
                              <button className={styles.btnIcon} onClick={() => abrirVisualizacao(chamado)} title="Visualizar Detalhes">
                                <i className="fa-solid fa-eye"></i>
                              </button>
                              <button className={styles.btnResolver} onClick={() => navigate(`/atendimentoChamado/${chamado.id}`)}>
                                Atender
                              </button>
                            </>
                          )}

                          {filtro === 'Concluídos' && (
                            <>
                              <button 
                                className={styles.btnIcon} 
                                onClick={() => abrirVisualizacao(chamado)} 
                                title="Visualizar Parecer Técnico"
                                style={{ backgroundColor: '#22c55e', color: '#fff', width: 'auto', padding: '0 12px', gap: '6px' }}
                              >
                                <i className="fa-solid fa-file-contract"></i> Ver Parecer
                              </button>
                              <button className={styles.btnIcon} onClick={() => abrirModalGerenciar(chamado)} title="Editar Parecer / Reabrir Chamado">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>
                      Nenhum chamado nesta lista.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      
      {modalDetalhesAberto && chamadoDetalhes && (
        <div className={styles.modalOverlay} onClick={() => setModalDetalhesAberto(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2><i className="fa-solid fa-file-contract"></i> Detalhes e Parecer #KR-{chamadoDetalhes.id}</h2>
              <button className={styles.closeModalBtn} onClick={() => setModalDetalhesAberto(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.infoGroupGrid}>
                <div>
                  <strong>Empresa:</strong>
                  <p>{getNomeEmpresa(chamadoDetalhes)}</p>
                </div>
                <div>
                  <strong>Equipamento:</strong>
                  <p>{chamadoDetalhes.equipamento?.nome || 'N/A'}</p>
                </div>
                <div>
                  <strong>Categoria:</strong>
                  <p>{chamadoDetalhes.categoria || 'Geral'}</p>
                </div>
                <div>
                  <strong>Prioridade:</strong>
                  <p>{chamadoDetalhes.prioridade || 'Média'}</p>
                </div>
                <div>
                  <strong>Status Atual:</strong>
                  <p>{chamadoDetalhes.status}</p>
                </div>
                <div>
                  <strong>Data de Abertura:</strong>
                  <p>{chamadoDetalhes.dataCriacao ? new Date(chamadoDetalhes.dataCriacao).toLocaleDateString('pt-BR') : 'Hoje'}</p>
                </div>
              </div>

              <div className={styles.descricaoBox}>
                <strong><i className="fa-solid fa-circle-info"></i> Problema Relatado pelo Cliente:</strong>
                <p>{chamadoDetalhes.descricao || chamadoDetalhes.titulo || 'Sem descrição cadastrada.'}</p>
              </div>

              <div className={styles.parecerViewBox}>
                <strong><i className="fa-solid fa-circle-check"></i> Parecer Técnico / Solução Aplicada:</strong>
                <p>
                  {chamadoDetalhes.parecerTecnico && chamadoDetalhes.parecerTecnico.trim() !== ''
                    ? chamadoDetalhes.parecerTecnico
                    : 'Nenhum parecer técnico foi registrado até o momento.'}
                </p>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.btnSaveModal}
                  onClick={() => setModalDetalhesAberto(false)}
                  style={{ marginLeft: 'auto' }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {modalEditarAberto && chamadoEdicao && (
        <div className={styles.modalOverlay} onClick={() => setModalEditarAberto(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2><i className="fa-solid fa-pen-to-square"></i> Editar Chamado #KR-{chamadoEdicao.id}</h2>
              <button className={styles.closeModalBtn} onClick={() => setModalEditarAberto(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.infoGroupGrid}>
                <div>
                  <strong>Empresa:</strong>
                  <p>{getNomeEmpresa(chamadoEdicao)}</p>
                </div>
                <div>
                  <strong>Equipamento:</strong>
                  <p>{chamadoEdicao.equipamento?.nome || 'N/A'}</p>
                </div>
              </div>

              <div className={styles.descricaoBox}>
                <strong><i className="fa-solid fa-circle-info"></i> Problema Relatado:</strong>
                <p>{chamadoEdicao.descricao || chamadoEdicao.titulo || 'Sem descrição.'}</p>
              </div>

              <form onSubmit={handleSalvarEdicao} className={styles.formGerenciar}>
                <div className={styles.formRow}>
                  <div className={styles.inputField}>
                    <label>Prioridade:</label>
                    <select
                      value={formEdicao.prioridade}
                      onChange={(e) => setFormEdicao({ ...formEdicao, prioridade: e.target.value })}
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>

                  <div className={styles.inputField}>
                    <label>Status do Chamado:</label>
                    <select
                      value={formEdicao.status}
                      onChange={(e) => setFormEdicao({ ...formEdicao, status: e.target.value })}
                    >
                      <option value="Aberto">Aberto</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputField}>
                  <label><i className="fa-solid fa-clipboard-check"></i> Escrever / Editar Parecer Técnico:</label>
                  <textarea
                    rows="5"
                    placeholder="Descreva a solução aplicada, testes realizados ou observações..."
                    value={formEdicao.parecerTecnico}
                    onChange={(e) => setFormEdicao({ ...formEdicao, parecerTecnico: e.target.value })}
                  ></textarea>
                </div>

                <div className={styles.modalActions}>
                  {(formEdicao.status === 'Concluído' || chamadoEdicao.status === 'Concluído') && (
                    <button
                      type="button"
                      className={styles.btnReabrir}
                      onClick={handleReabrir}
                      disabled={salvando}
                    >
                      <i className="fa-solid fa-rotate-left"></i> Reabrir Chamado
                    </button>
                  )}

                  <div className={styles.rightActions}>
                    <button
                      type="button"
                      className={styles.btnCancelModal}
                      onClick={() => setModalEditarAberto(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className={styles.btnSaveModal}
                      disabled={salvando}
                    >
                      {salvando ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilaTecnico;