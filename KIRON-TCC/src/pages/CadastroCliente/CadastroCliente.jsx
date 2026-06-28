import styles from './CadastroCliente.module.css';

const CadastroCliente = () => {
  return (
    <div className={styles['cadastro-container']}>
        <h1>Cadastro de Cliente</h1>
        <form>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br /> 
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" required />
            <br />
            <label htmlFor="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" required />
            <br />
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />
            <br />
            <label htmlFor="confirmar-senha">Confirmar Senha:</label>
            <input type="password" id="confirmar-senha" name="confirmar-senha" required />
            <button type="submit">Cadastrar</button>
        </form>
    </div>


  );
}
export default CadastroCliente;