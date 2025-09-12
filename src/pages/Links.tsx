import { Shield } from 'lucide-react'
import { LINKS } from '@/contants/links'
import bgImage from '@/assets/cavalo-chinelo.jpeg'
import brasaoImage from '@/assets/brasao-atletica.png'
import { Link } from 'react-router-dom'

const Links = () => {
  return (
    <div
      className='min-h-screen bg-neutral-900 bg-cover bg-no-repeat'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='flex justify-center pt-4'>
        <Link to='/'>
          <img
            src={brasaoImage}
            alt='Atlética CC Hero'
            className='size-32 object-cover cursor-pointer transition-transform hover:scale-105'
          />
        </Link>
      </div>
      <div className='flex flex-col items-center mt-2 sm:mt-10'>
        {LINKS.map((item, index) => (
          <a
            key={index}
            href={item.url}
            className='w-2/3 text-center px-6 py-3 my-2 bg-white/15 rounded-2xl text-white text-lg font-medium shadow-md hover:bg-zinc-700/20 transition-colors duration-200'
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Links

