import styles from './StatusJogo.module.css';

export default function StatusJogo({ status, palavra, onNovoJogo }) {
  // Renderização condicional baseada no status
  if (status === 'jogando') {
    return null; // Não renderiza nada se ainda está jogando
  }

  // Determinar mensagem baseada no status
  let titulo, mensagem;
  
  if (status === 'ganhou') {
    titulo = 'Parabéns!';
    mensagem = `Você descobriu a palavra: ${palavra}`;
  } else if (status === 'perdeu') {
    titulo = 'Que pena!';
    mensagem = `A palavra era: ${palavra}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mensagem}>
        <h2>{titulo}</h2>
        <p><strong>{mensagem}</strong></p>
      </div>

      <button
        onClick={onNovoJogo}
        className={styles.botaoNovoJogo}
      >
        Novo Jogo
      </button>
    </div>
  );
}