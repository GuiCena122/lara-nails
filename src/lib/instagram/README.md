# Integração Instagram (Pendente)

Este projeto está preparado para exibir o feed do Instagram, mas a integração requer configuração manual no Meta for Developers.

## Passo a Passo para Ativação

1.  **Criação do App:** Acesse [Meta for Developers](https://developers.facebook.com/) e crie um App do tipo "Consumidor".
2.  **Produto:** Adicione o produto "Instagram Basic Display".
3.  **Configuração OAuth:**
    - Adicione `https://lara-nails.vercel.app/api/auth/instagram/callback` como redirect URI.
4.  **Variáveis de Ambiente:**
    - `INSTAGRAM_CLIENT_ID`: ID do App.
    - `INSTAGRAM_CLIENT_SECRET`: Segredo do App.
5.  **Banco de Dados:**
    - Crie uma tabela para armazenar o `access_token` de longa duração.

## Fluxo de Autenticação sugerido

1. Usuário Admin clica em "Conectar Instagram" no Dashboard.
2. Redireciona para `/api/auth/instagram`.
3. Callback salva o token no banco.
4. O componente da Home consome `/api/instagram/feed`.
