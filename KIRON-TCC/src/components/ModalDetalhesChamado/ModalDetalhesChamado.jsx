import styles from './ModalDetalhesChamado.module.css';

// Recebe 3 propriedades: se está aberto, a função para fechar e os dados do chamado
const ModalDetalhesChamado = ({ isOpen, onClose, chamado }) => {
  // Se não estiver aberto ou não tiver chamado selecionado, não renderiza nada
  if (!isOpen || !chamado) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Detalhes do Chamado #{chamado.id}</h2>
          <button className={styles.closeModalBtn} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={styles.modalBody}>
          <p><strong>Equipamento:</strong> {chamado.equipamento}</p>
          <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
          <p><strong>Status:</strong> {chamado.status}</p>
          <div className={styles.descBox}>
            <strong>Descrição relatada:</strong>
            <p>{chamado.descricao}</p>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnPrimary} onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhesChamado;