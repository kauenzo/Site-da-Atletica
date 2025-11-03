'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
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
  { url: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { url: '/admin/users', label: 'Usuários', icon: Users },
  { url: '/admin/links', label: 'Links', icon: LinkIcon },
  { url: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className='h-16 border-b'>
        <Link
          href='/'
          className='flex items-center space-x-2 px-4'
        >
          <Home className='h-5 w-5' />
          <span className='font-semibold'>Atlética</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.url ||
                  (item.url !== '/admin' && pathname?.startsWith(item.url))

                return (
                  <SidebarMenuItem key={item.url}>
                    <Link
                      href={item.url}
                      passHref
                    >
                      <SidebarMenuButton data-active={isActive}>
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className='px-4 py-2'>
          <div className='mb-2 flex items-center space-x-2'>
            <Avatar className='h-8 w-8'>
              <AvatarFallback className='bg-primary/10 text-primary'>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

