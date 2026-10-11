import { Link } from 'react-router-dom';
import styles from './FooterPublico.module.css';

const FooterPublico = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Coluna 1: Marca e Descrição */}
        <div className={styles.footerBrand}>
          <h2 className={styles.logo}>
            <span className={styles.logoKiron}>Kiron</span> TI
          </h2>
          <p>
            Soluções em infraestrutura e suporte ágil de TI para impulsionar e proteger a sua pequena empresa.
          </p>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div className={styles.footerLinks}>
          <h3>Navegação</h3>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/planos">Ver Planos</Link></li>
            <li><Link to="/cadastro">Assinar Agora</Link></li>
            <li><Link to="/login">Área do Cliente</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Contatos */}
        <div className={styles.footerContact}>
          <h3>Fale Conosco</h3>
          <p>
            <i className="fa-solid fa-envelope"></i> contato@kironti.com.br
          </p>
          <p>
            <i className="fa-brands fa-whatsapp"></i> (11) 99999-9999
          </p>
        </div>
        
      </div>

      {/* Barra inferior: Direitos e Links Legais */}
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Kiron TI. Todos os direitos reservados.</p>
        <div className={styles.legalLinks}>
          <a href="#termos">Termos de Uso</a>
          <a href="#privacidade">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterPublico;