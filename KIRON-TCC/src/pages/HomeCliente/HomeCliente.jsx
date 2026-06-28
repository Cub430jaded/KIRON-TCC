import { useNavigate } from 'react-router-dom'
import styles from './HomeCliente.module.css'

const HomeCliente = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.pageWrapper}>
      <div className={styles['container-fundo']}>
        <div className={styles.card}>
          <h1>Bem-vindo, Cliente!</h1>
          <p>Esta é a página inicial do cliente.</p>
          <button className={styles['submit-btn']} type="button" onClick={() => navigate('/login')}>
            Voltar para Login
          </button>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados © 2026</footer>
    </div>
  )
}

export default HomeCliente;
