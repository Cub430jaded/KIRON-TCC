import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import styles from './DetalhesChamado.module.css';

const DetalhesChamado = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [chamado, setChamado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const buscarDetalhes = async () => {
      try {
        const res = await api.get(`/chamados/${id}`);
        setChamado(res.data);
      } catch (err) {
        console.error('Erro de conexão ou chamado não encontrado:', err);
      } finally {
        setCarregando(false);
      }
    };

    if (id) buscarDetalhes();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const getBadgeClass = (status) => {
    const st = (status || '').toLowerCase();
    if (st.includes('aberto') || st.includes('pendente')) return styles.badgeAberto;
    if (st.includes('andamento') || st.includes('atendimento')) return styles.badgeEmAndamento;
    return styles.badgeConcluido;
  };

  if (carregando) {
    return <div style={{ padding: '40px', color: '#fff' }}>Carregando detalhes do ticket...</div>;
  }

  if (!chamado) {
    return (
      <div style={{ padding: '40px', color: '#fff' }}>
        <h2>Chamado #{id} não foi encontrado.</h2>
        <button onClick={() => navigate('/MeusChamados')}>Voltar para Meus Chamados</button>
      </div>
    );
  }

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
          <button className={styles.navItem} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-circle-plus"></i> Abrir Chamado
          </button>
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/MeusChamados')}>
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
            <h1>Detalhes do Ticket #KR-{chamado.id}</h1>
            <p className={styles.welcomeText}>
              <i className="fa-solid fa-calendar-days"></i> Data de Abertura:{' '}
              {chamado.dataCriacao ? new Date(chamado.dataCriacao).toLocaleString('pt-BR') : 'N/A'}
            </p>
          </div>
          <div className={styles.headerRight}>
            <span className={`${styles.badgeStatus} ${getBadgeClass(chamado.status)}`}>
              Status: {chamado.status}
            </span>
            <button className={styles.btnVoltar} onClick={() => navigate('/MeusChamados')}>
              <i className="fa-solid fa-arrow-left"></i> Voltar à Lista
            </button>
          </div>
        </header>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-circle-info"></i> Informações da Ocorrência
            </h2>
          </div>

          <div className={styles.gridInfo}>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Equipamento Afetado:</span>
              <span className={styles.infoValue}>
                {chamado.equipamento ? `${chamado.equipamento.nome} (${chamado.equipamento.tipo})` : 'N/A'}
              </span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Categoria:</span>
              <span className={styles.infoValue}>{chamado.categoria}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Urgência / Prioridade:</span>
              <span className={styles.infoValue}>{chamado.prioridade || 'Média'}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Sistema Operacional:</span>
              <span className={styles.infoValue}>{chamado.equipamento?.sistemaOperacional || 'N/A'}</span>
            </div>
          </div>

          <div className={styles.descriptionBox}>
            <strong><i className="fa-solid fa-align-left"></i> Relato / Descrição do Problema:</strong>
            <p>{chamado.descricao || chamado.titulo}</p>
          </div>
        </section>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-file-shield"></i> Parecer Técnico de Fechamento
            </h2>
          </div>

          {chamado.parecerTecnico ? (
            <div className={styles.parecerBoxSuccess}>
              <div className={styles.parecerHeader}>
                <i className="fa-solid fa-circle-check"></i> <strong>Conclusão da Equipe Kiron TI:</strong>
              </div>
              <p>{chamado.parecerTecnico}</p>
            </div>
          ) : (
            <div className={styles.parecerBoxPending}>
              <i className="fa-solid fa-clock"></i> O chamado encontra-se em andamento. O parecer técnico detalhado será disponibilizado assim que a ocorrência for finalizada pela equipe de suporte.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DetalhesChamado;