import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginUsuario.module.css';

const LoginUsuario = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Registra a sessão no navegador simulando o login bem-sucedido
    localStorage.setItem('kiron_usuario_logado', 'true');

    // Redireciona imediatamente para a página principal sem exibir alertas
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
          <h1>Acessar Sistema</h1>
          <p className={styles.subtitle}>Entre com suas credenciais para continuar</p>

          <form className={styles['form-grid']} onSubmit={handleLogin}>
            
            <div className={styles.inputGroup}>
              <label className={styles['label-input']} htmlFor="email">E-mail Corporativo ou CNPJ:</label>
              <input 
                className={styles['input-field']} 
                type="text" 
                id="email" 
                name="email" 
                placeholder="seu.email@empresa.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles['label-input']} htmlFor="senha">Senha:</label>
              <input 
                className={styles['input-field']} 
                type="password" 
                id="senha" 
                name="senha" 
                placeholder="••••••••" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
            </div>

            <div className={styles.actions}>
              <button className={styles['submit-btn']} type="submit">Entrar</button>
              <button className={styles['cancel-btn']} type="button" onClick={() => navigate('/')}>
                Voltar ao Início
              </button>
            </div>
          </form>

          <div className={styles.footerLinks}>
            <span onClick={() => navigate('/cadastro')} className={styles.linkRegister}>
              Ainda não tem uma conta? <strong>Cadastre sua empresa</strong>
            </span>
           <div style={{ marginTop: '8px' }}>
           <span onClick={() => navigate('/recuperar-senha')} className={styles.linkForgotPassword}>
           <strong>Esqueceu a senha?</strong>
            </span>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados KIRON-TI © 2026</footer>
    </div>
  );
};

export default LoginUsuario;