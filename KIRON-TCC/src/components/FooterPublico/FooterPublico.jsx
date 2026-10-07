import styles from './FooterPublico.module.css';

const FooterPublico = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <h2>Kiron<span className={styles.lightText}>TI</span></h2>
          <p>Democratizando o acesso à tecnologia para micro e pequenas empresas.</p>
        </div>
        <div className={styles.footerLinks}>
          <h4>Soluções</h4>
          <a href="#">Planos e Preços</a>
          <a href="#">Consultoria Estratégica</a>
          <a href="#">Painel de Saúde</a>
        </div>
        <div className={styles.footerLinks}>
          <h4>Contato</h4>
          <p>suporte@kironti.com.br</p>
          <p>(11) 99999-9999</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2026 Kiron TI. Todos os direitos reservados. Projeto TCC FIEB.</p>
      </div>
    </footer>
  );
};

export default FooterPublico;