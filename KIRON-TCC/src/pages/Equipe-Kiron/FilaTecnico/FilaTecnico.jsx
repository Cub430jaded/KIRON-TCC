import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import styles from './FilaTecnico.module.css';

const FilaTecnico = () => {
  const navigate = useNavigate();

  // Estados do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  // Filtro da Fila
  const [filtro, setFiltro] = useState('Fila Geral'); // 'Fila Geral' ou 'Meus Chamados'

  // Mock simulando o banco de dados
  const chamados = [
    { id: '1048', cliente: 'TechCorp', equipamento: 'Servidor Local', prioridade: 'Alta', status: 'Aberto', tecnico: null, descricao: 'Servidor fora do ar, parando a empresa.' },
    { id: '1047', cliente: 'Clínica Sorriso', equipamento: 'PC Recepção', prioridade: 'Média', status: 'Aberto', tecnico: null, descricao: 'Sistema de agendamento travando.' },
    { id: '1045', cliente: 'TechCorp', equipamento: 'Notebook Diretor', prioridade: 'Alta', status: 'Em Andamento', tecnico: 'Felipe Silva', descricao: 'Troca de SSD e backup urgente.' },
    { id: '1044', cliente: 'Padaria Central', equipamento: 'PDV 01', prioridade: 'Baixa', status: 'Em Andamento', tecnico: 'Felipe Silva', descricao: 'Impressora de nota fiscal com falha.' },
  ];

  // Lógica para filtrar o que o técnico vê
  const chamadosFiltrados = chamados.filter(chamado => {
    if (filtro === 'Fila Geral') return chamado.status === 'Aberto' && chamado.tecnico === null;
    if (filtro === 'Meus Chamados') return chamado.tecnico === 'Felipe Silva' && chamado.status === 'Em Andamento';
    return true;
  });

  const abrirDetalhes = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
  };

  const assumirChamado = (id) => {
    // Aqui vai o PUT/PATCH para a API Java 21 para vincular o técnico ao chamado
    alert(`Você assumiu o chamado #${id}! Ele agora está na sua lista de atendimentos.`);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Menu Lateral - Versão Técnico (Cores mais escuras/diferenciadas) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> <span className={styles.badgeStaff}>STAFF</span></h2>
        </div>
        <div className={styles.techProfile}>
          <div className={styles.avatar}><i className="fa-solid fa-headset"></i></div>
          <div>
            <p className={styles.techName}>Felipe Silva</p>
            <p className={styles.techRole}>Técnico Nível 2</p>
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
          <button className={styles.logoutBtn} onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Painel de Atendimentos</h1>
        </header>

        {/* KPIs do Técnico */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconAlert}><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div className={styles.kpiInfo}>
              <p>Fila Geral (Não Assumidos)</p>
              <h3>2</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconSuccess}><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <div className={styles.kpiInfo}>
              <p>Meus Chamados Atuais</p>
              <h3>2</h3>
            </div>
          </div>
        </section>

        {/* Fila de Trabalho */}
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
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Equipamento</th>
                  <th>Prioridade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((chamado) => (
                    <tr key={chamado.id}>
                      <td><strong>#{chamado.id}</strong></td>
                      <td>{chamado.cliente}</td>
                      <td>{chamado.equipamento}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + chamado.prioridade]}`}>
                          {chamado.prioridade}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button className={styles.btnIcon} onClick={() => abrirDetalhes(chamado)} title="Detalhes">
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          
                          {/* Muda o botão dependendo de quem é o chamado */}
                          {filtro === 'Fila Geral' ? (
                            <button className={styles.btnAssumir} onClick={() => assumirChamado(chamado.id)}>
                              Assumir
                            </button>
                          ) : (
                            <button className={styles.btnResolver} onClick={() => navigate('/atendimentoChamado')}>
                              Resolver
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      Nenhum chamado nesta lista. Bom trabalho!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal reaproveitado */}
      <ModalDetalhesChamado 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        chamado={chamadoSelecionado} 
      />
    </div>
  );
};

export default FilaTecnico;