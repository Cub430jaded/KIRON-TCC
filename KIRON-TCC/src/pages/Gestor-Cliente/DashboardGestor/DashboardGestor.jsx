import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhesChamado from '../../../components/ModalDetalhesChamado/ModalDetalhesChamado';
import styles from './DashboardGestor.module.css';

const DashboardGestor = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  const kpis = {
    chamadosAbertos: 3,
    equipamentosAtivos: 12,
    faturaAtual: 'R$ 599,00'
  };

  const ultimosChamados = [
    { id: '1042', equipamento: 'PC Recepção', prioridade: 'Alta', status: 'Em Andamento', descricao: 'Máquina não liga, tela preta e apitando.' },
    { id: '1041', equipamento: 'Notebook Financeiro', prioridade: 'Média', status: 'Aberto', descricao: 'Sistema de notas fiscais muito lento.' },
    { id: '1039', equipamento: 'Servidor Local', prioridade: 'Baixa', status: 'Concluído', descricao: 'Criação de nova pasta na rede para o RH.' },
  ];

  const abrirDetalhes = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> Gestor</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-chart-pie"></i> Visão Geral
          </button>
          <button onClick={() => navigate('/chamadosGestor')}>
            <i className="fa-solid fa-ticket"></i> Chamados
          </button>
          <button onClick={() => navigate('/cadastroEquipamento')}>
            <i className="fa-solid fa-desktop"></i> Equipamentos
          </button>
          <button onClick={() => navigate('/financeiro')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Financeiro
          </button>
          <button onClick={() => navigate('/consultoria')}>
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
          <h1>Visão Geral da TI</h1>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Felipe Silva</span>
            <div className={styles.avatar}><i className="fa-solid fa-user"></i></div>
          </div>
        </header>

        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><i className="fa-solid fa-ticket"></i></div>
            <div className={styles.kpiInfo}>
              <p>Chamados Ativos</p>
              <h3>{kpis.chamadosAbertos}</h3>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><i className="fa-solid fa-desktop"></i></div>
            <div className={styles.kpiInfo}>
              <p>Equipamentos</p>
              <h3>{kpis.equipamentosAtivos}</h3>
            </div>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>Últimos Chamados</h2>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipamento</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {ultimosChamados.map((chamado) => (
                  <tr key={chamado.id} className={styles.tableRow}>
                    <td>#{chamado.id}</td>
                    <td>{chamado.equipamento}</td>
                    <td>
                      <span className={`${styles.badge} ${styles['prioridade' + chamado.prioridade]}`}>
                        {chamado.prioridade}
                      </span>
                    </td>
                    <td>{chamado.status}</td>
                    <td>
                      <button 
                        className={styles.btnAction} 
                        onClick={() => abrirDetalhes(chamado)}
                        title="Ver Detalhes"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
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

export default DashboardGestor;