const CadastroCliente = () => {
  return (
    <div>
        <h1>Cadastro de Cliente</h1>
        <form>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" required />
            <br />
            <button type="submit">Cadastrar</button>
        </form>
    </div>
  );
}
export default CadastroCliente;