import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../../components/HeaderPublico/HeaderPublico';
import FooterPublico from '../../../components/FooterPublico/FooterPublico';
import styles from './PoliticaPrivacidade.module.css';

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <HeaderPublico />

      <main className={styles.mainContent}>
        <div className={styles.termsContainer}>
          
          <div className={styles.headerTitleArea}>
            <span className={styles.badge}>Compliance & Privacidade</span>
            <h1>Política de Privacidade</h1>
            <p className={styles.lastUpdate}>Última atualização: 12 de outubro de 2026</p>
          </div>

          <div className={styles.contentBody}>
            <section className={styles.termSection}>
              <h2>1. Compromisso com a sua Privacidade</h2>
              <p>
                A <strong>Kiron TI</strong> ("nós", "nosso" ou "plataforma") está profundamente comprometida com a proteção da privacidade e dos dados pessoais de seus clientes, parceiros e usuários. Esta Política de Privacidade descreve de forma transparente como coletamos, usamos, armazenamos, compartilhamos e protegemos suas informações ao utilizar nosso SaaS de suporte técnico, monitoramento e gestão de TI.
              </p>
              <p>
                Ao acessar nossa plataforma ou contratar nossos serviços, você declara estar ciente e de acordo com as práticas descritas neste documento, em total conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e demais legislações aplicáveis.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>2. Dados Coletados</h2>
              <p>Para fornecer e otimizar nossos serviços de suporte e infraestrutura, coletamos diferentes categorias de informações:</p>
              <ul>
                <li><strong>Dados Cadastrais da Empresa e do Responsável:</strong> Nome completo, razão social, CNPJ, e-mail corporativo, número de telefone / WhatsApp e endereço postal.</li>
                <li><strong>Dados de Acesso e Credenciais:</strong> Senhas criptografadas, registros de data e horário (logs) de acesso, endereço IP e identificadores de dispositivos utilizados para login na plataforma.</li>
                <li><strong>Dados de Infraestrutura de TI (Monitoramento):</strong> Informações técnicas sobre os computadores e servidores cadastrados (como métricas de desempenho, status de hardware, inventário de softwares e rede), estritamente necessários para a prestação do suporte preventivo.</li>
                <li><strong>Dados de Pagamento:</strong> Informações financeiras e de cobrança processadas por gateways de pagamento seguros parceiros (a Kiron TI não armazena dados completos de cartões de crédito em seus servidores).</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>3. Finalidades do Tratamento de Dados</h2>
              <p>Utilizamos os dados coletados para propósitos legítimos e específicos, tais como:</p>
              <ul>
                <li><strong>Prestação e Execução do Contrato:</strong> Configurar o painel de saúde, gerenciar chamados de suporte técnico e executar os serviços contratados no seu plano.</li>
                <li><strong>Segurança e Autenticação:</strong> Validar a identidade do usuário, prevenir fraudes, garantir a integridade do sistema e proteger contas contra acessos não autorizados.</li>
                <li><strong>Comunicação:</strong> Enviar atualizações de status de chamados, faturas, avisos de manutenção, informativos contratuais e suporte via canais oficiais.</li>
                <li><strong>Melhoria Contínua:</strong> Analisar tendências de uso e desempenho da plataforma para aprimorar nossas ferramentas e desenvolver novas funcionalidades.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>4. Compartilhamento e Operadores de Dados</h2>
              <p>
                A Kiron TI não comercializa nem aluga dados pessoais a terceiros. O compartilhamento de informações ocorre apenas nas seguintes hipóteses estritamente necessárias:
              </p>
              <ul>
                <li><strong>Provedores de Infraestrutura e Tecnologia:</strong> Empresas parceiras de hospedagem em nuvem, bancos de dados e ferramentas de segurança que garantem o funcionamento técnico da plataforma sob rigorosos acordos de confidencialidade.</li>
                <li><strong>Processadores de Pagamento:</strong> Instituições financeiras e processadores de transações para efetivação da cobrança dos planos de assinatura.</li>
                <li><strong>Obrigações Legais:</strong> Autoridades governamentais, judiciais ou administrativas, mediante ordem legal ou cumprimento de obrigações regulatórias.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>5. Segurança da Informação</h2>
              <p>
                Adotamos medidas técnicas, administrativas e de segurança da informação compatíveis com os padrões de mercado para proteger seus dados contra acessos não autorizados, destruição, perda, alteração ou difusão indevida. Isso inclui o uso de criptografia avançada (SSL/TLS) para tráfego de dados, senhas com criptografia de ponta e controle restrito de privilégios de acesso aos servidores internos.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>6. Retenção e Término do Tratamento de Dados</h2>
              <p>
                Os dados pessoais serão armazenados somente pelo tempo necessário para cumprir as finalidades para os quais foram coletados, incluindo o cumprimento de obrigações legais, contratuais, prestação de contas ou resolução de disputas. Após o encerramento do contrato de assinatura, os dados poderão ser eliminados ou anonimizados, ressalvadas as hipóteses de guarda obrigatória por lei.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>7. Direitos do Titular dos Dados (LGPD)</h2>
              <p>
                Conforme previsto no artigo 18 da LGPD, você, enquanto titular de dados pessoais, possui os seguintes direitos em relação aos seus dados:
              </p>
              <ul>
                <li>Confirmação da existência de tratamento e acesso aos dados.</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou em desconformidade com a lei.</li>
                <li>Portabilidade dos dados a outro fornecedor de serviço ou produto.</li>
                <li>Eliminação dos dados pessoais tratados com o consentimento do titular.</li>
                <li>Informação sobre o compartilhamento com entidades públicas e privadas.</li>
                <li>Revogação do consentimento a qualquer momento.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>8. Cookies e Tecnologias de Rastreamento</h2>
              <p>
                Nossa plataforma utiliza cookies e tecnologias similares estritamente necessários para autenticação de sessão, preferências de navegação e funcionamento seguro do painel. O Usuário pode gerenciar ou desativar os cookies diretamente nas configurações de seu navegador, embora algumas funcionalidades essenciais da plataforma possam ser afetadas.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>9. Atualizações da Política de Privacidade</h2>
              <p>
                Esta Política de Privacidade poderá ser revisada e atualizada periodicamente para refletir evoluções regulatórias ou melhorias operacionais. Recomendamos que você consulte esta página regularmente. A continuidade do uso dos serviços após as alterações constitui concordância com a nova versão.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>10. Canal de Atendimento e Encarregado (DPO)</h2>
              <p>
                Caso tenha dúvidas, comentários ou deseje exercer qualquer um dos seus direitos referentes à proteção de dados e privacidade, entre em contato com o nosso Encarregado de Proteção de Dados através do canal oficial:
              </p>
              <p><strong>E-mail de Privacidade:</strong> privacidade@kironti.com.br</p>
            </section>

          </div>

        </div>
      </main>

      <FooterPublico />
    </div>
  );
};

export default PoliticaPrivacidade;