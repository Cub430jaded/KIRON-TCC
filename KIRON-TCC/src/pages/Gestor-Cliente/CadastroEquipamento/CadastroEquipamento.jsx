import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastroEquipamento.module.css';

const CadastroEquipamento = () => {
  const navigate = useNavigate();

  // Estado para simular o banco de dados (SQLite)
  const [equipamentos, setEquipamentos] = useState([
    { id: 1, nome: 'PC Recepção', tipo: 'Desktop', os: 'Windows 11', status: 'Verde' },
    { id: 2, nome: 'Notebook Financeiro', tipo: 'Notebook', os: 'Windows 10', status: 'Amarelo' },
    { id: 3, nome: 'Servidor Local', tipo: 'Servidor', os: 'Linux Ubuntu', status: 'Vermelho' },
  ]);

  // Estado para o formulário
  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: '',
    tipo: '',
    os: ''
  });

  const handleCadastrar = (e) => {
    e.preventDefault();
    // Simulação do POST para a API Spring Boot
    const novo = {
      id: equipamentos.length + 1,
      nome: novoEquipamento.nome,
      tipo: novoEquipamento.tipo,
      os: novoEquipamento.os,
      status: 'Verde' // Toda máquina nova entra com saúde perfeita
    };
    
    setEquipamentos([...equipamentos, novo]);
    setNovoEquipamento({ nome: '', tipo: '', os: '' }); // Limpa o form
    alert("Equipamento cadastrado com sucesso!");
  };

  return (
    <div className={styles.pageContainer}>
      {/* Menu Lateral (Igual ao do Dashboard) */}
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
          <button className={styles.activeMenu}>
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

      {/* Conteúdo Principal */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Gerenciamento de Equipamentos</h1>
        </header>

        <div className={styles.contentGrid}>
          {/* Coluna Esquerda: Formulário de Cadastro */}
          <section className={styles.formSection}>
            <h2>Novo Equipamento</h2>
            <p>Cadastre as máquinas para monitoramento e abertura de chamados.</p>
            
            <form onSubmit={handleCadastrar} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Nome de Identificação</label>
                <input 
                  type="text" 
                  placeholder="Ex: PC da Recepção" 
                  value={novoEquipamento.nome}
                  onChange={(e) => setNovoEquipamento({...novoEquipamento, nome: e.target.value})}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Tipo de Máquina</label>
                <select 
                  value={novoEquipamento.tipo}
                  onChange={(e) => setNovoEquipamento({...novoEquipamento, tipo: e.target.value})}
                  required
                >
                  <option value="" disabled>Selecione...</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Notebook">Notebook</option>
                  <option value="Servidor">Servidor</option>
                  <option value="Impressora">Impressora de Rede</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Sistema Operacional</label>
                <input 
                  type="text" 
                  placeholder="Ex: Windows 11 Pro" 
                  value={novoEquipamento.os}
                  onChange={(e) => setNovoEquipamento({...novoEquipamento, os: e.target.value})}
                  required 
                />
              </div>

              <button type="submit" className={styles.btnSubmit}>
                Cadastrar Máquina
              </button>
            </form>
          </section>

          {/* Coluna Direita: Tabela de Equipamentos */}
          <section className={styles.listSection}>
            <h2>Parque Tecnológico ({equipamentos.length})</h2>
            
            <div className={styles.tableWrapper}>
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th>Equipamento</th>
                    <th>Tipo</th>
                    <th>Status de Saúde</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {equipamentos.map((eq) => (
                    <tr key={eq.id}>
                      <td>
                        <strong>{eq.nome}</strong>
                        <br/>
                        <span className={styles.osText}>{eq.os}</span>
                      </td>
                      <td>{eq.tipo}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles['status' + eq.status]}`}>
                          {eq.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnAction} title="Editar">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className={styles.btnDelete} title="Remover">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CadastroEquipamento;