'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Power, PowerOff } from 'lucide-react'
import { useState } from 'react'
import { toggleLinkStatus } from '../../../actions'

type ToggleLinkStatusProps = {
  linkId: string
  isActive: boolean
  linkLabel: string
}

export function ToggleLinkStatus({
  linkId,
  isActive,
  linkLabel,
}: ToggleLinkStatusProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(isActive)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await toggleLinkStatus(linkId)
      setCurrentStatus(!currentStatus)
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-between p-4 border rounded-lg bg-gray-50'>
      <div className='flex items-center gap-3'>
        <div>
          <h3 className='font-semibold'>Status do Link</h3>
          <p className='text-sm text-gray-600'>
            {currentStatus
              ? 'Link está ativo e funcionando'
              : 'Link está inativo e não redireciona'}
          </p>
        </div>
        <Badge variant={currentStatus ? 'default' : 'secondary'}>
          {currentStatus ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>

      <Button
        onClick={handleToggle}
        disabled={isLoading}
        variant={currentStatus ? 'destructive' : 'default'}
        className='flex items-center gap-2'
      >
        {isLoading ? (
          'Alterando...'
        ) : currentStatus ? (
          <>
            <PowerOff className='w-4 h-4' />
            Inativar Link
          </>
        ) : (
          <>
            <Power className='w-4 h-4' />
            Ativar Link
          </>
        )}
      </Button>
    </div>
  )
}

