# CalculaNota (versão React)

O CalculaNota é uma calculadora de média ponderada. Eu informo as avaliações, as notas e os pesos, e ele mostra a média atual. Se deixo uma nota em branco, ele calcula quanto preciso tirar nessa avaliação para chegar à média que quero.

Este projeto é a reimplementação em **React + Vite** do meu Projeto Incremental 2, que era feito em JavaScript puro. A ideia não foi criar um produto novo, e sim entender como um framework muda a organização de uma aplicação que já funcionava.

**Site publicado:** https://juliahang2.github.io/Projeto-final---Refatoracao-do-Projeto-2-com-Angular-ou-React/

## Funcionalidades

- Adicionar e remover avaliações, cada uma com nome, nota e peso.
- Média ponderada das notas já recebidas.
- Cálculo da nota necessária na próxima avaliação, usando o peso da linha deixada em branco.
- Validações (peso maior que zero, notas entre 0 e 10, apenas uma nota em branco).
- Copiar e compartilhar o resultado (Clipboard API e Web Share API).
- O último cálculo fica salvo no navegador (`localStorage`) e volta ao recarregar a página.
- Página "Como funciona" e página de erro 404.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm test         # testes das regras de cálculo
npm run build    # gera a pasta dist/ (versão de produção)
```

## Estrutura do projeto

```
src/
├── main.jsx, App.jsx, styles.css
├── components/   Header, Footer, Layout, Intro, Ajuda, Aviso,
│                 AnuncioPlaceholder, FormularioNotas, LinhaNota, Resultado
├── pages/        Home, ComoFunciona, NaoEncontrada
├── hooks/        useCalculadora, useTituloPagina
└── services/     calculadora, armazenamento, compartilhamento (+ testes)
```

## Como apliquei cada incremento

**1. Migração.** Criei o projeto com Vite e transformei o HTML em JSX. Mantive o CSS original, então o visual é o mesmo da versão anterior.

**2. Componentização.** Separei a interface em componentes. O principal é o `LinhaNota`, que antes existia duas vezes (no HTML e dentro de uma função do JavaScript) e agora é um só, renderizado em loop. `FormularioNotas`, `Resultado`, `Header` e os demais recebem os dados por props.

**3. Estado.** Todo o estado da calculadora (avaliações, média desejada, resultado, aviso e foco) fica no hook `useCalculadora`, com `useState`. Os inputs são controlados e a tela é consequência do estado. Não sobrou nenhum `querySelector` nem `innerHTML`.

**4. Efeitos.** Uso `useEffect` para salvar o resultado no `localStorage`, aplicar o foco no campo correto, atualizar o título da aba em cada página e limpar o timer dos botões de copiar (com função de limpeza). O último cálculo é restaurado na inicialização do estado.

**5. Serviços.** Tirei as regras do componente e coloquei na pasta `services/`: o cálculo (funções puras, com testes no Vitest), o `localStorage` e os recursos do navegador (copiar e compartilhar, com `async/await` e `try/catch`). O Projeto 2 não consumia nenhuma API HTTP externa, então não incluí uma só para cumprir o requisito.

**6. Navegação.** Usei React Router com `createHashRouter`: `/` para a calculadora, `/como-funciona` para a explicação e uma rota `*` para páginas inexistentes. Escolhi o roteador por hash porque funciona no GitHub Pages sem configuração de servidor.

**7. Qualidade e publicação.** Organizei o código em pastas por responsabilidade, escrevi testes para as regras de cálculo e configurei um workflow do GitHub Actions que roda os testes, faz o build e publica no GitHub Pages a cada push.

## Comparação: JavaScript puro × React

| Critério | JavaScript puro | React |
|----------|-----------------|-------|
| Manipulação direta do DOM | 27 usos (24 `querySelector`, além de `createElement`, `innerHTML`, `appendChild`, `textContent`, `classList`, `.hidden` e `.style`) | Nenhum |
| Eventos | 5 `addEventListener`, um deles com delegação para o botão de remover | `onClick`, `onChange` e `onSubmit` direto no JSX |
| Estrutura | 1 HTML e 1 JS de 161 linhas | 20 arquivos de código (cerca de 650 linhas), cada um com uma responsabilidade |
| Linha de avaliação | Escrita duas vezes (HTML e `criarLinha()`), e os placeholders já tinham divergido | Um único componente |
| Atualização da tela | Manual, a cada ação | Automática, a partir do estado |
| Regras de cálculo | Misturadas com a leitura de inputs e a escrita no DOM | Função pura em `services/`, com testes |
| Tamanho do bundle | ~6,6 KB de JS e ~6,5 KB de CSS (sem minificar e sem compressão) | 219 KB de JS (72 KB com gzip) e 6,1 KB de CSS (1,9 KB com gzip) |
| Custo de ferramentas | Nenhum | Node, build e dependências |

**Minha conclusão.** O React deixou o código mais organizado, mais fácil de reutilizar e de testar, e eliminou a manipulação manual do DOM. Em troca, o bundle ficou bem maior (219 KB contra cerca de 6,6 KB), principalmente por causa das bibliotecas (React, React DOM e React Router), e não do código da aplicação. Para uma aplicação pequena como esta, o JavaScript puro é mais leve e mais simples. O React compensa quando a interface cresce e precisa de componentes reutilizáveis e estado bem definido.
