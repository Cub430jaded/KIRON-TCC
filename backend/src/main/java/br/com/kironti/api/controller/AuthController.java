package br.com.kironti.api.controller;

import br.com.kironti.api.model.Usuario;
import br.com.kironti.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {

        // CORREÇÃO: Agora o sistema bloqueia apenas se o E-MAIL já existir
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro: O E-mail informado já está cadastrado no sistema.");
        }

        if (usuario.getPerfil() == null || usuario.getPerfil().trim().isEmpty()) {
            usuario.setPerfil("CLIENTE");
        }

        Usuario novoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String identificacao = credenciais.get("login");
        String senha = credenciais.get("senha");

        if (identificacao == null || senha == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Login e senha são obrigatórios.");
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmailOrCnpj(identificacao, identificacao);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário não encontrado.");
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getSenha().equals(senha)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Senha incorreta.");
        }

        return ResponseEntity.ok(usuario);
    }
    @PutMapping("/alterar-senha")
    public ResponseEntity<?> alterarSenha(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senhaAtual = dados.get("senhaAtual");
        String novaSenha = dados.get("novaSenha");

        if (email == null || senhaAtual == null || novaSenha == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("E-mail, senha atual e nova senha são obrigatórios.");
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado.");
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getSenha().equals(senhaAtual)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("A senha atual informada está incorreta.");
        }

        usuario.setSenha(novaSenha);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Senha alterada com sucesso!");
    }
}