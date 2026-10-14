import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import styles from './AtendimentoChamado.module.css';

const AtendimentoChamado = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [chamadoAtual, setChamadoAtual] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const [form, setForm] = useState({
    status: 'Em Andamento',
    parecer: ''
  });

  const [tecnico, setTecnico] = useState({
    nome: 'Técnico',
    cargo: 'Suporte Nível 2'
  });

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const dadosUsuario = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (dadosUsuario) {
      setTecnico({
        nome: dadosUsuario.nome || 'Técnico de Suporte',
        cargo: dadosUsuario.cargo || 'Equipe Kiron TI'
      });
    }

    const buscarChamado = async () => {
      try {
        setCarregando(true);
        const res = await api.get(`/chamados/${id}`);
        setChamadoAtual(res.data);
        setForm({
          status: res.data.status || 'Em Andamento',
          parecer: res.data.parecerTecnico || ''
        });
      } catch (err) {
        console.error('Erro ao buscar chamado:', err);
        alert('Chamado não encontrado.');
        navigate('/FilaTecnico');
      } finally {
        setCarregando(false);
      }
    };

    if (id) buscarChamado();
  }, [id, navigate]);

  const handleFinalizar = async (e) => {
    e.preventDefault();

    if (form.status === 'Concluído' && form.parecer.trim() === '') {
      alert("Erro (RN004): O Parecer Técnico é obrigatório para concluir um chamado.");
      return;
    }

    try {
      await api.put(`/chamados/${id}/status`, {
        status: form.status,
        parecerTecnico: form.parecer
      });

      alert(`Chamado #KR-${id} atualizado com sucesso no banco de dados!`);
      navigate('/FilaTecnico');
    } catch (err) {
      console.error('Erro ao atualizar chamado:', err);
      alert('Erro ao atualizar o chamado no servidor.');
    }
  };

  if (carregando) {
    return <div style={{ padding: '40px', color: '#fff' }}>Carregando dados do chamado...</div>;
  }

  if (!chamadoAtual) return null;

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span> <span className={styles.badgeStaff}>STAFF</span></h2>
        </div>
        <div className={styles.techProfile}>
          <div className={styles.avatar}><i className="fa-solid fa-headset"></i></div>
          <div>
            <p className={styles.techName}>{tecnico.nome}</p>
            <p className={styles.techRole}>{tecnico.cargo}</p>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={styles.activeMenu} onClick={() => navigate('/FilaTecnico')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar para Fila
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Resolvendo Chamado #KR-{chamadoAtual.id}</h1>
          <span className={styles.badgeAlta}>Prioridade {chamadoAtual.prioridade || 'Média'}</span>
        </header>

        <div className={styles.workspaceGrid}>
          <section className={styles.infoSection}>
            <h2>Informações do Ticket</h2>
            <div className={styles.infoBlock}>
              <label>Equipamento com Falha</label>
              <p>{chamadoAtual.equipamento ? `${chamadoAtual.equipamento.nome} (${chamadoAtual.equipamento.tipo})` : 'N/A'}</p>
            </div>
            <div className={styles.infoBlock}>
              <label>Categoria</label>
              <p>{chamadoAtual.categoria || 'Geral'}</p>
            </div>
            <div className={styles.infoBlock}>
              <label>Aberto em</label>
              <p>{chamadoAtual.dataCriacao ? new Date(chamadoAtual.dataCriacao).toLocaleString('pt-BR') : 'N/A'}</p>
            </div>
            <div className={styles.descBlock}>
              <label>Problema Relatado (Sintoma)</label>
              <p>{chamadoAtual.descricao || chamadoAtual.titulo}</p>
            </div>
          </section>

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
                <label>
                  Parecer Técnico (RN004) {form.status === 'Concluído' && <span className={styles.required}>*Obrigatório</span>}
                </label>
                <textarea 
                  rows="8"
                  placeholder="Descreva detalhadamente o que foi feito..."
                  value={form.parecer}
                  onChange={(e) => setForm({...form, parecer: e.target.value})}
                  required={form.status === 'Concluído'}
                ></textarea>
              </div>

              <div className={styles.buttonGroup}>
                <button type="button" className={styles.btnCancel} onClick={() => navigate('/FilaTecnico')}>
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