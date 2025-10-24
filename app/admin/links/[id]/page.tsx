import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getLinkById } from '../actions'

type LinkPageProps = {
  params: { id: string }
}

export default async function LinkPage({ params }: LinkPageProps) {
  const link = await getLinkById(params.id)

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link href='/admin/links'>
          <Button
            variant='outline'
            size='sm'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Voltar
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>Link: {link.label}</h1>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Link</CardTitle>
            <CardDescription>Dados básicos do link</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Label</label>
              <p className='text-sm text-gray-600'>{link.label}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>URL</label>
              <div className='flex items-center gap-2'>
                <p className='text-sm text-gray-600 break-all'>{link.url}</p>
                <a
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    <ExternalLink className='w-4 h-4' />
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <label className='text-sm font-medium'>Slug</label>
              <p className='text-sm text-gray-600'>/{link.slug}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Status</label>
              <div>
                <Badge variant={link.isActive ? 'default' : 'secondary'}>
                  {link.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
            <div>
              <label className='text-sm font-medium'>Cliques</label>
              <p className='text-sm text-gray-600'>{link.clickCount}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Criado por</label>
              <p className='text-sm text-gray-600'>{link.createdBy.username}</p>
            </div>
            {link.updatedBy && (
              <div>
                <label className='text-sm font-medium'>Atualizado por</label>
                <p className='text-sm text-gray-600'>
                  {link.updatedBy.username}
                </p>
              </div>
            )}
            <div>
              <label className='text-sm font-medium'>Criado em</label>
              <p className='text-sm text-gray-600'>
                {new Date(link.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium'>Atualizado em</label>
              <p className='text-sm text-gray-600'>
                {new Date(link.updatedAt).toLocaleDateString('pt-BR')}
              </p>
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
            {link.clicks.length > 0 ? (
              <div className='space-y-2'>
                {link.clicks.map((click) => (
                  <div
                    key={click.id}
                    className='flex items-center justify-between p-2 border rounded'
                  >
                    <div>
                      <p className='text-sm'>{click.userAgent || 'N/A'}</p>
                      <p className='text-xs text-gray-500'>
                        {click.ipAddress} • {click.referer || 'Direto'}
                      </p>
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
              <p className='text-sm text-gray-500'>Nenhum clique registrado</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

