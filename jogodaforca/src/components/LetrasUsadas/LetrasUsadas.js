import styles from './LetrasUsadas.module.css';

export default function LetrasUsadas({ letrasCorretas, letrasErradas }) {

  const temLetrasCorretas = letrasCorretas.length > 0;
  const temLetrasErradas = letrasErradas.length > 0;
  
  if (!temLetrasCorretas && !temLetrasErradas) {
    return null;
  }

  return (
    <div className={styles.container}>
 
      {temLetrasCorretas && (
        <div className={styles.secao}>
          <h3>Letras corretas</h3>
          <div className={styles.letras}>
            {letrasCorretas.map((letra, index) => (
              <span key={index} className={styles.letraCorreta}>
                {letra}
              </span>
            ))}
          </div>
        </div>
      )}
      
  
      {temLetrasErradas && (
        <div className={styles.secao}>
          <h3>Letras incorretas</h3>
          <div className={styles.letras}>
            {letrasErradas.map((letra, index) => (
              <span key={index} className={styles.letraErrada}>
                {letra}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
