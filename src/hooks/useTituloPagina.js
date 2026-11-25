import { useEffect } from 'react';

// Efeito: sincroniza o <title> do documento com a página atual.
export default function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}
