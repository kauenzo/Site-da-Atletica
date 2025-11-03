import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { ids } = await request.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'IDs inválidos' }, { status: 400 })
    }

    // Atualizar a ordem de cada link
    const updates = ids.map((id, index) =>
      prisma.link.update({
        where: { id },
        data: { order: index + 1 },
      })
    )

    await prisma.$transaction(updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao reordenar links:', error)
    return NextResponse.json(
      { error: 'Erro ao reordenar links' },
      { status: 500 }
    )
  }
}

