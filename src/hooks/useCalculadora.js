import { useCallback, useEffect, useState } from 'react';
import { calcular } from '../services/calculadora';
import { carregarUltimo, salvarUltimo } from '../services/armazenamento';

let contador = 0;
const novoId = () => `av-${Date.now()}-${contador++}`;
const novaAvaliacao = (nome = '', nota = '', peso = '1') => ({
  id: novoId(),
  nome,
  nota,
  peso,
});

// Inicialização (roda uma única vez): recupera o último cálculo salvo no navegador.
function estadoInicial() {
  const salvo = carregarUltimo();
  if (salvo) {
    return {
      alvo: salvo.alvo,
      avaliacoes: salvo.avaliacoes.map((a) => novaAvaliacao(a.nome, a.nota, a.peso)),
    };
  }
  return { alvo: '6', avaliacoes: [novaAvaliacao(), novaAvaliacao()] };
}

export default function useCalculadora() {
  const [inicial] = useState(estadoInicial);
  const [avaliacoes, setAvaliacoes] = useState(inicial.avaliacoes);
  const [alvo, setAlvo] = useState(inicial.alvo);
  const [resultado, setResultado] = useState(null);
  const [aviso, setAviso] = useState('');
  const [foco, setFoco] = useState(null); // { id, campo } do input que deve receber foco

  // Efeito: sempre que um novo resultado é calculado, salva no localStorage.
  useEffect(() => {
    if (resultado) {
      salvarUltimo({
        media: resultado.media,
        alvo: resultado.alvo,
        texto: resultado.texto,
        avaliacoes: resultado.entrada.avaliacoes,
      });
    }
  }, [resultado]);

  const atualizar = useCallback((id, campo, valor) => {
    setAvaliacoes((lista) =>
      lista.map((a) => (a.id === id ? { ...a, [campo]: valor } : a))
    );
  }, []);

  const adicionar = useCallback(() => {
    const nova = novaAvaliacao();
    setAvaliacoes((lista) => [...lista, nova]);
    setFoco({ id: nova.id, campo: 'nome' });
  }, []);

  const remover = useCallback(
    (id) => {
      if (avaliacoes.length === 1) {
        setAviso('Mantenha pelo menos uma avaliação.');
        return;
      }
      setAvaliacoes((lista) => lista.filter((a) => a.id !== id));
      setAviso('');
    },
    [avaliacoes.length]
  );

  const calcularMedia = useCallback(() => {
    setAviso('');
    const r = calcular(avaliacoes, alvo);
    if (!r.ok) {
      setAviso(r.erro);
      if (r.foco) setFoco(r.foco);
      return;
    }
    setResultado({ ...r.resultado, entrada: { avaliacoes, alvo } });
  }, [avaliacoes, alvo]);

  const limparFoco = useCallback(() => setFoco(null), []);

  return {
    avaliacoes,
    alvo,
    resultado,
    aviso,
    foco,
    setAlvo,
    setAviso,
    atualizar,
    adicionar,
    remover,
    calcularMedia,
    limparFoco,
  };
}
