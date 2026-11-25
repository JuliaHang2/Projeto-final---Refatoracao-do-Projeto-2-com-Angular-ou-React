import { Link, NavLink } from 'react-router-dom';

const classeLink = ({ isActive }) => (isActive ? 'ativo' : undefined);

export default function Header() {
  return (
    <header className="topo">
      <Link className="marca" to="/" aria-label="CalculaNota, página inicial">
        <span className="marca-icone">✓</span> calcula<span>nota</span>
      </Link>
      <div className="topo-direita">
        <span className="topo-frase">Sua vida acadêmica, mais simples.</span>
        <nav className="topo-nav" aria-label="Principal">
          <NavLink to="/" end className={classeLink}>Calculadora</NavLink>
          <NavLink to="/como-funciona" className={classeLink}>Como funciona</NavLink>
        </nav>
      </div>
    </header>
  );
}
