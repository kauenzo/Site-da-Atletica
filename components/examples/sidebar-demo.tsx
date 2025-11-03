'use client'

import {
  BarChart3,
  Boxes,
  Home,
  LayoutDashboard,
  Link,
  Settings,
  Users,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { ClientOnlySidebarProvider } from '@/components/ui/client-only-sidebar-provider'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar-shadcn'

export function SidebarDemo() {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <ClientOnlySidebarProvider
      expanded={expanded}
      onExpandedChange={setExpanded}
    >
      <div className='flex h-[calc(100vh-theme(spacing.16))] w-full flex-col overflow-hidden rounded-xl border'>
        <div className='flex h-14 items-center border-b px-4'>
          <SidebarTrigger />
          <div className='ml-2 font-semibold'>Atlética Cavalo de Troia</div>
        </div>
        <div className='flex flex-1'>
          <Sidebar
            variant='default'
            defaultSize={16}
            collapsedSize={4}
          >
            <SidebarHeader>
              <Input placeholder='Buscar...' />
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav>
                <SidebarNavItem
                  href='#'
                  icon={<Home />}
                  label='Início'
                  active
                />
                <SidebarNavItem
                  href='#'
                  icon={<LayoutDashboard />}
                  label='Dashboard'
                />
                <SidebarNavItem
                  href='#'
                  icon={<BarChart3 />}
                  label='Analytics'
                />
              </SidebarNav>
              <SidebarSeparator />
              <SidebarNav>
                <SidebarNavItem
                  href='#'
                  icon={<Link />}
                  label='Links'
                />
                <SidebarNavItem
                  href='#'
                  icon={<Users />}
                  label='Usuários'
                />
                <SidebarNavItem
                  href='#'
                  icon={<Boxes />}
                  label='Produtos'
                />
              </SidebarNav>
            </SidebarContent>
            <SidebarFooter>
              <SidebarNav>
                <SidebarNavItem
                  href='#'
                  icon={<Settings />}
                  label='Configurações'
                />
              </SidebarNav>
            </SidebarFooter>
          </Sidebar>
          <div className='flex-1'>
            <div className='flex h-full flex-col'>
              <div className='flex h-14 items-center border-b px-6 font-semibold'>
                Conteúdo Principal
              </div>
              <div className='flex-1 overflow-auto p-6'>
                <div className='space-y-6'>
                  <h1 className='text-3xl font-bold'>
                    Bem-vindo à Atlética Cavalo de Troia
                  </h1>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Este é um exemplo de implementação da sidebar usando os
                    componentes do Shadcn UI.
                  </p>
                  <div className='flex items-center gap-2'>
                    <Button>Botão Primário</Button>
                    <Button variant='outline'>Botão Secundário</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnlySidebarProvider>
  )
}

