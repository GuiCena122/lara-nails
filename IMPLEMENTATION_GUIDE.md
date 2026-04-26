# 🛠️ Guia de Implementação — Lara Nails Rebranding

Este guia orienta a integração incremental da nova identidade visual luxuosa no projeto existente.

## ⚙️ Comandos Rápidos

- `npm install` — Instala as novas dependências (cva, lucide-react, framer-motion).
- `npm run storybook` — Inicia a documentação de componentes.
- `npm run dev` — Servidor de desenvolvimento local.

## 🔄 Estratégia de Integração Incremental

Para evitar quebras no sistema funcional, siga esta ordem:

### Passo 1: Fundação (CSS & Tokens)
Certifique-se de que o arquivo `src/app/globals.css` foi atualizado com o novo `@theme` do Tailwind 4. Os tokens em `design-tokens.json` devem ser a única fonte de verdade para cores.

### Passo 2: Substituição de Componentes Atômicos
Comece substituindo botões e inputs nativos pelos componentes em `src/components/ui/`.
- Use a variante `luxury` para ações principais.
- Use a variante `outline` para ações secundárias.

### Passo 3: Migração de Layout (Header & Hero)
Substitua o `Navbar` e `Hero` antigos pelas novas versões. Como mantivemos os nomes dos arquivos, a mudança deve ser automática, exigindo apenas ajustes de props se necessário.

### Passo 4: Páginas de Agendamento e Dashboard
Utilize o componente `ServiceCard` e `Calendar` para recriar a experiência de agendamento. 

## 🎨 Mapeamento de Classes Tailwind

| Elemento | Classe Recomendada |
| :--- | :--- |
| Container de Vidro | `glass-luxury` |
| Gradiente Dourado | `gold-gradient` |
| Texto Dourado | `gold-text` |
| Título Principal | `font-serif text-brand-ivory` |

## 📸 Assets
Todos os novos assets devem ser colocados em `public/assets/luxury/`. Priorize o formato **WebP** com compressão de 85% para manter o equilíbrio entre luxo e performance.
