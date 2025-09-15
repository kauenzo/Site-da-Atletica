import { useCallback } from 'react'

/**
 * Formata um número de telefone brasileiro para o padrão legível.
 * Exemplo: "5548991553972" => "(48) 99155-3972"
 */
export function useFormatPhone() {
  const formatPhone = useCallback((phone: string): string => {
    // Remove tudo que não é número
    const digits = phone.replace(/\D/g, '')

    // Remove o código do país (assumindo sempre '55' para Brasil)
    const local = digits.startsWith('55') ? digits.slice(2) : digits

    // Extrai DDD, prefixo e sufixo
    const ddd = local.slice(0, 2)
    const prefixo = local.slice(2, 7)
    const sufixo = local.slice(7)

    // Monta o formato legível
    return `(${ddd}) ${prefixo}-${sufixo}`
  }, [])

  return formatPhone
}