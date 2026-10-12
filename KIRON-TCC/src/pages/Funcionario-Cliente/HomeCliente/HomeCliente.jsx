import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeCliente.module.css';

const HomeCliente = () => {
  const navigate = useNavigate();
  const [nomeEmpresa, setNomeEmpresa] = useState('Sua Empresa');

  useEffect(() => {
  const estaLogado = localStorage.getItem('kiron_usuario_logado') === 'true';
  if (!estaLogado) {
    navigate('/Login');
    return;
  }

  // Carrega os dados gravados no Login/Cadastro/Perfil
  const usuarioSalvo = JSON.parse(localStorage.getItem('kiron_usuario_logado_dados'));
  if (usuarioSalvo && usuarioSalvo.empresa) {
    setNomeEmpresa(usuarioSalvo.empresa);
  }
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kiron_usuario_logado');
    navigate('/Login');
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea} onClick={() => navigate('/HomeCliente')}>
          <span className={styles.logoKiron}>Kiron</span>
          <span className={styles.logoTi}>TI</span>
        </div>

        <nav className={styles.navMenu}>
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/HomeCliente')}>
            <i className="fa-solid fa-table-columns"></i> Dashboard
          </button>
          <button className={styles.navItem} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-circle-plus"></i> Abrir Chamado
          </button>
          <button className={styles.navItem} onClick={() => navigate('/MeusChamados')}>
            <i className="fa-solid fa-headset"></i> Meus Chamados
          </button>
          <button className={styles.navItem} onClick={() => navigate('/PerfilUsuario')}>
            <i className="fa-solid fa-user-gear"></i> Perfil do Usuário
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
      <main className={styles.mainContent}>
        
        {/* CABEÇALHO */}
        <header className={styles.headerBlock}>
          <div>
            <h1>Painel de Controle do Cliente</h1>
            <p className={styles.welcomeText}>Empresa Conectada: <strong>{nomeEmpresa}</strong></p>
          </div>
          <button className={styles.btnNovoChamado} onClick={() => navigate('/AbrirChamado')}>
            <i className="fa-solid fa-plus"></i> Abrir Novo Chamado
          </button>
        </header>

        {/* PAINEL 1: PLANILHA DE MÉTRICAS RÁPIDAS */}
        <section className={styles.sheetSection}>
          <h2 className={styles.sectionTitle}>
            <i className="fa-solid fa-chart-simple"></i> Resumo de Indicadores
          </h2>
          <table className={styles.sheetTable}>
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor / Quantidade</th>
                <th>Status Atual</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PCs Monitorados</strong></td>
                <td>12 Computadores</td>
                <td><span className={styles.badgeSuccess}>Operacional</span></td>
                <td>Todos com agente ativo</td>
              </tr>
              <tr>
                <td><strong>Chamados Abertos</strong></td>
                <td>2 Chamados</td>
                <td><span className={styles.badgeWarning}>Aguardando Técnico</span></td>
                <td>1 Alta / 1 Média Prioridade</td>
              </tr>
              <tr>
                <td><strong>Resolvidos no Mês</strong></td>
                <td>28 Concluídos</td>
                <td><span className={styles.badgeSuccess}>Dentro do SLA</span></td>
                <td>Tempo médio de resposta: 18 min</td>
              </tr>
              <tr>
                <td><strong>Saúde da Rede Geral</strong></td>
                <td>100%</td>
                <td><span className={styles.badgeSuccess}>Excelente</span></td>
                <td>Sem alertas críticos de segurança</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* PAINEL 2: PLANILHA DE CHAMADOS RECENTES */}
        <section className={styles.sheetSection}>
          <div className={styles.sheetHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-list-check"></i> Registro de Chamados Recentes
            </h2>
            <button className={styles.linkBtn} onClick={() => navigate('/MeusChamados')}>
              Ver Histórico Completo &rarr;
            </button>
          </div>

          <table className={styles.sheetTable}>
            <thead>
              <tr>
                <th>Protocolo</th>
                <th>Descrição do Problema</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Data de Abertura</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.codeCell}>#KR-8021</td>
                <td>Lentidão na rede do setor Financeiro</td>
                <td><span className={`${styles.badgePriority} ${styles.high}`}>Alta</span></td>
                <td><span className={`${styles.badgeStatus} ${styles.inProgress}`}>Em Atendimento</span></td>
                <td>12/10/2026 - 10:15</td>
                <td>
                  <button 
                    className={styles.actionBtn} 
                    onClick={() => navigate('/DetalhesChamado', { state: { protocolo: '#KR-8021' } })}
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.codeCell}>#KR-8019</td>
                <td>Instalação de software de edição no PC-04</td>
                <td><span className={`${styles.badgePriority} ${styles.low}`}>Baixa</span></td>
                <td><span className={`${styles.badgeStatus} ${styles.pending}`}>Fila de Espera</span></td>
                <td>11/10/2026 - 16:40</td>
                <td>
                  <button 
                    className={styles.actionBtn} 
                    onClick={() => navigate('/DetalhesChamado', { state: { protocolo: '#KR-8019' } })}
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.codeCell}>#KR-7994</td>
                <td>Configuração de rotina de backup em nuvem</td>
                <td><span className={`${styles.badgePriority} ${styles.medium}`}>Média</span></td>
                <td><span className={`${styles.badgeStatus} ${styles.done}`}>Finalizado</span></td>
                <td>09/10/2026 - 09:00</td>
                <td>
                  <button 
                    className={styles.actionBtn} 
                    onClick={() => navigate('/DetalhesChamado', { state: { protocolo: '#KR-7994' } })}
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* PAINEL 3: INVENTÁRIO E SAÚDE DOS COMPUTADORES */}
        <section className={styles.sheetSection}>
          <div className={styles.sheetHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fa-solid fa-microchip"></i> Inventário e Saúde dos Equipamentos
            </h2>
          </div>

          <table className={styles.sheetTable}>
            <thead>
              <tr>
                <th>Nome do Dispositivo</th>
                <th>Sistema Operacional</th>
                <th>Setor / Local</th>
                <th>Uso de Disco</th>
                <th>Diagnóstico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PC-RECEPCAO-01</strong></td>
                <td>Windows 11 Pro</td>
                <td>Recepção</td>
                <td>32% ocupado</td>
                <td><span className={styles.badgeSuccess}>OK (Saudável)</span></td>
              </tr>
              <tr>
                <td><strong>PC-FINANCEIRO-02</strong></td>
                <td>Windows 11 Pro</td>
                <td>Financeiro</td>
                <td>45% ocupado</td>
                <td><span className={styles.badgeSuccess}>OK (Saudável)</span></td>
              </tr>
              <tr>
                <td><strong>SERVIDOR-LOCAL</strong></td>
                <td>Windows Server 2022</td>
                <td>Data Center</td>
                <td><strong>88% ocupado</strong></td>
                <td><span className={styles.badgeDanger}>Atenção: Limpeza Requerida</span></td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>

    </div>
  );
};

export default HomeCliente;