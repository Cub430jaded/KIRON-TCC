import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GerenciarSaude.module.css';

const GerenciarSaude = () => {
  const navigate = useNavigate();
  const [filtroCliente, setFiltroCliente] = useState('Todos');

  // Mock simulando o monitoramento via agente instalado nas máquinas
  const equipamentosMonitorados = [
    { id: 1, cliente: 'TechCorp', nome: 'Servidor Local', os: 'Linux Ubuntu', status: 'Vermelho', alerta: 'Uso de CPU em 99% há 2 horas.', ultimaSincronizacao: 'Agora mesmo' },
    { id: 2, cliente: 'Clínica Sorriso', nome: 'Notebook Financeiro', os: 'Windows 10', status: 'Amarelo', alerta: 'Armazenamento (C:) atingiu 88%.', ultimaSincronizacao: 'Há 5 minutos' },
    { id: 3, cliente: 'Padaria Central', nome: 'PDV 01', os: 'Windows 11', status: 'Verde', alerta: 'Nenhum alerta registrado.', ultimaSincronizacao: 'Há 2 minutos' },
    { id: 4, cliente: 'TechCorp', nome: 'PC Recepção', os: 'Windows 11', status: 'Verde', alerta: 'Nenhum alerta registrado.', ultimaSincronizacao: 'Há 10 minutos' },
  ];

  const maquinasFiltradas = equipamentosMonitorados.filter(eq => 
    filtroCliente === 'Todos' || eq.cliente === filtroCliente
  );

  const abrirChamadoPreventivo = (eq) => {
    alert(`Iniciando abertura de chamado preventivo para a máquina ${eq.nome} da ${eq.cliente}...`);
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
            <p className={styles.techName}>Felipe Silva</p>
            <p className={styles.techRole}>Técnico Nível 2</p>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <button onClick={() => navigate('/filaTecnico')}>
            <i className="fa-solid fa-list-check"></i> Fila de Chamados
          </button>
          <button onClick={() => navigate('/agendaTecnico')}>
            <i className="fa-solid fa-calendar-days"></i> Minha Agenda
          </button>
          <button className={styles.activeMenu}>
            <i className="fa-solid fa-heart-pulse"></i> Saúde dos PCs
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
          <h1>Monitoramento Preventivo</h1>
          <div className={styles.clientFilter}>
            <label>Filtrar por Cliente:</label>
            <select value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)}>
              <option value="Todos">Todos os Clientes</option>
              <option value="TechCorp">TechCorp</option>
              <option value="Clínica Sorriso">Clínica Sorriso</option>
              <option value="Padaria Central">Padaria Central</option>
            </select>
          </div>
        </header>

        <section className={styles.dashboardGrid}>
          {maquinasFiltradas.map((eq) => (
            <div key={eq.id} className={`${styles.healthCard} ${styles['card' + eq.status]}`}>
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.clientName}>{eq.cliente}</span>
                  <h3>{eq.nome}</h3>
                </div>
                <div className={`${styles.statusIcon} ${styles['icon' + eq.status]}`}>
                  {eq.status === 'Verde' && <i className="fa-solid fa-circle-check"></i>}
                  {eq.status === 'Amarelo' && <i className="fa-solid fa-triangle-exclamation"></i>}
                  {eq.status === 'Vermelho' && <i className="fa-solid fa-radiation"></i>}
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <p><strong>SO:</strong> {eq.os}</p>
                <p><strong>Último Ping:</strong> {eq.ultimaSincronizacao}</p>
                
                <div className={styles.alertBox}>
                  <strong>Diagnóstico:</strong>
                  <p>{eq.alerta}</p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                {eq.status !== 'Verde' ? (
                  <button className={styles.btnAcao} onClick={() => abrirChamadoPreventivo(eq)}>
                    Abrir Chamado Preventivo
                  </button>
                ) : (
                  <span className={styles.okText}>Monitoramento OK</span>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default GerenciarSaude;