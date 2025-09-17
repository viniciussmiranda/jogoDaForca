'use client'

import { useState } from 'react'
import DesenhoForca from '@/components/DesenhoForca/DesenhoForca'
import PalavraDisplay from '@/components/PalavraDisplay/PalavraDisplay'
import EntradaLetra from '@/components/EntradaLetra/EntradaLetra'
import StatusJogo from '@/components/StatusJogo/StatusJogo'
import LetrasUsadas from '@/components/LetrasUsadas/LetrasUsadas'
import styles from '@/styles/JogoDaForca.module.css'

const PALAVRAS = [
  'PANELA', 'FOGAO', 'GELADEIRA', 'MICROONDAS', 'LIQUIDIFICADOR', 'BATEDEIRA',
  'FACA', 'TABUA', 'COLHER', 'GARFO', 'PRATO', 'TIGELA', 'XICARA', 'COPO',
  'CHALEIRA', 'CAFETEIRA', 'TORRADEIRA', 'FORNO', 'COOKTOP', 'EXAUSTOR',
  'PIA', 'TORNEIRA', 'ESCORREDOR', 'PENEIRA', 'RALADOR', 'DESCASCADOR',
  'ABRIDOR', 'ESPREMEDOR', 'FORMA', 'ASSADEIRA', 'FRIGIDEIRA', 'CALDEIRAO',
  'CONCHA', 'ESPATULA', 'PEGADOR', 'AVENTAL'
];


function obterPalavraAleatoria() {
  const indice = Math.floor(Math.random() * PALAVRAS.length);
  return PALAVRAS[indice];
}


function verificarVitoria(palavra, letrasCorretas) {
  const letrasUnicasDaPalavra = [...new Set(palavra.split(''))];
  return letrasUnicasDaPalavra.every(letra => letrasCorretas.includes(letra));
}

export default function JogoDaForca() {
  
  const [palavraAtual, setPalavraAtual] = useState(() => obterPalavraAleatoria());
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  
  
  const MAX_ERROS = 6;
  const tentativasRestantes = MAX_ERROS - letrasErradas.length;
  const jogoGanho = verificarVitoria(palavraAtual, letrasCorretas);
  const jogoPerdido = letrasErradas.length >= MAX_ERROS;
  const statusJogo = jogoGanho ? 'ganhou' : jogoPerdido ? 'perdeu' : 'jogando';
  const todasLetrasUsadas = [...letrasCorretas, ...letrasErradas];

  
  function handleTentativaLetra(letra) {
    
    if (todasLetrasUsadas.includes(letra)) {
      alert('Você já tentou esta letra!');
      return;
    }

 
    if (palavraAtual.includes(letra)) {
      setLetrasCorretas(letrasAnteriores => [...letrasAnteriores, letra]);
    } else {
      setLetrasErradas(letrasAnteriores => [...letrasAnteriores, letra]);
    }
  }

  function handleNovoJogo() {
   
    setPalavraAtual(obterPalavraAleatoria());
    setLetrasCorretas([]);
    setLetrasErradas([]);
  }

  
  return (
    <div className={styles.container}>
      <div className={styles.jogo}>
        
        <header className={styles.titulo}>
          <h1>Jogo da Forca</h1>
          <div className={styles.linha}></div>
        </header>

        
        <DesenhoForca quantidadeErros={letrasErradas.length} />

        
        <PalavraDisplay 
          palavra={palavraAtual} 
          letrasCorretas={letrasCorretas}
          tentativasRestantes={tentativasRestantes}
        />

        
        {statusJogo === 'jogando' && (
          <EntradaLetra 
            onTentativa={handleTentativaLetra}
            letrasUsadas={todasLetrasUsadas}
          />
        )}

        
        <StatusJogo 
          status={statusJogo}
          palavra={palavraAtual}
          onNovoJogo={handleNovoJogo}
        />

        
        <LetrasUsadas 
          letrasCorretas={letrasCorretas}
          letrasErradas={letrasErradas}
        />

       
        <footer className={styles.dica}>
          <p>Palavras relacionadas ao que se tem na cozinha</p>
        </footer>
      </div>
    </div>
  );
}