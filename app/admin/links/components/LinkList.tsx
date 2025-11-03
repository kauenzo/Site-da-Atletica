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
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit, Eye, GripVertical, Link as LinkIcon, Plus } from 'lucide-react'
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
  order: number
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

type SortableLinkItemProps = {
  link: Link
  onToggleStatus: (id: string) => void
}

function SortableLinkItem({ link, onToggleStatus }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
    >
      <CardContent className='pt-6'>
        <div className='flex items-center justify-between gap-3'>
          <button
            className='cursor-grab active:cursor-grabbing touch-none'
            {...attributes}
            {...listeners}
          >
            <GripVertical className='w-5 h-5 text-gray-400' />
          </button>

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
              onCheckedChange={() => onToggleStatus(link.id)}
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
  )
}

export function LinkList({ links }: LinkListProps) {
  const [search, setSearch] = useState('')
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(
    undefined
  )
  const [localLinks, setLocalLinks] = useState(links)
  const [isSaving, setIsSaving] = useState(false)

  const filteredLinks = localLinks.filter((link) => {
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = filteredLinks.findIndex((link) => link.id === active.id)
    const newIndex = filteredLinks.findIndex((link) => link.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    // Reordenar localmente
    const reorderedLinks = [...filteredLinks]
    const [movedLink] = reorderedLinks.splice(oldIndex, 1)
    reorderedLinks.splice(newIndex, 0, movedLink)

    // Atualizar a ordem de todos os links reordenados
    const updatedReorderedLinks = reorderedLinks.map((link, index) => ({
      ...link,
      order: index + 1,
    }))

    // Criar um mapa de IDs para novos valores de order
    const orderMap = new Map(
      updatedReorderedLinks.map((link) => [link.id, link.order])
    )

    // Atualizar estado local mantendo links não filtrados
    const newLocalLinks = localLinks
      .map((link) => {
        if (orderMap.has(link.id)) {
          return { ...link, order: orderMap.get(link.id)! }
        }
        return link
      })
      .sort((a, b) => a.order - b.order)

    setLocalLinks(newLocalLinks)

    // Salvar no servidor
    setIsSaving(true)
    try {
      const ids = updatedReorderedLinks.map((link) => link.id)
      const response = await fetch('/api/admin/links/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })

      if (!response.ok) {
        throw new Error('Erro ao reordenar')
      }

      // Recarregar a página para garantir sincronização
      // window.location.reload()
    } catch (error) {
      console.error('Erro ao reordenar links:', error)
      // Reverter mudanças locais
      setLocalLinks(links)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Links</h1>
          {isSaving && (
            <p className='text-sm text-gray-500 mt-1'>Salvando ordem...</p>
          )}
        </div>
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
          <CardDescription>
            Filtre os links por status ou busca. Arraste os cards para
            reordenar.
          </CardDescription>
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

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredLinks.map((link) => link.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='grid gap-4'>
            {filteredLinks.map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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

