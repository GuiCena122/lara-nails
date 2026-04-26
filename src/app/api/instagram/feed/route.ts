import { NextResponse } from 'next/server';

/**
 * Endpoint de stub para o feed do Instagram.
 * Quando a integração for ativada, este endpoint deve:
 * 1. Buscar o token de acesso do banco de dados (tabela instagram_tokens).
 * 2. Chamar a Instagram Graph API (me/media).
 * 3. Cachear os resultados por 1 hora.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "pending",
      message: "Integração com Instagram não está ativa. Consulte src/lib/instagram/README.md para instruções de ativação.",
      mock_data: []
    },
    { status: 501 }
  );
}
