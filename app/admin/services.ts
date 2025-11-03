'use server'

import { prisma } from '@/lib/prisma'

// Tipo para os ícones disponíveis
export type IconName = 'Users' | 'LinkIcon' | 'MousePointer' | 'TrendingUp'

export async function getDashboardStats() {
  const [totalUsers, totalLinks, totalClicks, recentLinks] = await Promise.all([
    prisma.user.count(),
    prisma.link.count(),
    prisma.linkClick.count(),
    prisma.link.findMany({
      take: 5,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        createdBy: {
          select: {
            username: true,
          },
        },
      },
    }),
  ])

  const stats = [
    {
      title: 'Total de Usuários',
      value: totalUsers,
      icon: 'Users' as IconName,
      description: 'Usuários cadastrados',
    },
    {
      title: 'Total de Links',
      value: totalLinks,
      icon: 'LinkIcon' as IconName,
      description: 'Links criados',
    },
    {
      title: 'Total de Cliques',
      value: totalClicks,
      icon: 'MousePointer' as IconName,
      description: 'Cliques registrados',
    },
    {
      title: 'Taxa de Engajamento',
      value:
        totalLinks > 0 ? Math.round((totalClicks / totalLinks) * 100) / 100 : 0,
      icon: 'TrendingUp' as IconName,
      description: 'Cliques por link',
    },
  ]

  return {
    stats,
    recentLinks,
  }
}

