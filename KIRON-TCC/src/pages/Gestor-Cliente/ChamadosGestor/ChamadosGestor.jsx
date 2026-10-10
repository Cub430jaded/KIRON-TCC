import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import styles from './ChamadosGestor.module.css';

const ChamadosGestor = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  const chamados = [
    { id: '1043', equipamento: 'PC RH', prioridade: 'Alta', status: 'Aberto', data: '09/10/2026', descricao: 'O computador liga mas a tela fica preta com um cursor piscando.' },
    { id: '1042', equipamento: 'PC Recepção', prioridade: 'Alta', status: 'Em Andamento', data: '09/10/2026', descricao: 'Máquina apitando continuamente ao tentar ligar.' },
    { id: '1041', equipamento: 'Notebook Financeiro', prioridade: 'Média', status: 'Aberto', data: '08/10/2026', descricao: 'Sistema de notas fiscais muito lento.' },
    { id: '1039', equipamento: 'Servidor Local', prioridade: 'Baixa', status: 'Concluído', data: '05/10/2026', descricao: 'Criação de nova pasta na rede para o RH.' },
    { id: '1035', equipamento: 'Impressora Rede', prioridade: 'Média', status: 'Concluído', data: '01/10/2026', descricao: 'Troca de toner e limpeza dos roletes.' },
  ];

  const chamadosFiltrados = chamados.filter(chamado => {
    if (filtroAtivo === 'Todos') return true;
    return chamado.status === filtroAtivo;
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
          <button onClick={() => navigate('/Financeiro')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Financeiro
          </button>
          <button onClick={() => navigate('/Consultoria')}>
            <i className="fa-solid fa-handshake"></i> Consultoria
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Central de Chamados</h1>
          <button className={styles.btnNovaAbertura} onClick={() => alert('Em um cenário real, o Gestor também poderia abrir chamados por aqui!')}>
            <i className="fa-solid fa-plus"></i> Abrir Chamado
          </button>
        </header>

        <section className={styles.listSection}>
          <div className={styles.filterTabs}>
            <button 
              className={filtroAtivo === 'Todos' ? styles.tabActive : styles.tab}
              onClick={() => setFiltroAtivo('Todos')}
            >
              Todos
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
                {chamadosFiltrados.length > 0 ? (
                  chamadosFiltrados.map((chamado) => (
                    <tr key={chamado.id}>
                      <td>
                        <strong>#{chamado.id}</strong>
                        <br/>
                        <span className={styles.dateText}>{chamado.data}</span>
                      </td>
                      <td>{chamado.equipamento}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['prioridade' + chamado.prioridade]}`}>
                          {chamado.prioridade}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles['status' + chamado.status.replace(' ', '')]}`}>
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

      <ModalDetalhesChamado 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        chamado={chamadoSelecionado} 
      />
    </div>
  );
};

export default ChamadosGestor;