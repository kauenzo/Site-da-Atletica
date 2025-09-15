import { useCallback } from 'react'

interface WhatsAppLinkParams {
  phone: string
  message?: string
}

export function useWhatsAppLink() {
  const generateWhatsAppLink = useCallback(
    ({ phone, message }: WhatsAppLinkParams): string => {
      // tira tudo que não é número
      const formattedPhone = phone.replace(/\D/g, '')
      // codifica a mensagem pra URL se existir
      const encodedMessage = message ? `?text=${encodeURIComponent(message.trim())}` : ''
      return `https://wa.me/${formattedPhone}${encodedMessage}`
    },
    []
  )

  return generateWhatsAppLink
}
