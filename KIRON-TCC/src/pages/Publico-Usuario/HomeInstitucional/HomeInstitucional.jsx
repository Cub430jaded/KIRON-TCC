import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../../components/HeaderPublico/HeaderPublico';
import FooterPublico from '../../../components/FooterPublico/FooterPublico';
import styles from './HomeInstitucional.module.css';

import img1 from '../../../assets/banner1.jpeg';
import img2 from '../../../assets/banner2.jpeg';
import img3 from '../../../assets/banner3.jpeg';
const imagensCarrossel = [img1, img2, img3];

const HomeInstitucional = () => {
  const navigate = useNavigate();
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideAtual((prev) => (prev === imagensCarrossel.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const proximoSlide = () => {
    setSlideAtual((prev) => (prev === imagensCarrossel.length - 1 ? 0 : prev + 1));
  };

  const slideAnterior = () => {
    setSlideAtual((prev) => (prev === 0 ? imagensCarrossel.length - 1 : prev - 1));
  };

  return (
    <div className={styles.pageWrapper}>
      <HeaderPublico />

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          
          <div className={styles.carouselContainer}>
            
            <button className={`${styles.carouselBtn} ${styles.prevBtn}`} onClick={slideAnterior}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* VIEWPORT: Esta div corta as imagens extras */}
            <div className={styles.carouselViewport}>
              <div 
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${slideAtual * 100}%)` }}
              >
                {imagensCarrossel.map((img, index) => (
                  <div key={index} className={styles.carouselSlide}>
                    <img src={img} alt={`Banner Kiron ${index + 1}`} className={styles.carouselImage} />
                  </div>
                ))}
              </div>
            </div>

            <button className={`${styles.carouselBtn} ${styles.nextBtn}`} onClick={proximoSlide}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className={styles.carouselDots}>
              {imagensCarrossel.map((_, index) => (
                <span 
                  key={index} 
                  className={`${styles.dot} ${index === slideAtual ? styles.activeDot : ''}`}
                  onClick={() => setSlideAtual(index)}
                ></span>
              ))}
            </div>
          </div>

          <div className={styles.badge}>SaaS de Suporte de TI</div>
          <h1 className={styles.heroTitle}>
            Tecnologia não é custo, é o <span className={styles.highlight}>motor do seu negócio.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Terceirize sua TI com a Kiron. Suporte ágil, monitoramento preventivo e soluções que cabem no bolso da sua pequena empresa.
          </p>
          <div className={styles.actionArea}>
            <button className={styles.ctaButton} onClick={() => navigate('/cadastro')}>
              Começar Agora
            </button>
            <p className={styles.subText}>Planos a partir de R$ 99/mês. Cancele quando quiser.</p>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.card}>
            <div className={styles.iconPlaceholder}>
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <h3>Suporte via WhatsApp</h3>
            <p>Esqueça os tickets burocráticos. Fale com um especialista direto no chat e resolva problemas em minutos.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconPlaceholder}>
              <i className="fa-solid fa-desktop"></i>
            </div>
            <h3>Painel de Saúde</h3>
            <p>Acompanhe todos os seus computadores em tempo real. Saiba exatamente quais máquinas precisam de atenção.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconPlaceholder}>
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </div>
            <h3>Custo Fixo Mensal</h3>
            <p>Sem surpresas no fim do mês. Manutenção preventiva e suporte contínuo por uma assinatura acessível.</p>
          </div>
        </section>

        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>Como a Kiron TI funciona?</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Assine um Plano</h4>
              <p>Escolha o pacote ideal baseado no tamanho da sua equipe e infraestrutura.</p>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Cadastre seus PCs</h4>
              <p>Mapeamos seus equipamentos e configuramos nosso monitoramento remoto.</p>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Trabalhe sem Pausas</h4>
              <p>Deu problema? Abra um chamado. Nós resolvemos enquanto você foca no seu negócio.</p>
            </div>
          </div>
        </section>
      </main>

      <FooterPublico />
    </div>
  );
};

export default HomeInstitucional;