import { useNavigate } from 'react-router-dom';
import styles from './Financeiro.module.css';

const Financeiro = () => {
  const navigate = useNavigate();

  const faturas = [
    { id: 'FAT-104', mes: 'Outubro 2026', vencimento: '10/10/2026', valor: 'R$ 599,00', status: 'Pendente' },
    { id: 'FAT-103', mes: 'Setembro 2026', vencimento: '10/09/2026', valor: 'R$ 599,00', status: 'Pago' },
    { id: 'FAT-102', mes: 'Agosto 2026', vencimento: '10/08/2026', valor: 'R$ 599,00', status: 'Pago' },
  ];

  const handleDownload = (id) => {
    alert(`Iniciando download do boleto da fatura ${id}...`);
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
          <button onClick={() => navigate('/chamadosGestor')}>
            <i className="fa-solid fa-ticket"></i> Chamados
          </button>
          <button onClick={() => navigate('/cadastroEquipamento')}>
            <i className="fa-solid fa-desktop"></i> Equipamentos
          </button>
          <button className={styles.activeMenu}>
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
          <h1>Gestão Financeira</h1>
        </header>

        <section className={styles.planOverview}>
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <h3>Plano Atual: <span className={styles.highlight}>Start</span></h3>
              <span className={styles.badgeAtivo}>Ativo</span>
            </div>
            <p>Cobrança mensal fixa para até 15 dispositivos.</p>
            <h2>R$ 599,00<span className={styles.mesText}>/mês</span></h2>
          </div>
        </section>

        <section className={styles.listSection}>
          <h2>Histórico de Faturas</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Fatura</th>
                  <th>Referência</th>
                  <th>Vencimento</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {faturas.map((fatura) => (
                  <tr key={fatura.id}>
                    <td><strong>{fatura.id}</strong></td>
                    <td>{fatura.mes}</td>
                    <td>{fatura.vencimento}</td>
                    <td>{fatura.valor}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles['status' + fatura.status]}`}>
                        {fatura.status}
                      </span>
                    </td>
                    <td>
                      <button className={styles.btnAction} onClick={() => handleDownload(fatura.id)} title="Baixar Boleto">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Financeiro;