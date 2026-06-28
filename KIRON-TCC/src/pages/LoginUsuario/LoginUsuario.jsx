import { useNavigate } from 'react-router-dom'
import styles from './LoginUsuario.module.css'

const LoginUsuario = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/homeCliente')
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles['container-fundo']}>
        <div className={styles['card']}>
          <h1>Login de Usuário</h1>
          <form className={styles['form-grid']} onSubmit={handleSubmit}>
            <label className={styles['label-input']} htmlFor="email">Email:</label>
            <input className={styles['input-field']} type="email" id="email" name="email" required />

            <label className={styles['label-input']} htmlFor="senha">Senha:</label>
            <input className={styles['input-field']} type="password" id="senha" name="senha" required />

            <div className={styles.actions}>
              <button className={styles['submit-btn']} type="submit">Entrar</button>
              <button className={styles['cancel-btn']} type="button" onClick={() => navigate('/cadastro')} >Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados © 2026</footer>
    </div>
  );
}
export default LoginUsuario;