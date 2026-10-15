

CREATE DATABASE IF NOT EXISTS `kiron_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kiron_db`;

-- Desabilita checagem de chaves estrangeiras para remoção segura de tabelas antigas
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `tb_chamado`;
DROP TABLE IF EXISTS `tb_equipamento`;
DROP TABLE IF EXISTS `tb_usuario`;
SET FOREIGN_KEY_CHECKS = 1;

/*------------------------------------------------------------
    1. TABELA DE USUÁRIOS
--------------------------------------------------------------*/
CREATE TABLE `tb_usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(14) DEFAULT NULL,
  `cargo` VARCHAR(50) DEFAULT NULL,
  `setor` VARCHAR(50) DEFAULT NULL,
  `perfil` VARCHAR(20) NOT NULL,
  `cnpj` VARCHAR(20) DEFAULT NULL,
  `telefone` VARCHAR(20) DEFAULT NULL,
  `empresa` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*------------------------------------------------------------
    2. TABELA DE EQUIPAMENTOS
--------------------------------------------------------------*/
CREATE TABLE `tb_equipamento` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `sistema_operacional` VARCHAR(50) DEFAULT NULL,
  `status_saude` VARCHAR(20) NOT NULL,
  `usuario_id` BIGINT DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_equipamento_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `tb_usuario` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*------------------------------------------------------------
    3. TABELA DE CHAMADOS
--------------------------------------------------------------*/
CREATE TABLE `tb_chamado` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(150) NOT NULL,
  `descricao` TEXT NOT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  `prioridade` VARCHAR(20) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `parecer_tecnico` TEXT DEFAULT NULL,
  `data_criacao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `tecnico_id` BIGINT DEFAULT NULL,
  `usuario_id` BIGINT DEFAULT NULL,
  `equipamento_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chamado_equipamento` FOREIGN KEY (`equipamento_id`) REFERENCES `tb_equipamento` (`id`),
  CONSTRAINT `fk_chamado_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `tb_usuario` (`id`),
  CONSTRAINT `fk_chamado_tecnico` FOREIGN KEY (`tecnico_id`) REFERENCES `tb_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*============================================================
    POVOAMENTO DE DADOS INICIAIS (INSERTS DE TESTE)
===============================================================*/

-- 1. Inserindo Usuários de Teste (Gestor, Funcionário e Técnico)
INSERT INTO `tb_usuario` (`id`, `nome`, `email`, `senha`, `cpf`, `cargo`, `setor`, `perfil`, `cnpj`, `telefone`, `empresa`) VALUES
(1, 
'Carlos Oliveira', 
'gestor@techsolutions.com', 
'123456', '123.456.789-00', 
'Gestor de TI', 'Diretoria', 
'GESTOR', 
'12.345.678/0001-90', 
'(11) 98765-4321', 
'TechSolutions Ltda'),
(2, 
'Ana Souza', 
'ana@techsolutions.com', 
'123456', '987.654.321-11', 
'Analista Financeiro', 
'Financeiro', 
'CLIENTE', 
'12.345.678/0001-90',
 '(11) 97654-3210', 
 'TechSolutions Ltda'),
(3, 
'Felipe Silva', 
'tecnico@kironti.com', 
'123456', '456.789.012-22', 
'Técnico de Suporte N2', 
'Suporte Técnico', 
'TECNICO',
NULL, 
'(11) 91234-5678',
'Kiron TI');

-- 2. Inserindo Equipamentos vinculados ao Gestor/Empresa (ID 1)
INSERT INTO `tb_equipamento` (`id`, `nome`, `tipo`, `sistema_operacional`, `status_saude`, `usuario_id`) VALUES
(1, 'PC Recepção 01', 'Desktop', 'Windows 11 Pro', 'Verde', 1),
(2, 'Notebook Financeiro - Ana', 'Notebook', 'Windows 10 Pro', 'Amarelo', 1),
(3, 'Servidor de Arquivos', 'Servidor', 'Ubuntu Server 22.04', 'Verde', 1);

-- 3. Inserindo Chamados de Exemplo (Fila Geral, Em Andamento e Concluído)
INSERT INTO `tb_chamado` (`id`, `titulo`, `descricao`, `categoria`, `prioridade`, `status`, `parecer_tecnico`, `data_criacao`, `tecnico_id`, `usuario_id`, `equipamento_id`) VALUES
-- Chamado 1: Fila Geral (Aberto)
(1, 'Monitor piscando sem sinal de vídeo', 'O monitor do PC da recepção fica piscando intermittentemente durante o uso.', 'Hardware', 'Média', 'Aberto', NULL, NOW(), NULL, 1, 1),

-- Chamado 2: Em Andamento com o Técnico (ID 3)
(2, 'Lentidão ao abrir planilha financeira', 'O notebook está travando constantemente ao executar o sistema de gestão.', 'Software', 'Alta', 'Em Andamento', 'Em análise. Realizando limpeza de cache e verificando consumo de memória RAM.', NOW(), 3, 2, 2),

-- Chamado 3: Concluído / Histórico
(3, 'Impressora de rede inacessível', 'A impressora do setor não responde aos comandos de impressão da rede.', 'Rede', 'Baixa', 'Concluído', 'Identificado conflito de IP na rede local. Reconfigurado IP estático no painel da impressora e os testes foram concluídos com sucesso.', DATE_SUB(NOW(), INTERVAL 2 DAY), 3, 1, 3);