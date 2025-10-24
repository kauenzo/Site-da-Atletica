import { PrismaClient } from '@prisma/client'
import { LINKS } from '../contants/links'
import { hashPassword } from '../lib/utils/hash'
import { generateUniqueSlug } from '../lib/utils/slug'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Criar usuário admin padrão
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@atletica.com' },
    update: {},
    create: {
      email: 'admin@atletica.com',
      password: await hashPassword('admin123'),
      username: 'admin',
      cpf: '12345678901',
      phone: '48999999999',
    },
  })

  console.log('✅ Usuário admin criado:', adminUser.email)

  // Migrar links existentes
  const existingSlugs: string[] = []

  for (const linkData of LINKS) {
    const slug = generateUniqueSlug(linkData.label, existingSlugs)
    existingSlugs.push(slug)

    const link = await prisma.link.upsert({
      where: { slug },
      update: {},
      create: {
        label: linkData.label,
        url: linkData.url,
        slug,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    })

    console.log('✅ Link criado:', link.label, '->', link.slug)
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

