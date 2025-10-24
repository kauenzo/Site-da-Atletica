'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Edit, Eye, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toggleUserStatus } from '../actions'

type User = {
  id: string
  email: string
  username: string
  cpf: string
  phone: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count: {
    createdLinks: number
  }
}

type UserListProps = {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  const [search, setSearch] = useState('')
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(
    undefined
  )

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      isActiveFilter === undefined || user.isActive === isActiveFilter
    return matchesSearch && matchesStatus
  })

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleUserStatus(id)
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Usuários</h1>
        <Link href='/admin/users/new'>
          <Button>
            <UserPlus className='w-4 h-4 mr-2' />
            Novo Usuário
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre os usuários por status ou busca
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='search'>Buscar</Label>
              <Input
                id='search'
                placeholder='Email ou username...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className='flex items-end gap-2'>
              <Button
                variant={isActiveFilter === undefined ? 'default' : 'outline'}
                onClick={() => setIsActiveFilter(undefined)}
              >
                Todos
              </Button>
              <Button
                variant={isActiveFilter === true ? 'default' : 'outline'}
                onClick={() => setIsActiveFilter(true)}
              >
                Ativos
              </Button>
              <Button
                variant={isActiveFilter === false ? 'default' : 'outline'}
                onClick={() => setIsActiveFilter(false)}
              >
                Inativos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-4'>
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold'>{user.username}</h3>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <p className='text-sm text-gray-600'>{user.email}</p>
                  <p className='text-xs text-gray-500'>
                    CPF: {user.cpf} | Telefone: {user.phone}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Links criados: {user._count.createdLinks}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Switch
                    checked={user.isActive}
                    onCheckedChange={() => handleToggleStatus(user.id)}
                  />
                  <Link href={`/admin/users/${user.id}`}>
                    <Button
                      variant='outline'
                      size='sm'
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                  </Link>
                  <Link href={`/admin/users/${user.id}/edit`}>
                    <Button
                      variant='outline'
                      size='sm'
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-gray-500'>
              Nenhum usuário encontrado
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

