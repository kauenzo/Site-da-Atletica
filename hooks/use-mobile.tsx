'use client'

import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Iniciar com false para evitar problemas de hidratação
  const [isMobile, setIsMobile] = React.useState(false)
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    // Marcar que o componente foi montado
    setHasMounted(true)

    // Verificar o tamanho da tela apenas no cliente
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }

      // Verificar inicialmente
      checkMobile()

      // Adicionar listener para mudanças de tamanho
      window.addEventListener('resize', checkMobile)

      // Limpar o listener ao desmontar
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Durante a renderização do servidor ou antes da montagem, sempre retorna false
  // Após a montagem no cliente, retorna o valor real
  return hasMounted ? isMobile : false
}

