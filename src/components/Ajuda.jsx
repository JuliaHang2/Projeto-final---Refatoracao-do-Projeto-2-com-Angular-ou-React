export default function Ajuda() {
  return (
    <section className="ajuda">
      <h2>Como funciona?</h2>
      <p>
        Digite as notas das avaliações que já fez e seus respectivos pesos. Deixe a nota de
        uma avaliação futura em branco e informe o peso dela. A calculadora usa essa
        avaliação para estimar quanto você precisa tirar.
      </p>
      <p>
        A nota em branco representa a próxima avaliação. O cálculo considera o peso
        informado nessa linha. Se todas as notas estiverem preenchidas, o site estima uma
        próxima avaliação com peso 1.
      </p>
      <p className="observacao">
        Este cálculo é uma estimativa. Confira sempre os critérios de avaliação definidos
        pelo seu professor ou pela sua instituição.
      </p>
    </section>
  );
}
