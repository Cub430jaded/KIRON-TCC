package br.com.kironti.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table (name= "tb_chamado")
public class Chamado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false, length = 50)
    private String categoria; // Hardware, Software, Rede, Impressora

    @Column(nullable = false, length = 20)
    private String prioridade; // Baixa, Média, Alta

    @Column(nullable = false, length = 20)
    private String status; // Aberto, Em Andamento, Concluído

    @Column(name = "parecer_tecnico", columnDefinition = "TEXT")
    private String parecerTecnico;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    // Relacionamento: Vários chamados podem pertencer a um mesmo Equipamento
    @ManyToOne
    @JoinColumn(name = "equipamento_id", nullable = false)
    private Equipamento equipamento;

    public Chamado(){
        this.dataCriacao = LocalDateTime.now();
        this.status = "Aberto";

    }
    public Chamado
            (
                    String titulo,
                    String descricao,
                    String categoria,
                    String prioridade,
                    Equipamento equipamento
            )
    {
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.prioridade = prioridade;
        this.equipamento = equipamento;
        this.status = "Aberto";
        this.dataCriacao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getParecerTecnico() {
        return parecerTecnico;
    }

    public void setParecerTecnico(String parecerTecnico) {
        this.parecerTecnico = parecerTecnico;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Equipamento getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
    }
}
