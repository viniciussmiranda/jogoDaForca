import { useState } from 'react';
import styles from './EntradaLetra.module.css';

export default function EntradaLetra({ onTentativa, letrasUsadas }) {
  // State local para controlar o input
  const [valorInput, setValorInput] = useState('');

  // Função para validar entrada
  function validarLetra(letra) {
    if (!letra) {
      return { valida: false, erro: 'Digite uma letra!' };
    }
    
    if (letra.length !== 1) {
      return { valida: false, erro: 'Digite apenas uma letra!' };
    }
    
    if (!/[A-Z]/.test(letra)) {
      return { valida: false, erro: 'Digite apenas letras!' };
    }
    
    if (letrasUsadas.includes(letra)) {
      return { valida: false, erro: 'Você já tentou esta letra!' };
    }
    
    return { valida: true };
  }

  // Event handler para o botão
  function handleTentativa() {
    const letra = valorInput.toUpperCase().trim();
    const validacao = validarLetra(letra);
    
    if (!validacao.valida) {
      alert(validacao.erro);
      return;
    }

    // Chamar função pai e limpar input
    onTentativa(letra);
    setValorInput('');
  }

  // Event handler para mudança no input
  function handleMudancaInput(event) {
    // Pegar apenas o primeiro caractere e converter para maiúscula
    const novoValor = event.target.value.slice(0, 1).toUpperCase();
    setValorInput(novoValor);
  }

  // Event handler para tecla pressionada
  function handleTecla(event) {
    if (event.key === 'Enter') {
      handleTentativa();
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={valorInput}
        onChange={handleMudancaInput}
        onKeyDown={handleTecla}
        placeholder="Digite uma letra"
        className={styles.input}
        maxLength={1}
      />
      <button
        onClick={handleTentativa}
        className={styles.botao}
      >
        Tentar
      </button>
    </div>
  );
}
