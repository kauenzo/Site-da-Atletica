import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { Link as LinkIcon, MousePointer, TrendingUp, Users } from 'lucide-react'

export default async function AdminDashboard() {
  const [totalUsers, totalLinks, totalClicks, recentLinks] = await Promise.all([
    prisma.user.count(),
    prisma.link.count(),
    prisma.linkClick.count(),
    prisma.link.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
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
      icon: Users,
      description: 'Usuários cadastrados',
    },
    {
      title: 'Total de Links',
      value: totalLinks,
      icon: LinkIcon,
      description: 'Links criados',
    },
    {
      title: 'Total de Cliques',
      value: totalClicks,
      icon: MousePointer,
      description: 'Cliques registrados',
    },
    {
      title: 'Taxa de Engajamento',
      value:
        totalLinks > 0 ? Math.round((totalClicks / totalLinks) * 100) / 100 : 0,
      icon: TrendingUp,
      description: 'Cliques por link',
    },
  ]

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-gray-600'>
          Visão geral do sistema de gestão de links
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {stat.title}
                </CardTitle>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-xs text-muted-foreground'>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Links Recentes</CardTitle>
          <CardDescription>Últimos links criados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {recentLinks.length > 0 ? (
            <div className='space-y-4'>
              {recentLinks.map((link) => (
                <div
                  key={link.id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div>
                    <h3 className='font-semibold'>{link.label}</h3>
                    <p className='text-sm text-gray-600'>/{link.slug}</p>
                    <p className='text-xs text-gray-500'>
                      Criado por {link.createdBy.username} • {link.clickCount}{' '}
                      cliques
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-gray-500'>
                      {new Date(link.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500 py-8'>
              Nenhum link encontrado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

