# CalculaNota (versão React)

Calculadora de média ponderada que também mostra quanto você precisa tirar na próxima avaliação.
Esta é a reimplementação em **React + Vite** do Projeto Incremental 2 (JavaScript puro).

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm test         # testes das regras de cálculo
npm run build    # gera a pasta dist/ (versão de produção)
npm run preview  # testa o build localmente
```

## Estrutura

```
src/
├── main.jsx                  # entrada: monta o React e importa o CSS
├── App.jsx                   # tabela de rotas (React Router)
├── styles.css                # CSS original + pequenos acréscimos (navegação)
├── components/
│   ├── Layout.jsx            # Header + <Outlet/> + Footer
│   ├── Header.jsx, Footer.jsx
│   ├── Intro.jsx, Ajuda.jsx, AnuncioPlaceholder.jsx, Aviso.jsx
│   ├── FormularioNotas.jsx   # formulário (recebe tudo por props)
│   ├── LinhaNota.jsx         # uma avaliação (reutilizada N vezes)
│   └── Resultado.jsx         # média, barra, copiar e compartilhar
├── pages/
│   ├── Home.jsx              # calculadora
│   ├── ComoFunciona.jsx      # explicação do cálculo
│   └── NaoEncontrada.jsx     # rota *
├── hooks/
│   ├── useCalculadora.js     # estado + ações da calculadora
│   └── useTituloPagina.js    # efeito que atualiza o <title>
└── services/
    ├── calculadora.js        # regras de negócio (funções puras, testadas)
    ├── armazenamento.js      # localStorage
    ├── compartilhamento.js   # Clipboard API e Web Share API
    └── calculadora.test.js
```

## Como cada incremento foi atendido

| # | Incremento | O que foi feito |
|---|------------|-----------------|
| 1 | Migração | Vite + React; HTML virou JSX; o CSS original foi mantido, então o visual é o mesmo. |
| 2 | Componentização | `LinhaNota` é renderizada em loop; `Resultado`, `FormularioNotas`, `Header` etc. recebem dados por props. |
| 3 | Estado | `useState` em `useCalculadora` (avaliações, meta, resultado, aviso, foco). Nenhum `querySelector`/`innerHTML`. Inputs controlados. |
| 4 | Efeitos | `useState(estadoInicial)` restaura o último cálculo; `useEffect` salva o resultado no `localStorage`, ajusta o foco, atualiza o título da página e limpa o timer dos botões (com cleanup). |
| 5 | Serviços e APIs | `services/` isola cálculo, `localStorage`, Clipboard e Web Share, todos com `async/await` e `try/catch`. O projeto original não usa API HTTP externa, então não foi inventada uma. |
| 6 | Navegação | React Router (`createHashRouter`): `/` calculadora, `/como-funciona` e rota `*` para 404. |
| 7 | Qualidade e publicação | Pastas por responsabilidade, testes com Vitest, `vite build` e workflow de deploy no GitHub Pages. |

## Publicação (GitHub Pages)

1. Suba o projeto para um repositório no GitHub (branch `main`).
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. O workflow `.github/workflows/deploy.yml` roda a cada push e publica em
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Como o roteador usa hash (`/#/como-funciona`) e o Vite usa `base: './'`, não é preciso configurar nada extra.
Para Vercel/Netlify, basta importar o repositório (build: `npm run build`, saída: `dist`).

## Comparação: JavaScript puro × React

Preencha os números do bundle depois do primeiro `npm run build`.

| Critério | JavaScript puro | React |
|----------|-----------------|-------|
| Manipulação direta do DOM | 24 `querySelector` + `createElement`, `innerHTML`, `appendChild`, `textContent`, `classList`, `.hidden`, `.style` (27 usos) | 0 |
| Eventos | 5 `addEventListener` (um deles com delegação para o botão remover) | `onClick`, `onChange`, `onSubmit` direto no JSX |
| Estrutura | 1 HTML + 1 JS de 161 linhas | 20 arquivos de código (~650 linhas), cada um com uma responsabilidade |
| Linhas de avaliação | HTML repetido no `index.html` **e** duplicado de novo em `criarLinha()` (placeholders já divergiam entre as duas versões) | Um único componente `LinhaNota` |
| Interface | Atualizada manualmente a cada ação | Consequência do estado: mudou o estado, a tela muda |
| Regras de cálculo | Misturadas com leitura de inputs e escrita no DOM dentro do `submit` | Função pura em `services/calculadora.js`, coberta por testes |
| Persistência | Código solto no fim do arquivo | `armazenamento.js` + `useEffect` |
| Tamanho do bundle | ~6,5 KB de JS + 6,5 KB de CSS | _(preencher: JS gzip do `vite build`)_ |
| Curva de aprendizado / custo | Zero ferramentas | Node, build, dependências; compensa quando a interface cresce |

### Correções feitas na migração

- O texto copiado/compartilhado saía com `\n` literal (barra + n) em vez de quebra de linha; agora sai com quebras reais.
- O botão "Copiado!" ficava travado para sempre; agora volta ao normal depois de 2,5 s.
- A média desejada vazia era tratada como 0; agora gera erro de validação.
- A média desejada também é restaurada ao recarregar a página.
- O CSS deixou de importar fontes via `@import` e passou a usar `<link>` no `index.html` (carrega mais rápido).
- Foco visível por teclado em links e botões.
