import { z } from 'zod'

export const CreateUserSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User is required'),
    email: z.string().min(1, 'Email is required').email('Write a correct email'),
    password: z.string().min(1, 'Password is required')
  })
})

export const UpdateUserSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User is required'),
    email: z.string().min(1, 'Email is required').email('Write a correct email'),
    password: z.string().min(1, 'Password is required')
  }),
  params: z.object({
    id: z.number().min(1, 'ID is required')
  })
})

export type CreateProductType = z.infer<typeof CreateUserSchema>['body']
