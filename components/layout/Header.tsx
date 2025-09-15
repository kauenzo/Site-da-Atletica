'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { URLS } from '@/contants/urls'

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Eventos', href: '/calendario' },
  { label: 'Lojinha', href: URLS.LOJINHA },
  { label: 'Sócio', href: URLS.CHEERS },
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isScrolled) return null

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-atletica-burgundy/95 backdrop-blur-sm border-b border-atletica-white/20 shadow-lg'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Left Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-atletica-white hover:text-atletica-sand-light transition-colors duration-200 font-medium',
                  pathname === item.href && 'text-atletica-sand-light'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link
            href='/'
            className='flex items-center justify-center'
          >
            <div className='w-10 h-10 rounded-full shadow-md flex items-center justify-center'>
              <img
                src='/assets/brasao-atletica.png'
                alt='Atlética CC Hero'
                className='w-full h-full object-cover'
              />
            </div>
          </Link>

          {/* Right Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-atletica-white hover:text-atletica-sand-light transition-colors duration-200 font-medium',
                  pathname === item.href && 'text-atletica-sand-light'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger Menu (Mobile) */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='focus:outline-none'
              aria-label='Abrir menu'
            >
              <svg
                className='w-7 h-7 text-atletica-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
            {menuOpen && (
              <div className='absolute top-16 right-4 bg-atletica-burgundy rounded shadow-lg py-4 px-6 flex flex-col gap-4'>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='text-atletica-white hover:text-atletica-sand-light font-medium transition-colors duration-200'
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

