package br.com.kironti.api.repository;

import br.com.kironti.api.model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

    List<Chamado> findByEquipamento(Long equipamentoId);

    List<Chamado> findByStatus(String status);
}
