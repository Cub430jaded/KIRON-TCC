import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AtendimentoChamado.module.css';

const AtendimentoChamado = () => {
  const navigate = useNavigate();
  
  // Dados simulados do chamado que está sendo atendido
  const chamadoAtual = {
    id: '1045',
    cliente: 'TechCorp',
    equipamento: 'Notebook Diretor',
    descricao: 'Notebook extremamente lento, travando ao abrir o Excel. Necessário verificar HD/SSD e fazer backup urgente.',
    prioridade: 'Alta',
    dataAbertura: '09/10/2026 14:20'
  };

  const [form, setForm] = useState({
    status: 'Em Andamento',
    parecer: ''
  });

  const handleFinalizar = (e) => {
    e.preventDefault();
    if (form.status === 'Concluído' && form.parecer.trim() === '') {
      alert("Erro (RN004): O Parecer Técnico é obrigatório para concluir um chamado.");
      return;
    }
    
    alert(`Chamado #${chamadoAtual.id} atualizado com sucesso para o status: ${form.status}!`);
    navigate('/fila-tecnico');
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
          <button className={styles.activeMenu} onClick={() => navigate('/filaTecnico')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar para Fila
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Resolvendo Chamado #{chamadoAtual.id}</h1>
          <span className={styles.badgeAlta}>Prioridade {chamadoAtual.prioridade}</span>
        </header>

        <div className={styles.workspaceGrid}>
          {/* Coluna Esquerda: Dados do Chamado (Apenas Leitura) */}
          <section className={styles.infoSection}>
            <h2>Informações do Ticket</h2>
            <div className={styles.infoBlock}>
              <label>Cliente</label>
              <p>{chamadoAtual.cliente}</p>
            </div>
            <div className={styles.infoBlock}>
              <label>Equipamento com Falha</label>
              <p>{chamadoAtual.equipamento}</p>
            </div>
            <div className={styles.infoBlock}>
              <label>Aberto em</label>
              <p>{chamadoAtual.dataAbertura}</p>
            </div>
            <div className={styles.descBlock}>
              <label>Problema Relatado (Sintoma)</label>
              <p>{chamadoAtual.descricao}</p>
            </div>
          </section>

          {/* Coluna Direita: Área de Resolução */}
          <section className={styles.resolutionSection}>
            <h2>Área Técnica (Parecer)</h2>
            <form onSubmit={handleFinalizar} className={styles.form}>
              
              <div className={styles.inputGroup}>
                <label>Status Atual</label>
                <select 
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Aguardando Peça">Aguardando Peça</option>
                  <option value="Concluído">Concluído (Resolver)</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Parecer Técnico (RN004) {form.status === 'Concluído' && <span className={styles.required}>*Obrigatório</span>}</label>
                <textarea 
                  rows="8"
                  placeholder="Descreva detalhadamente o que foi feito, peças trocadas ou solução aplicada..."
                  value={form.parecer}
                  onChange={(e) => setForm({...form, parecer: e.target.value})}
                  required={form.status === 'Concluído'}
                ></textarea>
              </div>

              <div className={styles.buttonGroup}>
                <button type="button" className={styles.btnCancel} onClick={() => navigate('/fila-tecnico')}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  Salvar Atualização
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AtendimentoChamado;