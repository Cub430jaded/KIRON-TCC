package br.com.kironti.api.repository;

import br.com.kironti.api.model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

    List<Chamado> findByEquipamentoId(Long equipamentoId);

    List<Chamado> findByStatus(String status);

    List<Chamado> findByUsuarioId(Long usuarioId);

    // Busca chamados de todos os colaboradores do mesmo CNPJ
    List<Chamado> findByUsuarioIdIn(List<Long> usuarioIds);
}