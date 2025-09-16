import styles from './PalavraDisplay.module.css';

export default function PalavraDisplay({ palavra, letrasCorretas, tentativasRestantes }) {
  // Transformar palavra em array e mapear cada letra
  const letrasParaExibir = palavra.split('').map(letra => {
    // Se a letra foi adivinhada, mostrar ela, senão mostrar _
    return letrasCorretas.includes(letra) ? letra : '_';
  });

  // Juntar as letras com espaço
  const palavraExibida = letrasParaExibir.join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.palavra}>
        {palavraExibida}
      </div>
      <p className={styles.tentativas}>
        Tentativas restantes: <span>{tentativasRestantes}</span>
      </p>
    </div>
  );
}