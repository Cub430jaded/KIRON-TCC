import { useNavigate } from 'react-router-dom'
import styles from './CadastroCliente.module.css'

const CadastroCliente = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.pageWrapper}>
      <div className={styles['container-fundo']}>
        <div className={styles['card']}>
          <h1>Cadastro de Cliente</h1>
          <form className={styles['form-grid']}>
            <label className={styles['label-input']} htmlFor="nome">Nome:</label>
            <input className={styles['input-field']} type="text" id="nome" name="nome" required />

            <label className={styles['label-input']} htmlFor="email">Email:</label>
            <input className={styles['input-field']} type="email" id="email" name="email" required />

            <label className={styles['label-input']} htmlFor="cpf">CPF:</label>
            <input className={styles['input-field']} type="text" id="cpf" name="cpf" required />

            <label className={styles['label-input']} htmlFor="telefone">Telefone:</label>
            <input className={styles['input-field']} type="tel" id="telefone" name="telefone" required />

            <label className={styles['label-input']} htmlFor="senha">Senha:</label>
            <input className={styles['input-field']} type="password" id="senha" name="senha" required />

            <label className={styles['label-input']} htmlFor="confirmar-senha">Confirmar Senha:</label>
            <input className={styles['input-field']} type="password" id="confirmar-senha" name="confirmar-senha" required />

            <div className={styles.actions}>
              <button className={styles['submit-btn']} type="button" onClick={() => navigate('/login')}>Cadastrar</button>
              <button className={styles['cancel-btn']} type="button" onClick={() => navigate('/login')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados KIRON-TI © 2026</footer>
    </div>
  )
}

export default CadastroCliente;
