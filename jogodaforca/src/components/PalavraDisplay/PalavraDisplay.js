import styles from './PalavraDisplay.module.css';

export default function PalavraDisplay({ palavra, letrasCorretas, tentativasRestantes }) {
  
  const letrasParaExibir = palavra.split('').map(letra => {
    
    return letrasCorretas.includes(letra) ? letra : '_';
  });

  
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