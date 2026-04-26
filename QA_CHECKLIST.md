# ✅ QA Checklist & Critérios de Aceitação — Lara Nails

Documento para validação do novo design luxuoso.

## 🎨 Fidelidade Visual
- [ ] As cores seguem exatamente os tokens: `#0B0B0B`, `#C9A66B`, `#F7F3EE`.
- [ ] Títulos utilizam a fonte `Playfair Display`.
- [ ] O efeito `glass-luxury` possui blur visível (`backdrop-blur-xl`).
- [ ] Transições de hover duram entre 120ms e 200ms.

## ♿ Acessibilidade (WCAG 2.1)
- [ ] Contraste mínimo de 4.5:1 em todos os textos legíveis.
- [ ] Navegação via teclado funcional (Tab order correto).
- [ ] Foco visível (`outline`) em todos os elementos interativos.
- [ ] Atributos `aria-label` presentes em ícones sem texto (ex: botões de fechar).

## 📱 Responsividade
- [ ] Menu mobile (Hamburger) funcional e elegante.
- [ ] Grid de serviços ajusta de 1 para 3 colunas.
- [ ] Imagens no Hero não cortam rostos ou detalhes essenciais em telas pequenas.

## ⚙️ Integridade Técnica
- [ ] Storybook renderiza todos os componentes sem erros no console.
- [ ] Build de produção (`npm run build`) concluído com sucesso.
- [ ] O feed do Instagram retorna erro `501` ou dados de stub conforme planejado.
- [ ] Nenhuma chave de API exposta no código.

## 🏆 Critérios de Sucesso
O rebranding é considerado bem-sucedido se o protótipo navegável for aprovado visualmente e o time de desenvolvimento conseguir rodar o Storybook localmente para consulta.
