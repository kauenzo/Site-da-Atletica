import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowLeft,
  Calendar,
  Globe,
  MousePointer,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { getLinkStats } from '../../actions'

type AnalyticsPageProps = {
  params: { id: string }
}

export default async function LinkAnalyticsPage({
  params,
}: AnalyticsPageProps) {
  const stats = await getLinkStats(params.id)

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link href={`/admin/links/${params.id}`}>
          <Button
            variant='outline'
            size='sm'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Voltar
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>Analytics: {stats.link.label}</h1>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total de Cliques
            </CardTitle>
            <MousePointer className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalClicks}</div>
            <p className='text-xs text-muted-foreground'>Cliques registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Cliques Hoje</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.todayClicks}</div>
            <p className='text-xs text-muted-foreground'>Cliques hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Cliques Esta Semana
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.weekClicks}</div>
            <p className='text-xs text-muted-foreground'>Últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Status</CardTitle>
            <Globe className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.link.isActive ? 'Ativo' : 'Inativo'}
            </div>
            <p className='text-xs text-muted-foreground'>
              {stats.link.isActive ? 'Link funcionando' : 'Link desabilitado'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Link</CardTitle>
          <CardDescription>Detalhes básicos do link</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='text-sm font-medium'>Label</label>
              <p className='text-sm text-gray-600'>{stats.link.label}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>URL</label>
              <p className='text-sm text-gray-600 break-all'>
                {stats.link.url}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium'>Slug</label>
              <p className='text-sm text-gray-600'>/{stats.link.slug}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Total de Cliques</label>
              <p className='text-sm text-gray-600'>{stats.link.clickCount}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Criado em</label>
              <p className='text-sm text-gray-600'>
                {new Date(stats.link.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium'>Última atualização</label>
              <p className='text-sm text-gray-600'>
                {new Date(stats.link.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimos Cliques</CardTitle>
          <CardDescription>
            Registro dos últimos cliques no link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.link.clicks.length > 0 ? (
            <div className='space-y-2'>
              {stats.link.clicks.slice(0, 10).map((click) => (
                <div
                  key={click.id}
                  className='flex items-center justify-between p-3 border rounded-lg'
                >
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>
                      {click.userAgent || 'Navegador desconhecido'}
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-500 mt-1'>
                      <span>IP: {click.ipAddress || 'N/A'}</span>
                      <span>Referer: {click.referer || 'Direto'}</span>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs text-gray-500'>
                      {new Date(click.clickedAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500 py-8'>
              Nenhum clique registrado ainda
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

