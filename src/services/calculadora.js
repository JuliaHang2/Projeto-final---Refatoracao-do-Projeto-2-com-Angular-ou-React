// Regras de negócio da calculadora. Funções puras: não tocam no DOM nem no React.

export function formatarNumero(valor, casas = 2) {
  return valor.toFixed(casas).replace('.', ',');
}

function falha(erro, foco = null) {
  return { ok: false, erro, foco };
}

/**
 * @param {{id: string, nome: string, nota: string, peso: string}[]} avaliacoes
 *        valores exatamente como estão nos inputs (strings)
 * @param {string} alvoTexto média desejada, como string
 */
export function calcular(avaliacoes, alvoTexto) {
  const itens = avaliacoes.map((a, indice) => ({
    id: a.id,
    nome: a.nome.trim() || `Avaliação ${indice + 1}`,
    nota: a.nota === '' ? null : Number(a.nota),
    peso: Number(a.peso),
    pesoVazio: a.peso === '',
  }));

  const alvo = Number(alvoTexto);
  const futuras = itens.filter((a) => a.nota === null);
  const realizadas = itens.filter((a) => a.nota !== null);

  const pesoInvalido = itens.find(
    (a) => a.pesoVazio || !Number.isFinite(a.peso) || a.peso <= 0
  );
  const notaInvalida = realizadas.find(
    (a) => !Number.isFinite(a.nota) || a.nota < 0 || a.nota > 10
  );

  if (pesoInvalido) {
    return falha('Informe um peso válido e maior que zero para cada avaliação.', {
      id: pesoInvalido.id,
      campo: 'peso',
    });
  }
  if (notaInvalida) {
    return falha('As notas preenchidas devem estar entre 0 e 10.', {
      id: notaInvalida.id,
      campo: 'nota',
    });
  }
  if (realizadas.length === 0) {
    return falha('Preencha pelo menos uma nota de uma avaliação que você já fez.', {
      id: itens[0].id,
      campo: 'nota',
    });
  }
  if (futuras.length > 1) {
    return falha(
      'Deixe apenas uma nota em branco: ela será considerada sua próxima avaliação.',
      { id: futuras[1].id, campo: 'nota' }
    );
  }
  if (alvoTexto === '' || !Number.isFinite(alvo) || alvo < 0 || alvo > 10) {
    return falha('A média desejada deve estar entre 0 e 10.');
  }

  const somaPesos = realizadas.reduce((soma, a) => soma + a.peso, 0);
  const somaPonderada = realizadas.reduce((soma, a) => soma + a.nota * a.peso, 0);
  const media = somaPonderada / somaPesos;

  // Usa o peso da linha sem nota; se todas estiverem preenchidas, considera peso 1.
  const pesoProxima = futuras.length === 1 ? futuras[0].peso : 1;
  const notaNecessaria = alvo * (somaPesos + pesoProxima) - somaPonderada;
  const atingiu = media >= alvo;

  const alvoFormatado = formatarNumero(alvo, 1);
  let texto;
  if (atingiu) {
    texto = `Sua média atual já está acima da meta de ${alvoFormatado}.`;
  } else if (notaNecessaria <= 10) {
    texto =
      `Para alcançar média ${alvoFormatado}, você precisa tirar ` +
      `${formatarNumero(Math.max(0, notaNecessaria))} na próxima avaliação ` +
      `(peso ${String(pesoProxima).replace('.', ',')}).`;
  } else {
    texto =
      `Você precisaria tirar ${formatarNumero(notaNecessaria)} na próxima avaliação, ` +
      `mas a nota máxima é 10. Será necessário mais de uma avaliação para alcançar essa meta.`;
  }

  return {
    ok: true,
    resultado: {
      media,
      mediaFormatada: formatarNumero(media),
      alvo,
      atingiu,
      percentual: Math.min((media / 10) * 100, 100),
      texto,
    },
  };
}

export function montarTextoCompartilhamento(resultado) {
  return `CalculaNota\nMédia atual: ${resultado.mediaFormatada}\n${resultado.texto}`;
}
