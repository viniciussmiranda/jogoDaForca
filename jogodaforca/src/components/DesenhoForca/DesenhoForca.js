import styles from './DesenhoForca.module.css';

// Componente puro que recebe props e renderiza UI
export default function DesenhoForca({ quantidadeErros }) {
  // Array de elementos SVG para cada parte do boneco
  const partesDoCorpo = [
    { key: 'cabeca', elemento: <circle cx="50" cy="25" r="8" stroke="#85afaf" strokeWidth="2" fill="none" /> },
    { key: 'corpo', elemento: <line x1="50" y1="33" x2="50" y2="65" stroke="#85afaf" strokeWidth="2" /> },
    { key: 'bracoEsquerdo', elemento: <line x1="50" y1="43" x2="38" y2="53" stroke="#85afaf" strokeWidth="2" /> },
    { key: 'bracoDireito', elemento: <line x1="50" y1="43" x2="62" y2="53" stroke="#85afaf" strokeWidth="2" /> },
    { key: 'pernaEsquerda', elemento: <line x1="50" y1="65" x2="38" y2="78" stroke="#85afaf" strokeWidth="2" /> },
    { key: 'pernaDireita', elemento: <line x1="50" y1="65" x2="62" y2="78" stroke="#85afaf" strokeWidth="2" /> },
  ];

  // Renderizar apenas as partes necessárias baseado no número de erros
  const partesParaMostrar = partesDoCorpo.slice(0, quantidadeErros);

  return (
    <div className={styles.container}>
      <div className={styles.forca}>
        <svg width="100" height="100">
          {/* Estrutura da forca (sempre visível) */}
          <line x1="15" y1="90" x2="60" y2="90" stroke="#666" strokeWidth="3" />
          <line x1="25" y1="90" x2="25" y2="15" stroke="#666" strokeWidth="3" />
          <line x1="25" y1="15" x2="50" y2="15" stroke="#666" strokeWidth="3" />
          <line x1="50" y1="15" x2="50" y2="17" stroke="#666" strokeWidth="3" />
          
          {/* Renderização condicional das partes do boneco */}
          {partesParaMostrar.map(({ key, elemento }) => (
            <g key={key}>{elemento}</g>
          ))}
        </svg>
      </div>
    </div>
  );
}