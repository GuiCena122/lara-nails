import { NextResponse } from 'next/server';

/**
 * INSTAGRAM FEED STUB
 * Ativação futura:
 * 1. Obter Access Token em Meta for Developers.
 * 2. Substituir retorno pelo fetch da API: https://graph.instagram.com/me/media
 * 3. Escopos necessários: user_profile, user_media.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "placeholder",
      message: "Integração Instagram pendente. Consulte STYLE_GUIDE.md.",
      data: [
        { id: "1", media_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600", permalink: "#" },
        { id: "2", media_url: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600", permalink: "#" },
        { id: "3", media_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600", permalink: "#" }
      ]
    },
    { status: 501 } // Not Implemented explicitly
  );
}
