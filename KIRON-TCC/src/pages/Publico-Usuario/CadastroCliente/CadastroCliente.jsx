import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastroCliente.module.css';

const CadastroCliente = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erroNome, setErroNome] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  // Estado para controlar a visibilidade da senha em ambos os campos
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const aplicarMascaraCnpj = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')       .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      .slice(0, 18);
  };

  const aplicarMascaraTelefone = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')       .replace(/(\d{5})(\d{4})$/, '$1-$2')
      .slice(0, 15);
  };

  const handleCnpjChange = (e) => {
    setCnpj(aplicarMascaraCnpj(e.target.value));
  };

  const handleTelefoneChange = (e) => {
    setTelefone(aplicarMascaraTelefone(e.target.value));
  };

  const handleNomeBlur = () => {
    const partes = nome.trim().split(/\s+/);
    if (nome && partes.length < 2) {
      setErroNome('Digite o nome completo (nome e sobrenome).');
    } else {
      setErroNome('');
    }
  };

  const handleCadastrar = (e) => {
    e.preventDefault();

    if (nome.trim().split(/\s+/).length < 2) {
      setErroNome('Digite o nome completo (nome e sobrenome).');
      return;
    }

    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!regexSenha.test(senha)) {
      setErroSenha('A senha deve conter ao menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.');
      return;
    } else {
      setErroSenha('');
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Estrutura do objeto de usuário cadastrado
    const novoUsuario = {
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone,
      cargo: 'Responsável Técnico / Operações',
      empresa: razaoSocial.trim() || 'Sua Empresa S.A.',
      cnpj: cnpj
    };

    // Salva os dados do usuário e ativa a sessão no localStorage
    localStorage.setItem('kiron_usuario_logado', 'true');
    localStorage.setItem('kiron_usuario_logado_dados', JSON.stringify(novoUsuario));
    localStorage.setItem('kiron_senha_usuario', senha);

    // Redireciona diretamente para o Dashboard do Cliente
    navigate('/HomeCliente');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles['container-fundo']}>
        <div className={styles['card']}>
          <div className={styles.logoArea}>
            <span className={styles.logoKiron}>Kiron</span>
            <span className={styles.logoTi}>TI</span>
          </div>
          <h1>Cadastro de Cliente</h1>
          <p className={styles.subtitle}>Preencha os dados da sua empresa para começar</p>

          <form className={styles['form-grid']} onSubmit={handleCadastrar}>
            
            {/* Campo Nome */}
            <div className={styles.inputGroup}>
              <label className={styles['label-input']} htmlFor="nome">Nome do Responsável:</label>
              <div className={styles.inputWrapper}>
                <input 
                  className={`${styles['input-field']} ${erroNome ? styles.inputError : ''}`} 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  placeholder="Seu nome completo" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={handleNomeBlur}
                  required 
                />
                {erroNome && (
                  <div className={styles.tooltipContainer}>
                    <span className={styles.errorIcon}>?</span>
                    <div className={styles.tooltipBox}>{erroNome}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Razão Social */}
            <div className={styles.inputGroup}>
              <label className={styles['label-input']} htmlFor="razaoSocial">Razão Social da Empresa:</label>
              <input 
                className={styles['input-field']} 
                type="text" 
                id="razaoSocial" 
                name="razaoSocial" 
                placeholder="Nome da sua empresa Ltda" 
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                required 
              />
            </div>

            {/* Grid CNPJ e Telefone */}
            <div className={styles.rowGrid}>
              <div className={styles.inputGroup}>
                <label className={styles['label-input']} htmlFor="cnpj">CNPJ:</label>
                <input 
                  className={styles['input-field']} 
                  type="text" 
                  id="cnpj" 
                  name="cnpj" 
                  placeholder="00.000.000/0001-00" 
                  value={cnpj}
                  onChange={handleCnpjChange}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles['label-input']} htmlFor="telefone">Telefone / WhatsApp:</label>
                <input 
                  className={styles['input-field']} 
                  type="text" 
                  id="telefone" 
                  name="telefone" 
                  placeholder="(11) 99999-9999" 
                  value={telefone}
                  onChange={handleTelefoneChange}
                  required 
                />
              </div>
            </div>

            {/* E-mail */}
            <div className={styles.inputGroup}>
              <label className={styles['label-input']} htmlFor="email">E-mail Corporativo:</label>
              <input 
                className={styles['input-field']} 
                type="email" 
                id="email" 
                name="email" 
                placeholder="seu.email@empresa.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {/* Senhas e Pop-up de Erro da Senha com Botões de Olho */}
            <div className={styles.inputGroup}>
              <div className={styles.rowGrid}>
                
                {/* Campo Senha */}
                <div>
                  <label className={styles['label-input']} htmlFor="senha">Senha:</label>
                  <div className={styles.passwordWrapper}>
                    <input 
                      className={`${styles['input-field']} ${erroSenha ? styles.inputError : ''}`} 
                      type={mostrarSenha ? "text" : "password"} 
                      id="senha" 
                      name="senha" 
                      placeholder="••••••••" 
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required 
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      title={mostrarSenha ? "Ocultar senha" : "Ver senha"}
                    >
                      {mostrarSenha ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>

                {/* Campo Confirmar Senha */}
                <div>
                  <label className={styles['label-input']} htmlFor="confirmar-senha">Confirmar Senha:</label>
                  <div className={styles.passwordWrapper}>
                    <input 
                      className={`${styles['input-field']} ${erroSenha ? styles.inputError : ''}`} 
                      type={mostrarSenha ? "text" : "password"} 
                      id="confirmar-senha" 
                      name="confirmar-senha" 
                      placeholder="••••••••" 
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required 
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      title={mostrarSenha ? "Ocultar senha" : "Ver senha"}
                    >
                      {mostrarSenha ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {erroSenha && (
                <div className={styles.tooltipContainerPassword}>
                  <span className={styles.errorIcon}>?</span>
                  <div className={styles.tooltipBox}>{erroSenha}</div>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles['submit-btn']} type="submit">Finalizar Cadastro</button>
              <button className={styles['cancel-btn']} type="button" onClick={() => navigate('/')}>
                Voltar ao Início
              </button>
            </div>
          </form>

          <div className={styles.footerLinks}>
            <span onClick={() => navigate('/login')} className={styles.linkLogin}>
              Já tem uma conta? <strong>Faça login</strong>
            </span>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados KIRON-TI © 2026</footer>
    </div>
  );
};

export default CadastroCliente;