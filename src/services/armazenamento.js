// Persistência do último cálculo no localStorage.
// Mantém a mesma chave e o mesmo formato da versão em JavaScript puro,
// então quem já tinha dados salvos continua vendo o último resultado.

const CHAVE = 'calculanota-ultimo-resultado';

export function carregarUltimo() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const dados = JSON.parse(bruto);
    if (!Array.isArray(dados.avaliacoes) || dados.avaliacoes.length === 0) return null;
    return {
      alvo: typeof dados.alvo === 'number' ? String(dados.alvo) : '6',
      avaliacoes: dados.avaliacoes.map((a) => ({
        nome: typeof a.nome === 'string' ? a.nome : '',
        nota: a.nota === null || a.nota === undefined ? '' : String(a.nota),
        peso: a.peso === null || a.peso === undefined ? '1' : String(a.peso),
      })),
    };
  } catch {
    try { localStorage.removeItem(CHAVE); } catch { /* sem acesso ao storage */ }
    return null;
  }
}

export function salvarUltimo({ media, alvo, texto, avaliacoes }) {
  try {
    localStorage.setItem(
      CHAVE,
      JSON.stringify({
        media,
        alvo,
        texto,
        avaliacoes: avaliacoes.map(({ nome, nota, peso }) => ({
          nome,
          nota: nota === '' ? null : Number(nota),
          peso: Number(peso),
        })),
      })
    );
  } catch {
    // modo privado ou storage cheio: o app segue funcionando sem persistir
  }
}
