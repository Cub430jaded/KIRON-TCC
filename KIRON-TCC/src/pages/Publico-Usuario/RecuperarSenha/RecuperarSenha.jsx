import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecuperarSenha.module.css';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Altera o estado para mostrar a mensagem de sucesso de forma limpa na tela
    setEnviado(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles['container-fundo']}>
        <div className={styles['card']}>
          <div className={styles.logoArea}>
            <span className={styles.logoKiron}>Kiron</span>
            <span className={styles.logoTi}>TI</span>
          </div>
          <h1>Recuperar Senha</h1>
          <p className={styles.subtitle}>
            {!enviado 
              ? 'Digite seu e-mail corporativo ou CNPJ para receber as instruções.' 
              : 'Instruções enviadas com sucesso! Verifique sua caixa de entrada.'}
          </p>

          {!enviado ? (
            <form className={styles['form-grid']} onSubmit={handleEnviar}>
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

              <div className={styles.actions}>
                <button className={styles['submit-btn']} type="submit">Enviar Instruções</button>
                <button className={styles['cancel-btn']} type="button" onClick={() => navigate('/login')}>
                  Voltar ao Login
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.actions} style={{ marginTop: '10px' }}>
              <button className={styles['submit-btn']} type="button" onClick={() => navigate('/login')}>
                Voltar ao Login
              </button>
            </div>
          )}

          <div className={styles.footerLinks}>
            <span onClick={() => navigate('/cadastro')} className={styles.linkRegister}>
              Ainda não tem uma conta? <strong>Cadastre sua empresa</strong>
            </span>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados KIRON-TI © 2026</footer>
    </div>
  );
};

export default RecuperarSenha;