import { useNavigate } from 'react-router-dom';
import styles from './Planos.module.css';

const Planos = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.containerFundo}>
        <div className={styles.cardContainer}>
          
          <div className={styles.logoArea} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className={styles.logoKiron}>Kiron</span>
            <span className={styles.logoTi}>TI</span>
          </div>
          <h1>Nossos Planos</h1>
          <p className={styles.subtitle}>Escolha a solução ideal em TI para impulsionar a sua empresa</p>

          {/* Grid de Planos */}
          <div className={styles.planosGrid}>
            
            {/* Plano Básico */}
            <div className={styles.planoCard}>
              <div className={styles.planoHeader}>
                <h3>Essencial</h3>
                <p className={styles.planoDesc}>Para pequenas empresas que buscam suporte ágil.</p>
                <div className={styles.preco}>
                  <span className={styles.moeda}>R$</span>
                  <span className={styles.valor}>299</span>
                  <span className={styles.periodo}>/mês</span>
                </div>
              </div>
              <ul className={styles.listaBeneficios}>
                <li>Suporte remoto ilimitado</li>
                <li>Atendimento em horário comercial</li>
                <li>Monitoramento básico de rede</li>
                <li>SLA de atendimento: até 4h</li>
              </ul>
              <button 
                className={styles.btnPlano} 
                onClick={() => navigate('/cadastro')}
              >
                Contratar Essencial
              </button>
            </div>

            {/* Plano Profissional (Destaque) */}
            <div className={`${styles.planoCard} ${styles.planoDestaque}`}>
              <div className={styles.badgePopular}>Mais Popular</div>
              <div className={styles.planoHeader}>
                <h3>Profissional</h3>
                <p className={styles.planoDesc}>Solução completa para médias empresas.</p>
                <div className={styles.preco}>
                  <span className={styles.moeda}>R$</span>
                  <span className={styles.valor}>699</span>
                  <span className={styles.periodo}>/mês</span>
                </div>
              </div>
              <ul className={styles.listaBeneficios}>
                <li>Suporte remoto e presencial</li>
                <li>Atendimento estendido 24/7</li>
                <li>Gestão de infraestrutura e servidores</li>
                <li>Backup em nuvem automatizado</li>
                <li>SLA de atendimento: até 1h</li>
              </ul>
              <button 
                className={styles.btnPlanoDestaque} 
                onClick={() => navigate('/cadastro')}
              >
                Contratar Profissional
              </button>
            </div>

            {/* Plano Enterprise */}
            <div className={styles.planoCard}>
              <div className={styles.planoHeader}>
                <h3>Enterprise</h3>
                <p className={styles.planoDesc}>Estrutura sob medida e consultoria avançada.</p>
                <div className={styles.preco}>
                  <span className={styles.valorCustom}>Sob Consulta</span>
                </div>
              </div>
              <ul className={styles.listaBeneficios}>
                <li>Técnico dedicado exclusivo</li>
                <li>Consultoria de TI estratégica</li>
                <li>Segurança da informação avançada</li>
                <li>SLA prioritário personalizado</li>
              </ul>
              <button 
                className={styles.btnPlano} 
                onClick={() => navigate('/cadastro')}
              >
                Falar com Consultor
              </button>
            </div>

          </div>

          <div className={styles.actionsBottom}>
            <button className={styles.cancelBtn} type="button" onClick={() => navigate('/')}>
              Voltar ao Início
            </button>
          </div>

        </div>
      </div>
      <footer className={styles.footer}>Direitos reservados KIRON-TI © 2026</footer>
    </div>
  );
};

export default Planos;