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
import { Edit, Eye, Link as LinkIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toggleLinkStatus } from '../actions'

type Link = {
  id: string
  label: string
  url: string
  slug: string
  isActive: boolean
  clickCount: number
  createdAt: Date
  updatedAt: Date
  createdBy: {
    username: string
  }
  updatedBy?: {
    username: string
  } | null
  _count: {
    clicks: number
  }
}

type LinkListProps = {
  links: Link[]
}

export function LinkList({ links }: LinkListProps) {
  const [search, setSearch] = useState('')
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(
    undefined
  )

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.label.toLowerCase().includes(search.toLowerCase()) ||
      link.url.toLowerCase().includes(search.toLowerCase()) ||
      link.slug.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      isActiveFilter === undefined || link.isActive === isActiveFilter
    return matchesSearch && matchesStatus
  })

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleLinkStatus(id)
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Links</h1>
        <Link href='/admin/links/new'>
          <Button>
            <Plus className='w-4 h-4 mr-2' />
            Novo Link
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os links por status ou busca</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='search'>Buscar</Label>
              <Input
                id='search'
                placeholder='Label, URL ou slug...'
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
        {filteredLinks.map((link) => (
          <Card key={link.id}>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1 flex-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold'>{link.label}</h3>
                    <Badge variant={link.isActive ? 'default' : 'secondary'}>
                      {link.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <p className='text-sm text-gray-600 break-all'>{link.url}</p>
                  <div className='flex items-center gap-4 text-xs text-gray-500'>
                    <span>/{link.slug}</span>
                    <span>{link.clickCount} cliques</span>
                    <span>Criado por {link.createdBy.username}</span>
                    <span>
                      {new Date(link.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Switch
                    checked={link.isActive}
                    onCheckedChange={() => handleToggleStatus(link.id)}
                  />
                  <Link href={`/admin/links/${link.id}`}>
                    <Button
                      variant='outline'
                      size='sm'
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                  </Link>
                  <Link href={`/admin/links/${link.id}/edit`}>
                    <Button
                      variant='outline'
                      size='sm'
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                  </Link>
                  <Link href={`/admin/links/${link.id}/analytics`}>
                    <Button
                      variant='outline'
                      size='sm'
                    >
                      <LinkIcon className='w-4 h-4' />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-gray-500'>Nenhum link encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

