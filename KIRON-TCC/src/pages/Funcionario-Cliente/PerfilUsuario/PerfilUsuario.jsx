import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerfilUsuario.module.css';

const PerfilUsuario = () => {
  const navigate = useNavigate();

  // Estados dos Campos do Perfil
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');

  // Estados para Alteração de Senha
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estados de Feedback
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    // 1. Validação de Sessão
    const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
    if (!estaLogado) {
      navigate('/Login');
      return;
    }

    // 2. Carrega dados vindos do Login ou Cadastro
    const usuarioSalvo = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));

    if (usuarioSalvo) {
      setNome(usuarioSalvo.nome || 'Bruno Silva Almeida');
      setEmail(usuarioSalvo.email || 'bruno.silva@empresa.com.br');
      setTelefone(usuarioSalvo.telefone || '(11) 98765-4321');
      setCargo(usuarioSalvo.cargo || 'Gestor de TI / Operações');
      setEmpresa(usuarioSalvo.empresa || 'Sua Empresa S.A.');
    } else {
      // Valores Padrão de Fallback
      const dadosPadrao = {
        nome: 'Bruno Silva Almeida',
        email: 'bruno.silva@empresa.com.br',
        telefone: '(11) 98765-4321',
        cargo: 'Gestor de TI / Operações',
        empresa: 'Sua Empresa S.A.'
      };
      localStorage.setItem('kiron_usuario_logado_dados', JSON.stringify(dadosPadrao));
      setNome(dadosPadrao.nome);
      setEmail(dadosPadrao.email);
      setTelefone(dadosPadrao.telefone);
      setCargo(dadosPadrao.cargo);
      setEmpresa(dadosPadrao.empresa);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    localStorage.removeItem('kiron_usuario_logado_dados');
    navigate('/Login');
  };

  const handleSalvarPerfil = (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    // Atualiza o objeto no localStorage com os dados do formulário
    const dadosAtualizados = {
      nome,
      email,
      telefone,
      cargo,
      empresa
    };

    localStorage.setItem('kiron_usuario_logado_dados', JSON.stringify(dadosAtualizados));

    setMensagemSucesso('Dados do perfil atualizados com sucesso!');
    setTimeout(() => setMensagemSucesso(''), 4000);
  };

  const handleAlterarSenha = (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (senhaAtual.trim() === '') {
      setMensagemErro('Por favor, informe a senha atual.');
      return;
    }

    if (novaSenha.length < 6) {
      setMensagemErro('A nova senha deve possuir no mínimo 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemErro('A confirmação da nova senha não confere.');
      return;
    }

    localStorage.setItem('kiron_senha_usuario', novaSenha);

    setMensagemSucesso('Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
    setTimeout(() => setMensagemSucesso(''), 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* BARRA LATERAL (SIDEBAR) */}
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
            <p className={styles.welcomeText}>
              Gerencie suas informações pessoais e credenciais cadastradas
            </p>
          </div>
          <button className={styles.btnVoltar} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-arrow-left"></i> Voltar ao Dashboard
          </button>
        </header>

        {/* FEEDBACKS */}
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

        {/* CARD PRINCIPAL DO USUÁRIO */}
        <section className={styles.sheetSection}>
          <div className={styles.profileSummaryHeader}>
            <div className={styles.avatarCircle}>
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <div className={styles.profileInfo}>
              <h2>{nome}</h2>
              <p>{cargo} &bull; <strong>{empresa}</strong></p>
              <span className={styles.badgeSuccess}>
                <i className="fa-solid fa-shield-check"></i> Conta Ativa & Validada
              </span>
            </div>
          </div>
        </section>

        {/* FORMULÁRIO DE EDIÇÃO */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-id-card"></i> Informações Cadastrais
            </h2>
          </div>

          <form onSubmit={handleSalvarPerfil} className={styles.formSheet}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-user"></i> Nome Completo:
                </label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-envelope"></i> E-mail Corporativo:
                </label>
                <input
                  type="email"
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-phone"></i> Telefone / WhatsApp:
                </label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-briefcase"></i> Cargo / Setor:
                </label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSubmit}>
                <i className="fa-solid fa-floppy-disk"></i> Salvar Alterações
              </button>
            </div>
          </form>
        </section>

        {/* DADOS DA EMPRESA */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-building"></i> Dados da Empresa Vinculada
            </h2>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Informação Cadastrada</th>
                  <th>Campo</th>
                  <th>Informação Cadastrada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Razão Social</strong></td>
                  <td>{empresa}</td>
                  <td><strong>CNPJ</strong></td>
                  <td className={styles.codeCell}>12.345.678/0001-90</td>
                </tr>
                <tr>
                  <td><strong>Plano Kiron TI</strong></td>
                  <td><span className={styles.badgeSuccess}>Enterprise Pro</span></td>
                  <td><strong>SLA Contratado</strong></td>
                  <td>Até 2 horas úteis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ALTERAR SENHA */}
        <section className={styles.sheetSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-key"></i> Segurança e Alteração de Senha
            </h2>
          </div>

          <form onSubmit={handleAlterarSenha} className={styles.formSheet}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>
                <i className="fa-solid fa-lock"></i> Senha Atual:
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Digite sua senha atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassBtn}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  <i className={mostrarSenha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                </button>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-key"></i> Nova Senha:
                </label>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  className={styles.inputField}
                  placeholder="Mínimo 6 caracteres"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <i className="fa-solid fa-check-double"></i> Confirmar Nova Senha:
                </label>
                <input
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
                <i className="fa-solid fa-shield-halved"></i> Atualizar Senha
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default PerfilUsuario;