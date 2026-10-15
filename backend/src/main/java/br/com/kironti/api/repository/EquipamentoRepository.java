package br.com.kironti.api.repository;

import br.com.kironti.api.model.Equipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {

    List<Equipamento> findByUsuarioId(Long usuarioId);

    // Busca equipamentos de todos os colaboradores do mesmo CNPJ
    List<Equipamento> findByUsuarioIdIn(List<Long> usuarioIds);
}