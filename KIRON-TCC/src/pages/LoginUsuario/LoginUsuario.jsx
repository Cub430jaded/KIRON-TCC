const LoginUsuario = () => {
  return (
    <div>
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