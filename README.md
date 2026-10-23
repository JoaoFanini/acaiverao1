# Açaí Verão — site

Landing page da Açaí Verão: HTML, CSS e JavaScript puros (sem framework, sem build).

## Estrutura

```
index.html        a página
css/style.css     cores e medidas (no :root, no topo do arquivo) + estilos
js/main.js        animação de entrada do hero e revelação ao rolar
images/           logo e fotos do cardápio
```

## Publicar no GitHub Pages

1. Envie todos os arquivos para a raiz do repositório (o `index.html` precisa ficar na raiz).
2. No GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
3. Em 1–2 minutos o site fica em `https://joaofanini.github.io/A-ai-ver-o/`.

## Editar

- **Preços, nomes e descrições:** direto no `index.html`, dentro de cada `<article class="av-card">`.
- **Trocar foto:** substitua o arquivo em `images/` mantendo o mesmo nome (proporção 4:3; a do hero, quadrada).
- **Cores:** mude as variáveis `--acai-*`, `--ouro`, `--folha` no início do `css/style.css`.
- **Animação ao rolar:** qualquer elemento com `data-reveal` anima. Valores: `fade` (padrão), `words` (palavra por palavra), `stagger` (filhos em sequência), `img` (foto). `data-delay="300"` atrasa em ms.

## Pendências

- Trocar as fotos (são recortes de prints do iFood, em baixa resolução).
- Colocar o link real do iFood/WhatsApp no rodapé e no botão do carrinho.
