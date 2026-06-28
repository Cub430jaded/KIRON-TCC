import styles from './LoginUsuario.module.css'

const LoginUsuario = ({ onCadastro }) => {
  return (  
     <div className={styles['container-fundo']}>
          <div className={styles['card']}>
            <h1>Login de Usuário</h1>
            <form className={styles['form-grid']}>
            
              <label className={styles['label-input']} htmlFor="email">Email:</label>
              <input className={styles['input-field']} type="email" id="email" name="email" required />
        
              <label className={styles['label-input']} htmlFor="senha">Senha:</label>
              <input className={styles['input-field']} type="password" id="senha" name="senha" required />
    
              <div className={styles.actions}>
                <button className={styles['submit-btn']} type="submit">Entrar</button>
                <button className={styles['cancel-btn']} type="button" onClick={() => window.location.href = '/cadastro'} >Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
  );
}
export default LoginUsuario;