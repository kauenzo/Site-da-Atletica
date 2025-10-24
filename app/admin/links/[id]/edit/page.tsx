import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getLinkById } from '../../actions'
import { LinkForm } from '../../components/LinkForm'
import { ToggleLinkStatus } from './components/ToggleLinkStatus'

type EditLinkPageProps = {
  params: { id: string }
}

export default async function EditLinkPage({ params }: EditLinkPageProps) {
  const link = await getLinkById(params.id)

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link href={`/admin/links/${params.id}`}>
          <Button
            variant='outline'
            size='sm'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Voltar
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>Editar Link: {link.label}</h1>
      </div>

      <ToggleLinkStatus
        linkId={link.id}
        isActive={link.isActive}
        linkLabel={link.label}
      />

      <Card>
        <CardHeader>
          <CardTitle>Editar Link</CardTitle>
          <CardDescription>Atualize as informações do link</CardDescription>
        </CardHeader>
        <CardContent>
          <LinkForm
            mode='edit'
            initialData={{
              id: link.id,
              label: link.label,
              url: link.url,
              slug: link.slug,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

