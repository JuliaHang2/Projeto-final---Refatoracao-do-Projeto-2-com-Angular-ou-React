import { useEffect, useState } from 'react';
import { montarTextoCompartilhamento } from '../services/calculadora';
import { compartilhar, copiar } from '../services/compartilhamento';

export default function Resultado({ resultado, onErro }) {
  const [feedback, setFeedback] = useState(null); // null | 'copiar' | 'compartilhar'

  // Efeito com limpeza: volta o rótulo do botão depois de 2,5 s.
  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(null), 2500);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function aoCopiar() {
    try {
      await copiar(montarTextoCompartilhamento(resultado));
      setFeedback('copiar');
    } catch {
      onErro('Não foi possível copiar. Verifique a permissão do navegador.');
    }
  }

  async function aoCompartilhar() {
    try {
      const via = await compartilhar(montarTextoCompartilhamento(resultado));
      if (via === 'copiado') setFeedback('compartilhar');
    } catch (erro) {
      if (erro.name === 'AbortError') return;
      onErro(
        navigator.share
          ? 'Não foi possível compartilhar.'
          : 'Seu navegador não oferece compartilhamento ou cópia neste contexto.'
      );
    }
  }

  return (
    <section className="resultado" aria-live="polite" hidden={!resultado}>
      {resultado && (
        <>
          <div className="resultado-cabecalho">
            <div>
              <span className="resultado-label">SUA MÉDIA ATUAL</span>
              <strong>{resultado.mediaFormatada}</strong>
            </div>
            <span className={`status${resultado.atingiu ? '' : ' atencao'}`}>
              {resultado.atingiu ? 'Meta atingida!' : 'Continue assim!'}
            </span>
          </div>
          <div className="barra">
            <div style={{ width: `${resultado.percentual}%` }} />
          </div>
          <p id="mensagem">{resultado.texto}</p>
          <div className="acoes">
            <button type="button" className="secundario" onClick={aoCopiar}>
              {feedback === 'copiar' ? 'Copiado!' : 'Copiar resultado'}
            </button>
            <button type="button" className="secundario" onClick={aoCompartilhar}>
              {feedback === 'compartilhar' ? 'Resultado copiado' : 'Compartilhar'}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
