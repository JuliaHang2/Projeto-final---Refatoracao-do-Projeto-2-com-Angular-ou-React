import { Link } from 'react-router-dom';
import useCalculadora from '../hooks/useCalculadora';
import useTituloPagina from '../hooks/useTituloPagina';
import Intro from '../components/Intro';
import FormularioNotas from '../components/FormularioNotas';
import Resultado from '../components/Resultado';
import Aviso from '../components/Aviso';
import AnuncioPlaceholder from '../components/AnuncioPlaceholder';

export default function Home() {
  useTituloPagina('CalculaNota — sua média sem complicação');
  const calc = useCalculadora();

  return (
    <>
      <Intro />

      <section className="painel">
        <div className="painel-titulo">
          <div>
            <h2>Calculadora de média</h2>
            <p>
              Preencha as notas que já recebeu e deixe uma em branco para a próxima
              avaliação.
            </p>
          </div>
          <span className="icone-calculadora">＋</span>
        </div>

        <FormularioNotas
          avaliacoes={calc.avaliacoes}
          alvo={calc.alvo}
          foco={calc.foco}
          onAlvoChange={calc.setAlvo}
          onChange={calc.atualizar}
          onAdicionar={calc.adicionar}
          onRemover={calc.remover}
          onCalcular={calc.calcularMedia}
          onFocado={calc.limparFoco}
        />

        <Resultado resultado={calc.resultado} onErro={calc.setAviso} />
        <Aviso mensagem={calc.aviso} />
      </section>

      <AnuncioPlaceholder />

      <Link className="link-ajuda" to="/como-funciona">
        Como o cálculo funciona? →
      </Link>
    </>
  );
}
