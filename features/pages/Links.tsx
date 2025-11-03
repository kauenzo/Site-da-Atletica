import { prisma } from '@/lib/prisma'
import Link from 'next/link'
const bgImage = '/assets/cavalo-chinelo.jpeg'
const brasaoImage = '/assets/brasao-atletica.png'

const Links = async () => {
  const links = await prisma.link.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div
      className='min-h-screen bg-neutral-900 bg-cover bg-no-repeat'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='flex justify-center pt-4'>
        <Link href='/'>
          <img
            src={brasaoImage}
            alt='Atlética CC Hero'
            className='size-32 object-cover cursor-pointer transition-transform hover:scale-105'
          />
        </Link>
      </div>
      <div className='flex flex-col items-center mt-2 sm:mt-10'>
        {links.map((link) => (
          <a
            key={link.id}
            href={`/l/${link.slug}`}
            className='w-2/3 text-center px-6 py-3 my-2 bg-white/15 rounded-2xl text-white text-lg font-medium shadow-md hover:bg-zinc-700/20 transition-colors duration-200 hover:scale-105'
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Links

