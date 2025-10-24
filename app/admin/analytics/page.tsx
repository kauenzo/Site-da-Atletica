import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { Link as LinkIcon, MousePointer, TrendingUp } from 'lucide-react'

export default async function AnalyticsPage() {
  const [totalLinks, totalClicks, activeLinks, topLinks] = await Promise.all([
    prisma.link.count(),
    prisma.linkClick.count(),
    prisma.link.count({ where: { isActive: true } }),
    prisma.link.findMany({
      take: 10,
      orderBy: { clickCount: 'desc' },
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
      title: 'Total de Links',
      value: totalLinks,
      icon: LinkIcon,
      description: 'Links criados',
    },
    {
      title: 'Links Ativos',
      value: activeLinks,
      icon: LinkIcon,
      description: 'Links em funcionamento',
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
        <h1 className='text-3xl font-bold'>Analytics</h1>
        <p className='text-gray-600'>Estatísticas e métricas do sistema</p>
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
          <CardTitle>Links Mais Acessados</CardTitle>
          <CardDescription>Top 10 links com mais cliques</CardDescription>
        </CardHeader>
        <CardContent>
          {topLinks.length > 0 ? (
            <div className='space-y-4'>
              {topLinks.map((link, index) => (
                <div
                  key={link.id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className='font-semibold'>{link.label}</h3>
                      <p className='text-sm text-gray-600'>/{link.slug}</p>
                      <p className='text-xs text-gray-500'>
                        Criado por {link.createdBy.username}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-2xl font-bold text-primary'>
                      {link.clickCount}
                    </p>
                    <p className='text-xs text-gray-500'>cliques</p>
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

