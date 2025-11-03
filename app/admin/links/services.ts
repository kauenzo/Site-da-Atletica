import { prisma } from '@/lib/prisma'
import {
  CreateLinkInput,
  LinkFilters,
  UpdateLinkInput,
} from '@/lib/validations/link'

export class LinkService {
  static async create(data: CreateLinkInput & { order?: number }, createdById: string) {
    return prisma.link.create({
      data: {
        ...data,
        createdById,
        updatedById: createdById,
      },
      include: {
        createdBy: {
          select: {
            username: true,
          },
        },
      },
    })
  }

  static async update(id: string, data: UpdateLinkInput, updatedById: string) {
    return prisma.link.update({
      where: { id },
      data: {
        ...data,
        updatedById,
      },
      include: {
        createdBy: {
          select: {
            username: true,
          },
        },
        updatedBy: {
          select: {
            username: true,
          },
        },
      },
    })
  }

  static async findAll(filters?: LinkFilters) {
    const where: any = {}

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive
    }

    if (filters?.search) {
      where.OR = [
        { label: { contains: filters.search, mode: 'insensitive' } },
        { url: { contains: filters.search, mode: 'insensitive' } },
        { slug: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    if (filters?.createdBy) {
      where.createdById = filters.createdBy
    }

    return prisma.link.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        createdBy: {
          select: {
            username: true,
          },
        },
        updatedBy: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            clicks: true,
          },
        },
      },
    })
  }

  static async findById(id: string) {
    return prisma.link.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            username: true,
          },
        },
        updatedBy: {
          select: {
            username: true,
          },
        },
        clicks: {
          orderBy: { clickedAt: 'desc' },
          take: 10,
        },
      },
    })
  }

  static async findBySlug(slug: string) {
    return prisma.link.findUnique({
      where: { slug },
    })
  }

  static async toggleStatus(id: string, updatedById: string) {
    const link = await prisma.link.findUnique({
      where: { id },
      select: { isActive: true },
    })

    if (!link) {
      throw new Error('Link não encontrado')
    }

    return prisma.link.update({
      where: { id },
      data: {
        isActive: !link.isActive,
        updatedById,
      },
    })
  }

  static async incrementClicks(
    slug: string,
    clickData: {
      userAgent?: string
      referer?: string
      ipAddress?: string
    }
  ) {
    const link = await prisma.link.findUnique({
      where: { slug },
    })

    if (!link || !link.isActive) {
      return null
    }

    // Usar transação para garantir consistência
    const result = await prisma.$transaction(async (tx) => {
      // Registrar o clique
      await tx.linkClick.create({
        data: {
          linkId: link.id,
          userAgent: clickData.userAgent,
          referer: clickData.referer,
          ipAddress: clickData.ipAddress,
        },
      })

      // Incrementar o contador
      const updatedLink = await tx.link.update({
        where: { id: link.id },
        data: {
          clickCount: {
            increment: 1,
          },
        },
      })

      return updatedLink
    })

    return result
  }

  static async getStats(linkId: string) {
    const link = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        clicks: {
          select: {
            id: true,
            clickedAt: true,
            userAgent: true,
            referer: true,
            ipAddress: true,
          },
        },
      },
    })

    if (!link) {
      return null
    }

    // Calcular estatísticas
    const totalClicks = link.clicks.length
    const todayClicks = link.clicks.filter(
      (click) =>
        new Date(click.clickedAt).toDateString() === new Date().toDateString()
    ).length

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekClicks = link.clicks.filter(
      (click) => new Date(click.clickedAt) >= weekAgo
    ).length

    return {
      link,
      totalClicks,
      todayClicks,
      weekClicks,
    }
  }
}

