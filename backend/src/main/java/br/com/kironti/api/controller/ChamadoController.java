package br.com.kironti.api.controller;

import br.com.kironti.api.model.Chamado;
import br.com.kironti.api.model.Equipamento;
import br.com.kironti.api.repository.ChamadoRepository;
import br.com.kironti.api.repository.EquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chamados")
@CrossOrigin(origins = "*")
public class ChamadoController {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    // 1. Listar todos os chamados
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

    // 3. Cadastrar um novo chamado vinculado a um equipamento
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
            Chamado salvo = chamadoRepository.save(novoChamado);

            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao processar criação de chamado: " + e.getMessage());
        }
    }

    // 4. Atualizar Status e Parecer Técnico (Ação do Gestor/Técnico)
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
            Chamado atualizado = chamadoRepository.save(chamado);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 5. Listar chamados por status (Ex: /api/chamados/status/Aberto)
    @GetMapping("/status/{status}")
    public List<Chamado> listarPorStatus(@PathVariable String status) {
        return chamadoRepository.findByStatus(status);
    }
}