'use client'

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
import { CreateLinkSchema } from '@/lib/validations/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createLink, generateUniqueSlug, updateLink } from '../actions'

type LinkFormData = {
  label: string
  url: string
  slug: string
}

type LinkFormProps = {
  initialData?: LinkFormData & { id: string }
  mode: 'create' | 'edit'
}

export function LinkForm({ initialData, mode }: LinkFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const schema = CreateLinkSchema
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LinkFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  const watchedLabel = watch('label')

  const handleGenerateSlug = async () => {
    if (!watchedLabel) return

    try {
      const slug = await generateUniqueSlug(watchedLabel)
      setValue('slug', slug)
    } catch (error) {
      console.error('Erro ao gerar slug:', error)
    }
  }

  const onSubmit = async (data: LinkFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value)
        }
      })

      if (mode === 'create') {
        await createLink(formData)
      } else if (initialData?.id) {
        await updateLink(initialData.id, formData)
      }
    } catch (error) {
      setError('Erro ao salvar link')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Criar Link' : 'Editar Link'}
        </CardTitle>
        <CardDescription>
          {mode === 'create'
            ? 'Preencha os dados para criar um novo link'
            : 'Atualize as informações do link'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='label'>Título</Label>
            <Input
              id='label'
              {...register('label')}
              disabled={isLoading}
              placeholder='Nome do link'
            />
            {errors.label && (
              <p className='text-sm text-red-600'>{errors.label.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='url'>URL Original</Label>
            <Input
              id='url'
              type='url'
              {...register('url')}
              disabled={isLoading}
              placeholder='https://exemplo.com'
            />
            {errors.url && (
              <p className='text-sm text-red-600'>{errors.url.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='slug'>Slug</Label>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={handleGenerateSlug}
                disabled={!watchedLabel || isLoading}
              >
                Gerar automático
              </Button>
            </div>
            <Input
              id='slug'
              {...register('slug')}
              disabled={isLoading}
              placeholder='slug-do-link'
            />
            {errors.slug && (
              <p className='text-sm text-red-600'>{errors.slug.message}</p>
            )}
            <p className='text-xs text-gray-500'>
              O link encurtado ficará disponível em: https://aaact.com.br
              <span className='font-medium text-gray-700'>
                /l/{watch('slug') || 'seu-slug'}
              </span>
            </p>
          </div>

          {error && <div className='text-sm text-red-600'>{error}</div>}

          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

