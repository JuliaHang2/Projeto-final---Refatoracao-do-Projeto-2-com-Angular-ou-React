import { useEffect, useRef } from 'react';

const PLACEHOLDER_NOME = ['Ex.: Prova 1', 'Ex.: Prova 2'];

export default function LinhaNota({ avaliacao, indice, foco, onChange, onRemover, onFocado }) {
  const refs = { nome: useRef(null), nota: useRef(null), peso: useRef(null) };

  // Efeito: quando o pai pede foco para esta linha, aplica no input certo e avisa.
  useEffect(() => {
    if (foco) {
      refs[foco]?.current?.focus();
      onFocado();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foco]);

  const { id, nome, nota, peso } = avaliacao;
  const ehExemplo = indice < 2;

  return (
    <div className="linha-nota">
      <input
        ref={refs.nome}
        className="nome"
        type="text"
        placeholder={PLACEHOLDER_NOME[indice] ?? 'Nome da avaliação'}
        aria-label="Nome da avaliação"
        maxLength={35}
        value={nome}
        onChange={(e) => onChange(id, 'nome', e.target.value)}
      />
      <input
        ref={refs.nota}
        className="nota"
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder={ehExemplo ? 'Deixe vazio se for fazer' : '0,0'}
        aria-label="Nota (deixe vazio se ainda não fez)"
        value={nota}
        onChange={(e) => onChange(id, 'nota', e.target.value)}
      />
      <input
        ref={refs.peso}
        className="peso"
        type="number"
        min="0.1"
        max="100"
        step="0.1"
        aria-label="Peso"
        required
        value={peso}
        onChange={(e) => onChange(id, 'peso', e.target.value)}
      />
      <button
        className="remover"
        type="button"
        aria-label="Remover avaliação"
        title="Remover"
        onClick={() => onRemover(id)}
      >
        ×
      </button>
    </div>
  );
}
