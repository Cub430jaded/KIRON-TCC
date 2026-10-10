import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Consultoria.module.css';

const Consultoria = () => {
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState({ assunto: '', descricao: '' });

  const handleSolicitar = (e) => {
    e.preventDefault();
    alert("Solicitação de consultoria enviada! Nossa equipe entrará em contato em breve para alinhar os detalhes do projeto.");
    setProjeto({ assunto: '', descricao: '' });
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
          <button onClick={() => navigate('/financeiro')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Financeiro
          </button>
          <button className={styles.activeMenu}>
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
          <h1>Consultoria Estratégica</h1>
        </header>

        <section className={styles.consultingSection}>
          <div className={styles.infoBanner}>
            <i className="fa-solid fa-lightbulb"></i>
            <div>
              <h3>Precisa de ajuda para expandir sua TI?</h3>
              <p>Projetos de infraestrutura, migração para nuvem ou instalação de novas redes não entram na assinatura de suporte. Solicite uma avaliação gratuita com nossos engenheiros.</p>
            </div>
          </div>

          <form onSubmit={handleSolicitar} className={styles.formContainer}>
            <h2>Solicitar Avaliação de Projeto</h2>
            
            <div className={styles.inputGroup}>
              <label>Qual a área do projeto?</label>
              <select 
                value={projeto.assunto}
                onChange={(e) => setProjeto({...projeto, assunto: e.target.value})}
                required
              >
                <option value="" disabled>Selecione uma área...</option>
                <option value="Infraestrutura e Redes">Infraestrutura e Redes</option>
                <option value="Segurança da Informação">Segurança da Informação</option>
                <option value="Migração Cloud">Migração para Nuvem (Cloud)</option>
                <option value="Licenciamento">Licenciamento de Software</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Descrição do que você precisa</label>
              <textarea 
                rows="6"
                placeholder="Ex: Vamos alugar a sala ao lado e precisamos passar o cabeamento de rede para 5 computadores novos..."
                value={projeto.descricao}
                onChange={(e) => setProjeto({...projeto, descricao: e.target.value})}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              <i className="fa-solid fa-paper-plane"></i> Enviar Solicitação
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Consultoria;