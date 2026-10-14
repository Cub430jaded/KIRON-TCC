package br.com.kironti.api.controller;

import br.com.kironti.api.model.Equipamento;
import br.com.kironti.api.repository.EquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipamentos")
@CrossOrigin(origins = "*")
public class EquipamentoController {
    @Autowired
    private EquipamentoRepository repository;

    @GetMapping
    public List<Equipamento> listarTodos(){
        return  repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Equipamento> cadastrar (@RequestBody Equipamento equipamento)
    {
        Equipamento novoEquipamento = repository.save(equipamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEquipamento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipamento> buscarPorId(@PathVariable Long id)
    {
        return repository.findById(id)
                .map(equipamento -> ResponseEntity.ok().body(equipamento))
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id)
    {
        if(!repository.existsById(id))
        {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
