import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerfilUsuario.module.css';

const PerfilUsuario = () => {
  const navigate = useNavigate();

  // Dados Pessoais (Modo Leitura)
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: 'Bruno Silva Almeida',
    email: 'bruno.silva@empresa.com.br',
    cpf: '123.456.789-00',
    cargo: 'Gestor de TI',
    setor: 'Operações e Infraestrutura'
  });

  // Estados para Alteração de Senha
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Feedbacks
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    // Validação da Sessão
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // Carrega os dados reais do utilizador salvos na sessão do Login/Cadastro
    const usuarioSalvo = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
    if (usuarioSalvo) {
      setDadosUsuario({
        nome: usuarioSalvo.nome || 'Bruno Silva Almeida',
        email: usuarioSalvo.email || 'bruno.silva@empresa.com.br',
        cpf: usuarioSalvo.cpf || '123.456.789-00',
        cargo: usuarioSalvo.cargo || 'Gestor de TI',
        setor: usuarioSalvo.setor || usuarioSalvo.empresa || 'Setor de Operações'
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/Login');
  };

  const handleAlterarSenha = (e) => {
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

    // Grava a nova senha
    localStorage.setItem('kiron_senha_usuario', novaSenha);

    setMensagemSucesso('Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');

    setTimeout(() => {
      setMensagemSucesso('');
    }, 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* SIDEBAR FIXA */}
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        
        {/* CABEÇALHO */}
        <header className={styles.headerBlock}>
          <div>
            <h1>Perfil do Usuário</h1>
            <p className={styles.welcomeText}>Gestão de dados pessoais e segurança da sua conta</p>
          </div>
          <button className={styles.btnVoltar} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar ao Dashboard
          </button>
        </header>

        {/* FEEDBACKS (ALERTAS VISUAIS) */}
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

        {/* PAINEL 1: DADOS PESSOAIS (APENAS LEITURA - REQUISITO TCC) */}
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
              <label className={styles.label}><i className="fa-solid fa-address-card"></i> CPF:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.cpf} readOnly />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}><i className="fa-solid fa-briefcase"></i> Cargo:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.cargo} readOnly />
            </div>

            <div className={styles.inputGroupFull}>
              <label className={styles.label}><i className="fa-solid fa-building"></i> Setor / Unidade:</label>
              <input type="text" className={styles.readOnlyInput} value={dadosUsuario.setor} readOnly />
            </div>
          </div>
        </section>

        {/* PAINEL 2: ALTERAÇÃO DE SENHA */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-key"></i> Alterar Senha de Acesso
            </h2>
          </div>

          <form onSubmit={handleAlterarSenha} className={styles.formSheet}>
            
            {/* SENHA ATUAL */}
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

            {/* NOVA SENHA & CONFIRMAÇÃO */}
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
              <button type="submit" className={styles.btnSubmit}>
                <i className="fa-solid fa-floppy-disk"></i> Salvar Nova Senha
              </button>
            </div>

          </form>
        </section>

      </main>
    </div>
  );
};

export default PerfilUsuario;