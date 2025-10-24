export function generateSlug(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
}

export function generateUniqueSlug(
  label: string,
  existingSlugs: string[]
): string {
  let slug = generateSlug(label)
  let counter = 1

  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(label)}-${counter}`
    counter++
  }

  return slug
}

