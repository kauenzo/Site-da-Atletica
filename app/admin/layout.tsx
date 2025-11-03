import { ClientOnly } from '@/components/ui/client-only'
import { SidebarProvider } from '@/components/ui/sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AdminNav } from './components/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen bg-background'>
      <ClientOnly
        fallback={
          <div className='fixed inset-y-0 left-0 z-30 hidden h-screen w-64 border-r bg-sidebar md:block' />
        }
      >
        <SidebarProvider>
          <AdminNav user={session.user} />
          <main className='pl-16 md:pl-64 min-h-screen transition-all duration-300'>
            <div className='container mx-auto py-6 px-6'>{children}</div>
          </main>
        </SidebarProvider>
      </ClientOnly>
    </div>
  )
}

