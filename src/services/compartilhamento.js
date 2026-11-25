// Recursos do navegador: área de transferência e Web Share API.

export async function copiar(texto) {
  await navigator.clipboard.writeText(texto);
}

/** Retorna 'compartilhado' (menu nativo) ou 'copiado' (fallback). */
export async function compartilhar(texto) {
  if (navigator.share) {
    await navigator.share({ title: 'Meu resultado — CalculaNota', text: texto });
    return 'compartilhado';
  }
  await navigator.clipboard.writeText(texto);
  return 'copiado';
}
