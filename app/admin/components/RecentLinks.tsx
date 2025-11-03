import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Link = {
  id: string
  label: string
  slug: string
  clickCount: number
  createdAt: Date
  createdBy: {
    username: string
  }
}

interface RecentLinksProps {
  links: Link[]
}

export function RecentLinks({ links }: RecentLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links Recentes</CardTitle>
        <CardDescription>Últimos links criados no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {links.length > 0 ? (
          <div className='space-y-4'>
            {links.map((link) => (
              <div
                key={link.id}
                className='flex items-center justify-between p-4 border rounded-lg'
              >
                <div>
                  <h3 className='font-semibold'>{link.label}</h3>
                  <p className='text-sm text-gray-600'>/{link.slug}</p>
                  <p className='text-xs text-gray-500'>
                    Criado por {link.createdBy.username} • {link.clickCount}{' '}
                    cliques
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-500'>
                    {new Date(link.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500 py-8'>
            Nenhum link encontrado
          </p>
        )}
      </CardContent>
    </Card>
  )
}

