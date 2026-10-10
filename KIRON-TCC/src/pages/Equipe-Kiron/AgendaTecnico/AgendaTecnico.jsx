import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AgendaTecnico.module.css';

const AgendaTecnico = () => {
  const navigate = useNavigate();
  const [dataSelecionada, setDataSelecionada] = useState('Hoje');

  // Mock de visitas presenciais agendadas
  const visitas = [
    { id: 1, hora: '09:00', cliente: 'TechCorp', endereco: 'Av. Alphaville, 1000', tipo: 'Manutenção Preventiva', status: 'Concluído', data: 'Hoje' },
    { id: 2, hora: '14:30', cliente: 'Clínica Sorriso', endereco: 'Rua Rio Branco, 45', tipo: 'Suporte Presencial (Chamado #1047)', status: 'Pendente', data: 'Hoje' },
    { id: 3, hora: '10:00', cliente: 'Padaria Central', endereco: 'Centro, 12', tipo: 'Instalação de Rede', status: 'Pendente', data: 'Amanhã' },
  ];

  const visitasFiltradas = visitas.filter(visita => visita.data === dataSelecionada);

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
          <button className={styles.activeMenu}>
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

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Agenda de Visitas</h1>
          <div className={styles.dateTabs}>
            <button 
              className={dataSelecionada === 'Hoje' ? styles.tabActive : styles.tab}
              onClick={() => setDataSelecionada('Hoje')}
            >
              Hoje (10/10)
            </button>
            <button 
              className={dataSelecionada === 'Amanhã' ? styles.tabActive : styles.tab}
              onClick={() => setDataSelecionada('Amanhã')}
            >
              Amanhã (11/10)
            </button>
          </div>
        </header>

        <section className={styles.agendaList}>
          {visitasFiltradas.length > 0 ? (
            visitasFiltradas.map((visita) => (
              <div key={visita.id} className={styles.agendaCard}>
                <div className={styles.timeColumn}>
                  <h3>{visita.hora}</h3>
                  <span className={`${styles.statusBadge} ${styles['status' + visita.status]}`}>
                    {visita.status}
                  </span>
                </div>
                <div className={styles.detailsColumn}>
                  <h4>{visita.cliente}</h4>
                  <p className={styles.infoText}><i className="fa-solid fa-location-dot"></i> {visita.endereco}</p>
                  <p className={styles.infoText}><i className="fa-solid fa-wrench"></i> {visita.tipo}</p>
                </div>
                <div className={styles.actionColumn}>
                  <button className={styles.btnRoute} onClick={() => alert('Abrindo rota no Maps...')}>
                    <i className="fa-solid fa-map-location-dot"></i> Ver Rota
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>Nenhuma visita agendada para {dataSelecionada.toLowerCase()}.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AgendaTecnico;