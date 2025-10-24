'use server'

import { authOptions } from '@/lib/auth'
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserFilters,
  UserFiltersSchema,
} from '@/lib/validations/user'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UserService } from './services'

async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function createUser(formData: FormData) {
  await requireAuth()

  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
    cpf: formData.get('cpf'),
    phone: formData.get('phone'),
  }

  const validatedData = CreateUserSchema.parse(rawData)

  try {
    await UserService.create(validatedData)
    revalidatePath('/admin/users')
  } catch (error) {
    throw new Error('Erro ao criar usuário')
  }
}

export async function updateUser(id: string, formData: FormData) {
  await requireAuth()

  const rawData = {
    email: formData.get('email'),
    username: formData.get('username'),
    cpf: formData.get('cpf'),
    phone: formData.get('phone'),
  }

  const validatedData = UpdateUserSchema.parse(rawData)

  try {
    await UserService.update(id, validatedData)
    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}`)
  } catch (error) {
    throw new Error('Erro ao atualizar usuário')
  }
}

export async function toggleUserStatus(id: string) {
  await requireAuth()

  try {
    await UserService.toggleStatus(id)
    revalidatePath('/admin/users')
  } catch (error) {
    throw new Error('Erro ao alterar status do usuário')
  }
}

export async function getUsers(filters?: UserFilters) {
  await requireAuth()

  const validatedFilters = filters
    ? UserFiltersSchema.parse(filters)
    : undefined
  return UserService.findAll(validatedFilters)
}

export async function getUserById(id: string) {
  await requireAuth()

  const user = await UserService.findById(id)
  if (!user) {
    throw new Error('Usuário não encontrado')
  }
  return user
}

