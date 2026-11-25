import { Link } from 'react-router-dom';
import useTituloPagina from '../hooks/useTituloPagina';

export default function NaoEncontrada() {
  useTituloPagina('Página não encontrada — CalculaNota');
  return (
    <section className="pagina-simples">
      <h1>Página não encontrada</h1>
      <p>O endereço que você abriu não existe no CalculaNota.</p>
      <Link className="link-ajuda" to="/">Ir para a calculadora</Link>
    </section>
  );
}
