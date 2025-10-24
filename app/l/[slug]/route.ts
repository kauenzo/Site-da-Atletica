import { LinkService } from '@/app/admin/links/services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const link = await LinkService.findBySlug(slug)

    if (!link) {
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      )
    }

    if (!link.isActive) {
      return NextResponse.json({ error: 'Link inativo' }, { status: 410 })
    }

    // Registrar o clique
    const clickData = {
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    }

    await LinkService.incrementClicks(slug, clickData)

    // Redirecionar para a URL
    return NextResponse.redirect(link.url)
  } catch (error) {
    console.error('Erro no redirect:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

