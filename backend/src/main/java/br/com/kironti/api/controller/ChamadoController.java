package br.com.kironti.api.controller;

import br.com.kironti.api.model.Chamado;
import br.com.kironti.api.model.Equipamento;
import br.com.kironti.api.model.Usuario;
import br.com.kironti.api.repository.ChamadoRepository;
import br.com.kironti.api.repository.EquipamentoRepository;
import br.com.kironti.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/chamados")
@CrossOrigin(origins = "*")
public class ChamadoController {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. Listar todos os chamados (Usado pelo Técnico na Fila Geral)
    @GetMapping
    public List<Chamado> listarTodos() {
        return chamadoRepository.findAll();
    }

    // 2. Buscar chamado por ID
    @GetMapping("/{id}")
    public ResponseEntity<Chamado> buscarPorId(@PathVariable Long id) {
        return chamadoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Cadastrar um novo chamado vinculado ao equipamento e ao usuarioId
    @PostMapping
    public ResponseEntity<?> criarChamado(@RequestBody Map<String, Object> payload) {
        try {
            String titulo = (String) payload.get("titulo");
            String descricao = (String) payload.get("descricao");
            String categoria = (String) payload.get("categoria");
            String prioridade = (String) payload.get("prioridade");
            Long equipamentoId = Long.valueOf(payload.get("equipamentoId").toString());

            Equipamento equipamento = equipamentoRepository.findById(equipamentoId).orElse(null);
            if (equipamento == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Equipamento informado não foi encontrado no banco.");
            }

            Chamado novoChamado = new Chamado(titulo, descricao, categoria, prioridade, equipamento);

            // Vincula o chamado ao usuarioId recebido ou herda do equipamento associado
            if (payload.containsKey("usuarioId") && payload.get("usuarioId") != null) {
                novoChamado.setUsuarioId(Long.valueOf(payload.get("usuarioId").toString()));
            } else if (equipamento.getUsuarioId() != null) {
                novoChamado.setUsuarioId(equipamento.getUsuarioId());
            }

            Chamado salvo = chamadoRepository.save(novoChamado);

            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao processar criação de chamado: " + e.getMessage());
        }
    }

    // 4. Atualizar Status, Prioridade e Parecer Técnico
    @PutMapping("/{id}/parecer")
    public ResponseEntity<?> atualizarParecer(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        return chamadoRepository.findById(id).map(chamado -> {
            if (body.containsKey("status")) {
                chamado.setStatus(body.get("status"));
            }
            if (body.containsKey("parecerTecnico")) {
                chamado.setParecerTecnico(body.get("parecerTecnico"));
            }
            if (body.containsKey("prioridade")) {
                chamado.setPrioridade(body.get("prioridade"));
            }
            Chamado atualizado = chamadoRepository.save(chamado);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }
    // 5. Listar chamados por status (Ex: /api/chamados/status/Aberto)
    @GetMapping("/status/{status}")
    public List<Chamado> listarPorStatus(@PathVariable String status) {
        return chamadoRepository.findByStatus(status);
    }

    // 6. Atualizar Status e Assumir Chamado (Fila do Técnico)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return chamadoRepository.findById(id).map(chamado -> {

            if (payload.containsKey("status")) {
                chamado.setStatus(payload.get("status"));
            }

            if (payload.containsKey("tecnicoId")) {
                chamado.setTecnicoId(Long.parseLong(payload.get("tecnicoId")));
            }

            chamadoRepository.save(chamado);
            return ResponseEntity.ok("Status do chamado atualizado com sucesso!");

        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado não encontrado."));
    }

    // 7. Listar chamados pertencentes ao mesmo CNPJ da empresa do usuário
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Chamado>> listarPorUsuario(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

        if (usuarioOpt.isPresent() && usuarioOpt.get().getCnpj() != null && !usuarioOpt.get().getCnpj().isBlank()) {
            String cnpj = usuarioOpt.get().getCnpj();

            List<Long> idsDaEmpresa = usuarioRepository.findAllByCnpj(cnpj)
                    .stream()
                    .map(Usuario::getId)
                    .toList();

            List<Chamado> chamados = chamadoRepository.findByUsuarioIdIn(idsDaEmpresa);
            return ResponseEntity.ok(chamados);
        }

        List<Chamado> chamados = chamadoRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(chamados);
    }
}