import { RecentLinks } from './components/RecentLinks'
import { StatCard } from './components/StatCard'
import { getDashboardStats } from './services'

export default async function AdminDashboard() {
  const { stats, recentLinks } = await getDashboardStats()

  // Removido o mapeamento de ícones, agora está no componente StatCard

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-gray-600'>
          Visão geral do sistema de gestão de links
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

      <RecentLinks links={recentLinks} />
    </div>
  )
}

