'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Home,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  Users,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type AdminNavProps = {
  user: {
    id: string
    email?: string | null
    username: string
  }
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Usuários', icon: Users },
  { href: '/admin/links', label: 'Links', icon: LinkIcon },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname()

  return (
    <nav className='bg-white border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-8'>
            <Link
              href='/'
              className='flex items-center space-x-2'
            >
              <Home className='w-5 h-5' />
              <span className='font-semibold'>Atlética</span>
            </Link>

            <div className='flex space-x-4'>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname?.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size='sm'
                      className={cn(
                        'flex items-center space-x-2',
                        isActive && 'bg-primary text-primary-foreground'
                      )}
                    >
                      <Icon className='w-4 h-4' />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <span className='text-sm text-gray-600'>Olá, {user.username}</span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogOut className='w-4 h-4 mr-2' />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

