import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './CadastroEquipamento.module.css';

const CadastroEquipamento = () => {
  const navigate = useNavigate();

  // Lista de equipamentos vindos da API Java / MySQL
  const [equipamentos, setEquipamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Formulário de novo equipamento
  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: '',
    tipo: '',
    sistemaOperacional: ''
  });

  // 1. Busca os Equipamentos no MySQL via Axios
  const carregarEquipamentos = async () => {
    try {
      setCarregando(true);
      const res = await api.get('/equipamentos');
      setEquipamentos(res.data);
    } catch (error) {
      console.error('Erro de conexão ao buscar equipamentos:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    carregarEquipamentos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  // 2. Cadastra um Equipamento no MySQL via Axios
  const handleCadastrar = async (e) => {
    e.preventDefault();

    const objetoEnvio = {
      nome: novoEquipamento.nome,
      tipo: novoEquipamento.tipo,
      sistemaOperacional: novoEquipamento.sistemaOperacional,
      statusSaude: 'Verde' // Status inicial padrão
    };

    try {
      await api.post('/equipamentos', objetoEnvio);
      alert('Equipamento cadastrado com sucesso no MySQL!');
      setNovoEquipamento({ nome: '', tipo: '', sistemaOperacional: '' });
      carregarEquipamentos();
    } catch (error) {
      console.error('Erro ao cadastrar equipamento:', error);
      alert('Erro ao salvar equipamento. Verifique se a API está rodando.');
    }
  };

  // 3. Deleta um Equipamento do MySQL via Axios
  const handleDeletar = async (id) => {
    if (!window.confirm(`Tem certeza que deseja remover o equipamento #${id}?`)) return;

    try {
      await api.delete(`/equipamentos/${id}`);
      alert('Equipamento removido com sucesso!');
      carregarEquipamentos();
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error);
      alert('Erro ao remover equipamento.');
    }
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
          <button className={styles.activeMenu}>
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
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Gerenciamento de Equipamentos</h1>
        </header>

        <div className={styles.contentGrid}>
          {/* Formulário de Cadastro */}
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
                  value={novoEquipamento.sistemaOperacional}
                  onChange={(e) => setNovoEquipamento({...novoEquipamento, sistemaOperacional: e.target.value})}
                  required 
                />
              </div>

              <button type="submit" className={styles.btnSubmit}>
                Cadastrar no Banco
              </button>
            </form>
          </section>

          {/* Tabela de Equipamentos */}
          <section className={styles.listSection}>
            <h2>Parque Tecnológico ({equipamentos.length})</h2>
            
            <div className={styles.tableWrapper}>
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th>ID / Nome</th>
                    <th>Tipo</th>
                    <th>Status de Saúde</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {carregando ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        Carregando equipamentos do banco...
                      </td>
                    </tr>
                  ) : equipamentos.length > 0 ? (
                    equipamentos.map((eq) => (
                      <tr key={eq.id}>
                        <td>
                          <strong>#{eq.id} - {eq.nome}</strong>
                          <br/>
                          <span className={styles.osText}>{eq.sistemaOperacional}</span>
                        </td>
                        <td>{eq.tipo}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles['status' + (eq.statusSaude || 'Verde')]}`}>
                            {eq.statusSaude || 'Verde'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={styles.btnDelete} 
                            onClick={() => handleDeletar(eq.id)} 
                            title="Remover do Banco"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        Nenhum equipamento cadastrado no banco ainda.
                      </td>
                    </tr>
                  )}
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