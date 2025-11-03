'use client'

import { PanelLeft } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_DEFAULT_SIZE = 16
const SIDEBAR_COLLAPSED_SIZE = 4

type SidebarContext = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)

  // Durante a renderização no servidor ou fora do SidebarProvider, retornar valores padrão
  if (!context) {
    // Valores padrão para SSR ou quando usado fora do SidebarProvider
    return {
      expanded: true,
      setExpanded: () => {},
      isMobile: false,
      openMobile: false,
      setOpenMobile: () => {},
      toggleSidebar: () => {},
    }
  }

  return context
}

interface SidebarProviderProps {
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  children: React.ReactNode
}

function SidebarProvider({
  defaultExpanded = true,
  expanded: expandedProp,
  onExpandedChange: setExpandedProp,
  children,
}: SidebarProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use expandedProp and setExpandedProp for control from outside the component.
  const [_expanded, _setExpanded] = React.useState(defaultExpanded)
  const expanded = expandedProp ?? _expanded

  // Evitar problemas de hidratação montando apenas no cliente
  React.useEffect(() => {
    setMounted(true)
  }, [])
  const setExpanded = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const expandedState =
        typeof value === 'function' ? value(expanded) : value
      if (setExpandedProp) {
        setExpandedProp(expandedState)
      } else {
        _setExpanded(expandedState)
      }

      // This sets the cookie to keep the sidebar state.
      if (typeof document !== 'undefined') {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${expandedState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
    },
    [setExpandedProp, expanded]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setExpanded((expanded) => !expanded)
  }, [isMobile, setExpanded, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
    return undefined
  }, [toggleSidebar])

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      expanded,
      setExpanded,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [expanded, setExpanded, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  // Renderizar uma versão simplificada no servidor e durante a hidratação inicial
  if (!mounted) {
    return (
      <div className='hidden md:block'>
        <div className='fixed inset-y-0 left-0 z-30 hidden h-screen w-64 border-r bg-sidebar md:block' />
        {children}
      </div>
    )
  }

  // Renderizar a versão completa apenas no cliente após a hidratação
  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  collapsedSize?: number
  variant?: 'default' | 'floating' | 'inset'
  side?: 'left' | 'right'
}

function Sidebar({
  defaultSize = SIDEBAR_DEFAULT_SIZE,
  collapsedSize = SIDEBAR_COLLAPSED_SIZE,
  variant = 'default',
  side = 'left',
  className,
  children,
  ...props
}: SidebarProps) {
  // Usar try-catch para evitar erro quando o componente é renderizado fora do SidebarProvider (no servidor)
  let sidebarContext: SidebarContext | null = null
  try {
    sidebarContext = React.useContext(SidebarContext)
  } catch (error) {
    // Ignorar erro durante a renderização no servidor
  }

  // Se não temos contexto, renderizar uma versão simplificada (para SSR)
  if (!sidebarContext) {
    return (
      <div
        className={cn('hidden md:block', className)}
        {...props}
      >
        <div className='flex h-full w-full flex-col bg-sidebar text-sidebar-foreground'>
          {children}
        </div>
      </div>
    )
  }

  const { isMobile, expanded, openMobile, setOpenMobile } = sidebarContext

  if (isMobile) {
    return (
      <Sheet
        open={openMobile}
        onOpenChange={setOpenMobile}
      >
        <SheetContent
          side={side}
          className={cn(
            'w-[calc(var(--sidebar-width)*1rem)] p-0 bg-sidebar text-sidebar-foreground',
            className
          )}
          style={{ '--sidebar-width': defaultSize } as React.CSSProperties}
        >
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='hidden md:flex'
    >
      <ResizablePanel
        defaultSize={expanded ? defaultSize : collapsedSize}
        minSize={expanded ? 10 : collapsedSize}
        maxSize={expanded ? 30 : collapsedSize}
        collapsible={!expanded}
        collapsedSize={collapsedSize}
        className={cn(
          variant === 'floating' && 'p-2',
          variant === 'inset' && 'p-2',
          className
        )}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          data-expanded={expanded}
          data-variant={variant}
          data-side={side}
          className={cn(
            'flex h-full w-full flex-col bg-sidebar text-sidebar-foreground',
            variant === 'floating' &&
              'rounded-lg border border-sidebar-border shadow',
            variant === 'inset' && 'rounded-lg'
          )}
        >
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function SidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar='trigger'
      variant='ghost'
      size='icon'
      className='h-7 w-7'
      onClick={toggleSidebar}
    >
      <PanelLeft />
      <span
        className='sr-only'
        suppressHydrationWarning
      >
        Toggle Sidebar
      </span>
    </Button>
  )
}

function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-sidebar='header'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-sidebar='footer'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator>) {
  return (
    <Separator
      data-sidebar='separator'
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  )
}

function SidebarNav({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      data-sidebar='nav'
      className={cn('flex flex-col gap-1 px-2', className)}
      {...props}
    >
      {children}
    </nav>
  )
}

interface SidebarNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
  icon?: React.ReactNode
  label?: string
  showTooltip?: boolean
}

function SidebarNavItem({
  href,
  active,
  icon,
  label,
  showTooltip = true,
  className,
  children,
  ...props
}: SidebarNavItemProps) {
  const { expanded } = useSidebar()

  const content = (
    <a
      href={href}
      data-sidebar='nav-item'
      data-active={active}
      className={cn(
        'flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground',
        className
      )}
      {...props}
    >
      {icon && <span className='size-4 shrink-0'>{icon}</span>}
      {expanded && <span className='truncate'>{label || children}</span>}
    </a>
  )

  if (!expanded && showTooltip && label) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side='right'
          align='center'
        >
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

