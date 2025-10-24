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
import { CreateUserSchema } from '@/lib/validations/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createUser, updateUser } from '../actions'

type UserFormData = {
  email: string
  password: string
  username: string
  cpf: string
  phone: string
}

type UserFormProps = {
  initialData?: UserFormData & { id: string }
  mode: 'create' | 'edit'
}

export function UserForm({ initialData, mode }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const schema = CreateUserSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: UserFormData) => {
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
        await createUser(formData)
      } else if (initialData?.id) {
        await updateUser(initialData.id, formData)
      }
    } catch (error) {
      setError('Erro ao salvar usuário')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Criar Usuário' : 'Editar Usuário'}
        </CardTitle>
        <CardDescription>
          {mode === 'create'
            ? 'Preencha os dados para criar um novo usuário'
            : 'Atualize as informações do usuário'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className='text-sm text-red-600'>{errors.email.message}</p>
            )}
          </div>

          {mode === 'create' && (
            <div className='space-y-2'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                id='password'
                type='password'
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className='text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              {...register('username')}
              disabled={isLoading}
            />
            {errors.username && (
              <p className='text-sm text-red-600'>{errors.username.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='cpf'>CPF</Label>
            <Input
              id='cpf'
              {...register('cpf')}
              disabled={isLoading}
            />
            {errors.cpf && (
              <p className='text-sm text-red-600'>{errors.cpf.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Telefone</Label>
            <Input
              id='phone'
              {...register('phone')}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className='text-sm text-red-600'>{errors.phone.message}</p>
            )}
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

