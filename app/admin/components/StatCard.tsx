import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link as LinkIcon, MousePointer, TrendingUp, Users } from 'lucide-react'
import { IconName } from '../services'

// Mapeamento de nomes de ícones para componentes
const iconMap = {
  Users,
  LinkIcon,
  MousePointer,
  TrendingUp,
}

type StatCardProps = {
  title: string
  value: number
  icon: IconName
  description: string
}

export function StatCard({ title, value, icon, description }: StatCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  )
}

