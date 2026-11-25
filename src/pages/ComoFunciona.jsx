import { Link } from 'react-router-dom';
import useTituloPagina from '../hooks/useTituloPagina';
import Ajuda from '../components/Ajuda';

export default function ComoFunciona() {
  useTituloPagina('Como funciona — CalculaNota');
  return (
    <>
      <Ajuda />
      <Link className="link-ajuda" to="/">
        ← Voltar para a calculadora
      </Link>
    </>
  );
}
