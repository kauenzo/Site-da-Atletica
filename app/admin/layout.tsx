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
      <AdminNav user={session.user} />
      <main className='pl-64 min-h-screen'>
        <div className='container mx-auto py-6 px-6'>{children}</div>
      </main>
    </div>
  )
}

