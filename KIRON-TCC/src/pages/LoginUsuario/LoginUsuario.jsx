import styles from './LoginUsuario.module.css'

const LoginUsuario = ({ onCadastro }) => {
  return (  
    <div className={styles['login-container']}>
        <h1>Login de Usuário</h1>
        <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />
            <br />
            <div className={styles['botao-container']}>
                <button type="submit">Entrar</button>
                <button type="button" onClick={onCadastro}>Cadastrar</button>
            </div>
        </form>
    </div>
  );
}
export default LoginUsuario;