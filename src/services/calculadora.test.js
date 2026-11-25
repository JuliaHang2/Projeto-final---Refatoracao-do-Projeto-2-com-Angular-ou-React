import { describe, it, expect } from 'vitest';
import { calcular, formatarNumero } from './calculadora';

const av = (nome, nota, peso = '1', id = nome) => ({ id, nome, nota, peso });

describe('calcular', () => {
  it('calcula a média ponderada das notas preenchidas', () => {
    const r = calcular([av('P1', '8', '1'), av('P2', '6', '3')], '6');
    expect(r.ok).toBe(true);
    expect(r.resultado.media).toBeCloseTo(6.5);
    expect(r.resultado.atingiu).toBe(true);
  });

  it('informa quanto falta tirar usando o peso da avaliação em branco', () => {
    const r = calcular([av('P1', '4', '1'), av('P2', '', '1')], '6');
    expect(r.ok).toBe(true);
    expect(r.resultado.atingiu).toBe(false);
    expect(r.resultado.texto).toContain('8,00');
  });

  it('avisa quando a nota necessária passa de 10', () => {
    const r = calcular([av('P1', '1', '1'), av('P2', '', '1')], '9');
    expect(r.resultado.texto).toContain('máxima é 10');
  });

  it('rejeita mais de uma nota em branco', () => {
    const r = calcular([av('P1', '7'), av('P2', ''), av('P3', '')], '6');
    expect(r.ok).toBe(false);
    expect(r.foco).toEqual({ id: 'P3', campo: 'nota' });
  });

  it('rejeita peso vazio ou zero', () => {
    expect(calcular([av('P1', '7', '')], '6').ok).toBe(false);
    expect(calcular([av('P1', '7', '0')], '6').ok).toBe(false);
  });

  it('rejeita nota fora de 0–10 e média desejada inválida', () => {
    expect(calcular([av('P1', '11')], '6').ok).toBe(false);
    expect(calcular([av('P1', '7')], '12').ok).toBe(false);
  });
});

describe('formatarNumero', () => {
  it('usa vírgula decimal', () => {
    expect(formatarNumero(6.5)).toBe('6,50');
  });
});
