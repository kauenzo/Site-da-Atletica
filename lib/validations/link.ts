import { z } from 'zod'

export const CreateLinkSchema = z.object({
  label: z.string().min(1, 'Label é obrigatório'),
  url: z.string().url('URL inválida'),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(
      /^[a-z0-9-_]+$/,
      'Slug deve conter apenas letras minúsculas, números, hífens e underscores'
    ),
})

export const UpdateLinkSchema = CreateLinkSchema.partial()

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>
export type UpdateLinkInput = z.infer<typeof UpdateLinkSchema>

export const LinkFiltersSchema = z.object({
  isActive: z.boolean().optional(),
  search: z.string().optional(),
  createdBy: z.string().optional(),
})

export type LinkFilters = z.infer<typeof LinkFiltersSchema>

