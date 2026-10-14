import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './LoginUsuario.module.css';

const LoginUsuario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Uso do Axios
      const res = await api.post('/auth/login', { email, senha });
      const usuarioAutenticado = res.data;
      
      localStorage.setItem('kiron_usuario_logado', 'true');
      localStorage.setItem('kiron_usuario_logado_dados', JSON.stringify(usuarioAutenticado));

      if (usuarioAutenticado.perfil === 'GESTOR' || usuarioAutenticado.perfil === 'TECNICO') {
        navigate('/FilaTecnico');
      } else {
        navigate('/HomeCliente');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      const msgErro = err.response?.data || 'Erro de conexão com o servidor Java!';
      alert('Falha no login: ' + msgErro);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles['container-fundo']}>
        <div className={styles.card}>
          <div className={styles.logoArea} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className={styles.logoKiron}>Kiron</span>
            <span className={styles.logoTi}>TI</span>
          </div>
          <h1>Entrar na Kiron TI</h1>
          <p className={styles.subtitle}>Acesse o seu painel de gerenciamento</p>

          <form onSubmit={handleLogin} className={styles['form-grid']}>
            <div className={styles.inputGroup}>
              <label className={styles['label-input']}>E-mail Corporativo</label>
              <input 
                type="email" 
                className={styles['input-field']} 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles['label-input']}>Senha</label>
              <div className={styles.passwordWrapper}>
                <input 
                  type={mostrarSenha ? "text" : "password"} 
                  className={styles['input-field']} 
                  placeholder="Sua senha"
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
                  <i className={mostrarSenha ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
              <span className={styles.linkForgotPassword} onClick={() => navigate('/recuperar-senha')}>
                Esqueceu a senha?
              </span>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles['submit-btn']}>Entrar</button>
              <button type="button" className={styles['cancel-btn']} onClick={() => navigate('/')}>
                Voltar
              </button>
            </div>
          </form>

          <div className={styles.footerLinks}>
            <span className={styles.linkRegister} onClick={() => navigate('/cadastro')}>
              Não tem uma conta? <strong>Cadastre-se</strong>
            </span>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados KIRON-TI © 2026</footer>
    </div>
  );
};

export default LoginUsuario;