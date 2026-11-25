import LinhaNota from './LinhaNota';

export default function FormularioNotas({
  avaliacoes,
  alvo,
  foco,
  onAlvoChange,
  onChange,
  onAdicionar,
  onRemover,
  onCalcular,
  onFocado,
}) {
  function aoEnviar(evento) {
    evento.preventDefault();
    onCalcular();
  }

  return (
    <form onSubmit={aoEnviar}>
      <div className="campos-titulo">
        <span>Avaliação</span>
        <span>Nota (0–10)</span>
        <span>Peso</span>
        <span></span>
      </div>

      <div>
        {avaliacoes.map((avaliacao, indice) => (
          <LinhaNota
            key={avaliacao.id}
            avaliacao={avaliacao}
            indice={indice}
            foco={foco?.id === avaliacao.id ? foco.campo : null}
            onChange={onChange}
            onRemover={onRemover}
            onFocado={onFocado}
          />
        ))}
      </div>

      <button className="adicionar" type="button" onClick={onAdicionar}>
        ＋ Adicionar avaliação
      </button>

      <div className="meta">
        <label htmlFor="media-alvo">Média desejada</label>
        <input
          id="media-alvo"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={alvo}
          onChange={(e) => onAlvoChange(e.target.value)}
        />
      </div>
      <button className="calcular" type="submit">
        Calcular minha média <span>→</span>
      </button>
    </form>
  );
}
