import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/utils/hash'
import {
  CreateUserInput,
  UpdateUserInput,
  UserFilters,
} from '@/lib/validations/user'

export class UserService {
  static async create(data: CreateUserInput) {
    const hashedPassword = await hashPassword(data.password)

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })
  }

  static async update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  static async findAll(filters?: UserFilters) {
    const where: any = {}

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive
    }

    if (filters?.search) {
      where.OR = [
        { email: { contains: filters.search, mode: 'insensitive' } },
        { username: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    return prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        username: true,
        cpf: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            createdLinks: true,
          },
        },
      },
    })
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        cpf: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        createdLinks: {
          select: {
            id: true,
            label: true,
            slug: true,
            isActive: true,
            clickCount: true,
            createdAt: true,
          },
        },
      },
    })
  }

  static async toggleStatus(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { isActive: true },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
    })
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  static async hashPassword(password: string): Promise<string> {
    return hashPassword(password)
  }
}

