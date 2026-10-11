import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderPublico.module.css';

const HeaderPublico = () => {
  const navigate = useNavigate();
  const [estaLogado, setEstaLogado] = useState(false);

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const usuarioLogado = localStorage.getItem('kiron_usuario_logado');
    if (usuarioLogado) {
      setEstaLogado(true);
    }
  }, []);

  // Função para deslogar (Sair)
  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    setEstaLogado(false);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoArea} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className={styles.logoKiron}>Kiron</span>
        <span className={styles.logoTi}>TI</span>
      </div>
      
      <nav className={styles.navButtons}>
        {!estaLogado ? (
          /* Botões quando o usuário NÃO está logado */
          <>
            <button 
              className={styles.loginBtn} 
              onClick={() => navigate('/login')}
            >
              Acessar Sistema
            </button>
            <button 
              className={styles.registerBtn} 
              onClick={() => navigate('/cadastro')}
            >
              Cadastre-se
            </button>
          </>
        ) : (
          /* Botões quando o usuário JÁ está logado */
          <>
            <button 
              className={styles.loginBtn} 
              onClick={() => navigate('/homeCliente')}
            >
              Meu Painel
            </button>
            <button 
              className={styles.registerBtn} 
              onClick={handleLogout}
              style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }} // Dica visual opcional em vermelho para o Sair
            >
              Sair
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default HeaderPublico;