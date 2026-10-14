import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './PerfilUsuario.module.css';

const PerfilUsuario = () => {
  const navigate = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    cargo: '',
    setor: ''
  });

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/login');
      return;
    }

    const usuarioSalvo = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (usuarioSalvo) {
      setDadosUsuario({
        nome: usuarioSalvo.nome || 'Usuário Kiron',
        email: usuarioSalvo.email || 'usuario@empresa.com.br',
        cpf: usuarioSalvo.cpf || 'Não informado',
        cargo: usuarioSalvo.cargo || 'Funcionário',
        setor: usuarioSalvo.setor || 'Operações'
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/login');
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!senhaAtual.trim()) {
      setMensagemErro('Por favor, digite a sua senha atual.');
      return;
    }

    if (novaSenha.length < 6) {
      setMensagemErro('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemErro('A confirmação da nova senha não coincide.');
      return;
    }

    try {
      setSalvando(true);
      const res = await api.put('/auth/alterar-senha', {
        email: dadosUsuario.email,
        senhaAtual,
        novaSenha
      });

      setMensagemSucesso(res.data || 'Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      const msg = err.response?.data || 'Erro ao alterar a senha.';
      setMensagemErro(msg);
    } finally {
      setSalvando(false);
    }
  };

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
          <button className={styles.navItem} onClick={() => navigate('/MeusChamados')}>
            <i className="fa-solid fa-headset"></i> Meus Chamados
          </button>
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/PerfilUsuario')}>
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
            <h1>Perfil do Usuário</h1>
            <p className={styles.welcomeText}>Gestão de dados pessoais e segurança da sua conta</p>
          </div>
          <button className={styles.btnVoltar} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar ao Dashboard
          </button>
        </header>

        {mensagemSucesso && (
          <div className={styles.alertSuccess}>
            <i className="fa-solid fa-circle-check"></i> {mensagemSucesso}
          </div>
        )}

        {mensagemErro && (
          <div className={styles.alertDanger}>
            <i className="fa-solid fa-circle-exclamation"></i> {mensagemErro}
          </div>
        )}

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-id-card"></i> Dados Pessoais (Apenas Leitura)
            </h2>
            <span className={styles.readOnlyBadge}>
              <i className="fa-solid fa-lock"></i> Dados Validados
            </span>
          </div>

          <div className={styles.readOnlyGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}><i className="fa-solid fa-user"></i> Nome Completo:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.nome} readOnly />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}><i className="fa-solid fa-envelope"></i> E-mail Corporativo:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.email} readOnly />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}><i className="fa-solid fa-address-card"></i> CPF / CNPJ:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.cpf} readOnly />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}><i className="fa-solid fa-briefcase"></i> Cargo:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.cargo} readOnly />
            </div>

            <div className={styles.inputGroupFull}>
              <label className={styles.label}><i className="fa-solid fa-building"></i> Setor / Empresa:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.setor} readOnly />
            </div>
          </div>
        </section>

        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-key"></i> Alterar Senha de Acesso
            </h2>
          </div>

          <form onSubmit={handleAlterarSenha} className={styles.formSheet}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label} htmlFor="senhaAtual">
                <i className="fa-solid fa-lock"></i> Senha Atual:
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="senhaAtual"
                  type={mostrarSenha ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Digite sua senha atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  title={mostrarSenha ? "Ocultar senha" : "Ver senha"}
                >
                  <i className={mostrarSenha ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="novaSenha">
                  <i className="fa-solid fa-key"></i> Nova Senha:
                </label>
                <input
                  id="novaSenha"
                  type={mostrarSenha ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Mínimo 6 caracteres"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="confirmarSenha">
                  <i className="fa-solid fa-check-double"></i> Confirmar Nova Senha:
                </label>
                <input
                  id="confirmarSenha"
                  type={mostrarSenha ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Repita a nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSubmit} disabled={salvando}>
                <i className="fa-solid fa-floppy-disk"></i> {salvando ? 'Salvando...' : 'Salvar Nova Senha'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default PerfilUsuario;