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
    <div className='min-h-screen bg-gray-50'>
      <AdminNav user={session.user} />
      <main className='container mx-auto py-6 px-4'>{children}</main>
    </div>
  )
}

