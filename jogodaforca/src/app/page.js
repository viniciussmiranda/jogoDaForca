'use client'

import { useState } from 'react'
import DesenhoForca from '@/components/DesenhoForca/DesenhoForca'
import PalavraDisplay from '@/components/PalavraDisplay/PalavraDisplay'
import EntradaLetra from '@/components/EntradaLetra/EntradaLetra'
import StatusJogo from '@/components/StatusJogo/StatusJogo'
import LetrasUsadas from '@/components/LetrasUsadas/LetrasUsadas'
import styles from '@/styles/JogoDaForca.module.css'

// Lista de palavras (dados estáticos como mostrado na documentação)
const PALAVRAS = [
  'REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'PYTHON', 'JAVA', 'NODE', 'EXPRESS',
  'MONGODB', 'FRONTEND', 'BACKEND', 'API', 'JSON', 'AJAX', 'BOOTSTRAP',
  'TAILWIND', 'TYPESCRIPT', 'ANGULAR', 'VUE', 'SVELTE', 'WEBPACK', 'BABEL',
  'ESLINT', 'PRETTIER', 'GIT', 'GITHUB', 'DOCKER', 'AWS', 'AZURE', 'FIREBASE',
  'POSTGRESQL', 'MYSQL', 'REDIS', 'GRAPHQL', 'REST', 'MICROSERVICES'
];

// Função auxiliar para obter palavra aleatória
function obterPalavraAleatoria() {
  const indice = Math.floor(Math.random() * PALAVRAS.length);
  return PALAVRAS[indice];
}

// Função auxiliar para verificar se o jogo foi ganho
function verificarVitoria(palavra, letrasCorretas) {
  const letrasUnicasDaPalavra = [...new Set(palavra.split(''))];
  return letrasUnicasDaPalavra.every(letra => letrasCorretas.includes(letra));
}

export default function JogoDaForca() {
  // State para gerenciar o estado do jogo (Managing State)
  const [palavraAtual, setPalavraAtual] = useState(() => obterPalavraAleatoria());
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  
  // State derivado (calculado a partir de outros states)
  const MAX_ERROS = 6;
  const tentativasRestantes = MAX_ERROS - letrasErradas.length;
  const jogoGanho = verificarVitoria(palavraAtual, letrasCorretas);
  const jogoPerdido = letrasErradas.length >= MAX_ERROS;
  const statusJogo = jogoGanho ? 'ganhou' : jogoPerdido ? 'perdeu' : 'jogando';
  const todasLetrasUsadas = [...letrasCorretas, ...letrasErradas];

  // Event handlers (Adding Interactivity)
  function handleTentativaLetra(letra) {
    // Verificar se a letra já foi usada
    if (todasLetrasUsadas.includes(letra)) {
      alert('Você já tentou esta letra!');
      return;
    }

    // Atualizar state baseado na tentativa
    if (palavraAtual.includes(letra)) {
      setLetrasCorretas(letrasAnteriores => [...letrasAnteriores, letra]);
    } else {
      setLetrasErradas(letrasAnteriores => [...letrasAnteriores, letra]);
    }
  }

  function handleNovoJogo() {
    // Reset de todo o state para iniciar novo jogo
    setPalavraAtual(obterPalavraAleatoria());
    setLetrasCorretas([]);
    setLetrasErradas([]);
  }

  // Renderização condicional (Describing the UI)
  return (
    <div className={styles.container}>
      <div className={styles.jogo}>
        {/* Título */}
        <header className={styles.titulo}>
          <h1>Jogo da Forca</h1>
          <div className={styles.linha}></div>
        </header>

        {/* Desenho da forca */}
        <DesenhoForca quantidadeErros={letrasErradas.length} />

        {/* Display da palavra */}
        <PalavraDisplay 
          palavra={palavraAtual} 
          letrasCorretas={letrasCorretas}
          tentativasRestantes={tentativasRestantes}
        />

        {/* Input de letra (apenas se jogando) */}
        {statusJogo === 'jogando' && (
          <EntradaLetra 
            onTentativa={handleTentativaLetra}
            letrasUsadas={todasLetrasUsadas}
          />
        )}

        {/* Status do jogo */}
        <StatusJogo 
          status={statusJogo}
          palavra={palavraAtual}
          onNovoJogo={handleNovoJogo}
        />

        {/* Letras usadas */}
        <LetrasUsadas 
          letrasCorretas={letrasCorretas}
          letrasErradas={letrasErradas}
        />

        {/* Dica */}
        <footer className={styles.dica}>
          <p>Palavras relacionadas à programação e tecnologia</p>
        </footer>
      </div>
    </div>
  );
}