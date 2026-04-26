# 💅 Lara Nails — Luxury Style Guide

Este documento define as diretrizes visuais e técnicas para a aplicação Lara Nails, focada no mercado de luxo em manicure.

## 🎨 Paleta de Cores (Design Tokens)

| Nome | Hex | Uso |
| :--- | :--- | :--- |
| **Brand Black** | `#0B0B0B` | Background principal, textos em áreas claras. |
| **Brand Gold** | `#C9A66B` | Acentos, botões primários, ícones, gradientes. |
| **Brand Ivory** | `#F7F3EE` | Tipografia principal, cards secundários. |
| **Brand Powder** | `#E8CFC7` | Toques sutis, estados de hover, elementos decorativos. |

## 🖋️ Tipografia

-   **Heading:** `Playfair Display` (Serif). Usar para títulos H1 a H4. Transmite elegância e exclusividade.
-   **Body:** `Inter` (Sans-serif). Usar para textos longos, labels e botões. Foco em legibilidade moderna.

## 🧱 Componentes de UI

Todos os componentes seguem o conceito de **Glassmorphism Luxuoso**:
-   **Background:** `bg-brand-black/60`
-   **Blur:** `backdrop-blur-xl`
-   **Border:** `border-white/10`
-   **Shadow:** `0 10px 30px -10px rgba(201, 166, 107, 0.2)`

## ♿ Acessibilidade

1.  **Contraste:** Garantir que o texto Dourado sobre o fundo Preto mantenha a legibilidade (mínimo 4.5:1).
2.  **Interação:** Microinterações de hover devem ter duração entre `120ms` e `200ms` com easing `ease-in-out`.
3.  **Foco:** Estados de foco devem usar um outline de `1px` na cor `brand-gold`.

## 📸 Guidelines de Fotografia

-   **Estilo:** "Editorial de Moda". Tons quentes, luz suave, sombras profundas.
-   **Foco:** Detalhes macro das mãos intercalados com fotos de lifestyle (studio, café, Paris).
-   **Formatos:** Priorizar `WebP` ou `AVIF` para performance.

## 📸 Instagram (Integração Pendente)

A integração com o Instagram deve ser ativada futuramente via Meta Graph API.
-   **Endpoint Stub:** `/api/instagram/feed`
-   **Scopes:** `instagram_basic`, `pages_read_engagement`.
-   **Configuração:** Inserir `INSTAGRAM_ACCESS_TOKEN` no `.env` (não commitar!).
