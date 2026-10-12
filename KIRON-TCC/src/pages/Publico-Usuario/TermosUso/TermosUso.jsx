import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../../../components/HeaderPublico/HeaderPublico';
import FooterPublico from '../../../components/FooterPublico/FooterPublico';
import styles from './TermosUso.module.css';

const TermosUso = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <HeaderPublico />

      <main className={styles.mainContent}>
        <div className={styles.termsContainer}>
          
          <div className={styles.headerTitleArea}>
            <span className={styles.badge}>Legal</span>
            <h1>Termos de Uso</h1>
            <p className={styles.lastUpdate}>Última atualização: 12 de outubro de 2026</p>
          </div>

          <div className={styles.contentBody}>
            <section className={styles.termSection}>
              <h2>1. Visão Geral e Aceitação</h2>
              <p>
                Bem-vindo à <strong>Kiron TI</strong>. Estes Termos de Uso ("Termos") regulam o acesso e a utilização da nossa plataforma SaaS, site, painéis de gerenciamento e serviços de suporte de TI (coletivamente, os "Serviços").
              </p>
              <p>
                Ao se cadastrar, acessar ou utilizar a plataforma Kiron TI, você (doravante "Cliente" ou "Usuário") concorda expressamente em cumprir integralmente estes Termos, bem como a nossa Política de Privacidade. Caso não concorde com qualquer disposição destes termos, você não deverá utilizar os nossos Serviços.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>2. Cadastro e Conta de Usuário</h2>
              <p>
                Para usufruir dos recursos da plataforma, o Usuário deverá fornecer informações verdadeiras, completas e atualizadas no momento do cadastro (como nome do responsável, razão social, CNPJ e e-mail corporativo).
              </p>
              <ul>
                <li>O Usuário é o único responsável pela confidencialidade de sua senha e dados de acesso.</li>
                <li>Qualquer atividade realizada sob a sua conta será de sua total responsabilidade.</li>
                <li>A Kiron TI reserva-se o direito de recusar cadastros ou suspender contas que apresentem indícios de fraudes, informações falsas ou violação destes Termos.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>3. Descrição dos Serviços e Planos</h2>
              <p>
                A Kiron TI oferece soluções de terceirização de suporte técnico, monitoramento preventivo de ativos de TI e gestão de chamados através de uma assinatura mensal.
              </p>
              <ul>
                <li><strong>Planos e Pagamentos:</strong> Os valores, limites e escopos de atendimento variam de acordo com o plano contratado (Essencial, Profissional ou Enterprise). Os pagamentos são recorrentes e processados via meios seguros integrados à plataforma.</li>
                <li><strong>Reajustes:</strong> Os valores dos planos poderão ser reajustados anualmente, mediante aviso prévio aos clientes ativos.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>4. Uso Aceitável e Conduta</h2>
              <p>O Usuário compromete-se a utilizar a plataforma da Kiron TI estritamente para fins lícitos e profissionais. É terminantemente proibido:</p>
              <ul>
                <li>Utilizar os serviços para transmitir conteúdos ilegais, maliciosos, vírus, códigos de exploração ou que violem direitos de terceiros.</li>
                <li>Tentar burlar, descompilar, aplicar engenharia reversa ou comprometer a segurança da infraestrutura tecnológica da Kiron TI.</li>
                <li>Sobrecarregar intencionalmente os servidores ou canais de atendimento com requisições automatizadas abusivas.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>5. Propriedade Intelectual</h2>
              <p>
                Todos os direitos de propriedade intelectual relativos à plataforma Kiron TI (incluindo textos, códigos-fonte, design, logotipos, interfaces e marcas registradas) são de propriedade exclusiva da Kiron TI. O uso da plataforma não transfere ao Usuário nenhum direito de propriedade sobre os softwares ou ativos protegidos.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>6. Privacidade e Proteção de Dados (LGPD)</h2>
              <p>
                A Kiron TI preza pela segurança dos dados de sua empresa. As informações coletadas durante o cadastro e monitoramento são tratadas em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Para mais detalhes sobre como armazenamos e protegemos seus dados, consulte nossa política específica.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>7. Limitação de Responsabilidade</h2>
              <p>
                A Kiron TI empenha-se em manter os serviços disponíveis de forma contínua e segura (SLA acordado por plano). No entanto, não nos responsabilizamos por:
              </p>
              <ul>
                <li>Instabilidades decorrentes de falhas na conexão de internet do próprio Cliente ou serviços de terceiros (como provedores de nuvem e telecomunicações).</li>
                <li>Prejuízos causados por mau uso da plataforma ou negligência na guarda de credenciais de acesso por parte do Usuário.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>8. Cancelamento e Rescisão</h2>
              <p>
                O Cliente poderá solicitar o cancelamento de sua assinatura a qualquer momento através do painel de controle ou canais de suporte oficiais.
              </p>
              <ul>
                <li>O cancelamento interromperá a renovação automática para o ciclo seguinte, mantendo o acesso ativo até o término do período já pago.</li>
                <li>A Kiron TI poderá rescindir ou suspender imediatamente o acesso aos Serviços, sem direito a reembolso, caso haja violação comprovada destes Termos.</li>
              </ul>
            </section>

            <section className={styles.termSection}>
              <h2>9. Alterações nos Termos</h2>
              <p>
                Estes Termos poderão ser modificados periodicamente para refletir melhorias na plataforma ou exigências legais. As alterações entram em vigor imediatamente após a publicação da nova versão atualizada no site oficial. O uso continuado dos serviços após as modificações implica na aceitação tácita dos novos termos.
              </p>
            </section>

            <section className={styles.termSection}>
              <h2>10. Legislação Aplicável e Foro</h2>
              <p>
                Estes Termos são regidos e interpretados de acordo com as leis da República Federativa do Brasil. Quaisquer litígios ou controvérsias oriundas destes Termos serão submetidos ao foro da comarca da sede da empresa, com renúncia expressa a qualquer outro.
              </p>
            </section>

         

          </div>

        </div>
      </main>

      <FooterPublico />
    </div>
  );
};

export default TermosUso;