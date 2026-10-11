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

    // Registra o usuário como logado automaticamente após o cadastro sem exibir alertas
    localStorage.setItem('kiron_usuario_logado', 'true');
    navigate('/'); 
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

            {/* Senhas e Pop-up de Erro da Senha */}
            <div className={styles.inputGroup}>
              <div className={styles.rowGrid}>
                <div>
                  <label className={styles['label-input']} htmlFor="senha">Senha:</label>
                  <input 
                    className={`${styles['input-field']} ${erroSenha ? styles.inputError : ''}`} 
                    type="password" 
                    id="senha" 
                    name="senha" 
                    placeholder="••••••••" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <label className={styles['label-input']} htmlFor="confirmar-senha">Confirmar Senha:</label>
                  <input 
                    className={`${styles['input-field']} ${erroSenha ? styles.inputError : ''}`} 
                    type="password" 
                    id="confirmar-senha" 
                    name="confirmar-senha" 
                    placeholder="••••••••" 
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required 
                  />
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