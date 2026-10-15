package br.com.kironti.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_equipamento")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 50)
    private String tipo;

    @Column(name = "sistema_operacional", length = 50)
    private String sistemaOperacional;

    @Column(nullable = false, length = 20)
    private String statusSaude;

    @Column(name = "usuario_id")
    private Long usuarioId;

    // Construtor padrão exigido pelo JPA
    public Equipamento() {
    }

    // Construtor completo
    public Equipamento
    (
            String nome,
            String tipo,
            String sistemaOperacional,
            String statusSaude

    )
    {
        this.nome = nome;
        this.tipo = tipo;
        this.sistemaOperacional = sistemaOperacional;
        this.statusSaude = statusSaude;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getSistemaOperacional() {
        return sistemaOperacional;
    }

    public void setSistemaOperacional(String sistemaOperacional) {
        this.sistemaOperacional = sistemaOperacional;
    }

    public String getStatusSaude() {
        return statusSaude;
    }

    public void setStatusSaude(String statusSaude) {
        this.statusSaude = statusSaude;
    }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}