# 🖼️ Luxury Assets Guidelines — Lara Nails

Este guia define como gerenciar e otimizar os ativos visuais para manter a estética de luxo e a alta performance.

## 📂 Estrutura de Pastas Sugerida

```text
public/assets/luxury/
├── icons/          # SVGs customizados (Gold & White)
├── gallery/        # Fotos do portfólio em WebP
├── branding/       # Logos e marcas d'água
└── hero/           # Imagens de fundo de alta resolução
```

## 💎 Ícones e SVGs
Todos os ícones devem seguir a espessura de linha `1.5px` para um visual elegante.
- **Cor Primária:** `#C9A66B` (Dourado)
- **Cor Secundária:** `#F7F3EE` (Marfim)

## 📸 Otimização de Imagens
Para garantir o carregamento instantâneo em dispositivos móveis (fator crítico para conversão):

1.  **Formatos:** Use prioritariamente **WebP** ou **AVIF**.
2.  **Resoluções:**
    - Hero Image: `1920x1080` (Desktop), `800x1200` (Mobile).
    - Service Cards: `600x800`.
3.  **Compressão:** Utilize ferramentas como `sharp` ou `squoosh.app` com o preset "Lossless" para detalhes de manicure.

## 📐 Proporções (Aspect Ratio)
-   **Editorial:** `3:4` ou `4:5` para fotos de lifestyle.
-   **Macro:** `1:1` para detalhes técnicos das unhas.

---

Este projeto utiliza a biblioteca **Lucide React** para ícones de interface genéricos, estilizados com a cor `brand-gold`.
