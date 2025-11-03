'use client'

import * as React from 'react'
import { SidebarProvider as BaseSidebarProvider } from './sidebar-shadcn'
// Garantir que todas as importações necessárias estão presentes

interface ClientOnlySidebarProviderProps {
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  children: React.ReactNode
}

export function ClientOnlySidebarProvider({
  children,
  ...props
}: ClientOnlySidebarProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='w-full'>
        <div className='fixed inset-y-0 left-0 z-30 hidden h-screen w-64 border-r bg-sidebar md:block' />
        {children}
      </div>
    )
  }

  return <BaseSidebarProvider {...props}>{children}</BaseSidebarProvider>
}

