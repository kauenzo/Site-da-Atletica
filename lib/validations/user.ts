import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  phone: z.string().min(10, 'Telefone inválido'),
})

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true,
})

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type LoginInput = z.infer<typeof LoginSchema>

export const UserFiltersSchema = z.object({
  isActive: z.boolean().optional(),
  search: z.string().optional(),
})

export type UserFilters = z.infer<typeof UserFiltersSchema>

