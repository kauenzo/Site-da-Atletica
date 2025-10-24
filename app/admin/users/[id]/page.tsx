import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getUserById } from '../actions'

type UserPageProps = {
  params: { id: string }
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserById(params.id)

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link href='/admin/users'>
          <Button
            variant='outline'
            size='sm'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Voltar
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>Usuário: {user.username}</h1>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Usuário</CardTitle>
            <CardDescription>Dados básicos do usuário</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Username</label>
              <p className='text-sm text-gray-600'>{user.username}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Email</label>
              <p className='text-sm text-gray-600'>{user.email}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>CPF</label>
              <p className='text-sm text-gray-600'>{user.cpf}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Telefone</label>
              <p className='text-sm text-gray-600'>{user.phone}</p>
            </div>
            <div>
              <label className='text-sm font-medium'>Status</label>
              <div>
                <Badge variant={user.isActive ? 'default' : 'secondary'}>
                  {user.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
            <div>
              <label className='text-sm font-medium'>Criado em</label>
              <p className='text-sm text-gray-600'>
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium'>Atualizado em</label>
              <p className='text-sm text-gray-600'>
                {new Date(user.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links Criados</CardTitle>
            <CardDescription>Links criados por este usuário</CardDescription>
          </CardHeader>
          <CardContent>
            {user.createdLinks.length > 0 ? (
              <div className='space-y-2'>
                {user.createdLinks.map((link) => (
                  <div
                    key={link.id}
                    className='flex items-center justify-between p-2 border rounded'
                  >
                    <div>
                      <p className='font-medium'>{link.label}</p>
                      <p className='text-sm text-gray-600'>/{link.slug}</p>
                      <p className='text-xs text-gray-500'>
                        {link.clickCount} cliques
                      </p>
                    </div>
                    <Badge variant={link.isActive ? 'default' : 'secondary'}>
                      {link.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500'>Nenhum link criado</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

