IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'kiron_db')
BEGIN
    CREATE DATABASE kiron_db;
END;
GO

USE kiron_db;
GO

IF OBJECT_ID('tb_chamado', 'U') IS NOT NULL DROP TABLE tb_chamado;
IF OBJECT_ID('tb_equipamento', 'U') IS NOT NULL DROP TABLE tb_equipamento;
IF OBJECT_ID('tb_usuario', 'U') IS NOT NULL DROP TABLE tb_usuario;
GO

-- 1. Tabela de Usuários
CREATE TABLE tb_usuario (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NULL,
  cargo VARCHAR(50) NULL,
  setor VARCHAR(50) NULL,
  perfil VARCHAR(20) NOT NULL,
  cnpj VARCHAR(20) NULL,
  telefone VARCHAR(20) NULL,
  empresa VARCHAR(255) NULL
);

-- 2. Tabela de Equipamentos
CREATE TABLE tb_equipamento (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  sistema_operacional VARCHAR(50) NULL,
  status_saude VARCHAR(20) NOT NULL,
  usuario_id BIGINT NULL,
  CONSTRAINT fk_equipamento_usuario FOREIGN KEY (usuario_id) REFERENCES tb_usuario (id) ON DELETE SET NULL
);

-- 3. Tabela de Chamados
CREATE TABLE tb_chamado (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao VARCHAR(MAX) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  prioridade VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  parecer_tecnico VARCHAR(MAX) NULL,
  data_criacao DATETIME DEFAULT GETDATE(),
  tecnico_id BIGINT NULL,
  usuario_id BIGINT NULL,
  equipamento_id BIGINT NOT NULL,
  CONSTRAINT fk_chamado_equipamento FOREIGN KEY (equipamento_id) REFERENCES tb_equipamento (id),
  CONSTRAINT fk_chamado_usuario FOREIGN KEY (usuario_id) REFERENCES tb_usuario (id),
  CONSTRAINT fk_chamado_tecnico FOREIGN KEY (tecnico_id) REFERENCES tb_usuario (id)
);

-- Inserts de Teste
INSERT INTO tb_usuario (nome, email, senha, cpf, cargo, setor, perfil, cnpj, telefone, empresa) VALUES
('Carlos Oliveira', 'gestor@techsolutions.com', '123456', '123.456.789-00', 'Gestor de TI', 'Diretoria', 'GESTOR', '12.345.678/0001-90', '(11) 98765-4321', 'TechSolutions Ltda'),
('Ana Souza', 'ana@techsolutions.com', '123456', '987.654.321-11', 'Analista Financeiro', 'Financeiro', 'CLIENTE', '12.345.678/0001-90', '(11) 97654-3210', 'TechSolutions Ltda'),
('Felipe Silva', 'tecnico@kironti.com', '123456', '456.789.012-22', 'Técnico de Suporte N2', 'Suporte Técnico', 'TECNICO', NULL, '(11) 91234-5678', 'Kiron TI');

INSERT INTO tb_equipamento (nome, tipo, sistema_operacional, status_saude, usuario_id) VALUES
('PC Recepção 01', 'Desktop', 'Windows 11 Pro', 'Verde', 1),
('Notebook Financeiro - Ana', 'Notebook', 'Windows 10 Pro', 'Amarelo', 1),
('Servidor de Arquivos', 'Servidor', 'Ubuntu Server 22.04', 'Verde', 1);

INSERT INTO tb_chamado (titulo, descricao, categoria, prioridade, status, parecer_tecnico, data_criacao, tecnico_id, usuario_id, equipamento_id) VALUES
('Monitor piscando sem sinal de vídeo', 'O monitor do PC da recepção fica piscando continuamente.', 'Hardware', 'Média', 'Aberto', NULL, GETDATE(), NULL, 1, 1),
('Lentidão ao abrir planilha financeira', 'O notebook está travando constantemente.', 'Software', 'Alta', 'Em Andamento', 'Em análise técnica.', GETDATE(), 3, 2, 2),
('Impressora de rede inacessível', 'A impressora não responde aos comandos.', 'Rede', 'Baixa', 'Concluído', 'Reconfigurado IP estático com sucesso.', GETDATE(), 3, 1, 3);