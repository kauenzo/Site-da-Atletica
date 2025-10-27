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
import { ThemeToggle } from './ThemeToggle'

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
    <aside className='fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r bg-background'>
      {/* Cabeçalho da Sidebar */}
      <div className='flex h-16 items-center border-b px-6'>
        <Link
          href='/'
          className='flex items-center space-x-2'
        >
          <Home className='h-5 w-5' />
          <span className='font-semibold'>Atlética</span>
        </Link>
      </div>

      {/* Links de Navegação */}
      <nav className='flex-1 space-y-1 px-3 py-4'>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className='block'
            >
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                size='sm'
                className={cn(
                  'w-full justify-start py-2.5',
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className='mr-2 h-4 w-4' />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Rodapé da Sidebar */}
      <div className='border-t p-4'>
        <div className='mb-2 flex items-center space-x-2'>
          <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
            <span className='text-sm font-medium text-primary'>
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>{user.username}</p>
            <p className='text-xs text-muted-foreground truncate'>
              {user.email}
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between mb-2'>
          <ThemeToggle />
          <Button
            variant='outline'
            size='sm'
            className='flex-1 justify-start ml-2'
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut className='mr-2 h-4 w-4' />
            Sair
          </Button>
        </div>
      </div>
    </aside>
  )
}

