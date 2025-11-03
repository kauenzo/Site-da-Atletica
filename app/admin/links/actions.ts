'use server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  CreateLinkSchema,
  LinkFiltersSchema,
  UpdateLinkSchema,
} from '@/lib/validations/link'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { LinkService } from './services'

async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return session
}

async function getNextOrder(): Promise<number> {
  const agg = await prisma.link.aggregate({ _max: { order: true } })
  const max = agg._max.order ?? 0
  return max + 1
}

export async function createLink(formData: FormData) {
  const session = await requireAuth()

  const rawData = {
    label: formData.get('label'),
    url: formData.get('url'),
    slug: formData.get('slug'),
  }

  const validatedData = CreateLinkSchema.parse(rawData)

  try {
    const nextOrder = await getNextOrder()
    await LinkService.create(
      { ...validatedData, order: nextOrder },
      session.user.id
    )
    revalidatePath('/admin/links')
  } catch (error) {
    throw new Error('Erro ao criar link')
  }
}

export async function updateLink(id: string, formData: FormData) {
  const session = await requireAuth()

  const rawData = {
    label: formData.get('label'),
    url: formData.get('url'),
    slug: formData.get('slug'),
  }

  const validatedData = UpdateLinkSchema.parse(rawData)

  try {
    await LinkService.update(id, validatedData, session.user.id)
    revalidatePath('/admin/links')
    revalidatePath(`/admin/links/${id}`)
  } catch (error) {
    throw new Error('Erro ao atualizar link')
  }
}

export async function toggleLinkStatus(id: string) {
  const session = await requireAuth()

  try {
    await LinkService.toggleStatus(id, session.user.id)
    revalidatePath('/admin/links')
  } catch (error) {
    throw new Error('Erro ao alterar status do link')
  }
}

export async function getLinks(filters?: any) {
  await requireAuth()

  const validatedFilters = filters
    ? LinkFiltersSchema.parse(filters)
    : undefined
  return LinkService.findAll(validatedFilters)
}

export async function getLinkById(id: string) {
  await requireAuth()

  const link = await LinkService.findById(id)
  if (!link) {
    throw new Error('Link não encontrado')
  }
  return link
}

export async function getLinkStats(linkId: string) {
  await requireAuth()

  const stats = await LinkService.getStats(linkId)
  if (!stats) {
    throw new Error('Link não encontrado')
  }
  return stats
}

export async function generateUniqueSlug(label: string) {
  await requireAuth()

  // Buscar todos os slugs existentes
  const existingSlugs = await prisma.link.findMany({
    select: { slug: true },
  })

  const slugs = existingSlugs.map((link) => link.slug)

  // Gerar slug único
  let slug = generateSlugFromLabel(label)
  let counter = 1

  while (slugs.includes(slug)) {
    slug = `${generateSlugFromLabel(label)}-${counter}`
    counter++
  }

  return slug
}

function generateSlugFromLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
}

export async function reorderLinks(ids: string[]) {
  const session = await requireAuth()

  try {
    const updates = ids.map((id, index) =>
      prisma.link.update({
        where: { id },
        data: { order: index + 1 },
      })
    )
    await prisma.$transaction(updates)
    revalidatePath('/admin/links')
  } catch (error) {
    throw new Error('Erro ao reordenar links')
  }
}

export async function deleteLink(id: string) {
  const session = await requireAuth()

  try {
    await prisma.link.delete({
      where: { id },
    })
    revalidatePath('/admin/links')
  } catch (error) {
    throw new Error('Erro ao excluir link')
  }
}

