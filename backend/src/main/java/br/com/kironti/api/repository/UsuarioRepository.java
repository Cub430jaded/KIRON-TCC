package br.com.kironti.api.repository;

import br.com.kironti.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByCnpj(String cnpj);

    boolean existsByCnpj(String cnpj);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByEmailOrCnpj(String email, String cnpj);

    boolean existsByEmail(String email);

    List<Usuario> findAllByCnpj(String cnpj);
}