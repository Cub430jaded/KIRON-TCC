import styles from './LoginUsuario.module.css'

const LoginUsuario = () => {
  return (
    <div className={styles.loginContainer}>
        <h1>Login de Usuário</h1>
        <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />
            <br />
            <button type="submit">Entrar</button>
        </form>
    </div>
  );
}
export default LoginUsuario;