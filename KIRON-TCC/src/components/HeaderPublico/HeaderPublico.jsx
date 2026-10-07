import { useNavigate } from 'react-router-dom';
import styles from './HeaderPublico.module.css';

const HeaderPublico = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <span className={styles.logoKiron}>Kiron</span>
        <span className={styles.logoTi}>TI</span>
      </div>
      <nav className={styles.navButtons}>
        <button 
          className={styles.loginBtn} 
          onClick={() => navigate('/login')}
        >
          Acessar Sistema
        </button>
        <button 
          className={styles.registerBtn} 
          onClick={() => navigate('/planos')}
        >
          Ver Planos
        </button>
      </nav>
    </header>
  );
};

export default HeaderPublico;