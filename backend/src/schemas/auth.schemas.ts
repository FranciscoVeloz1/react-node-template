import { z } from 'zod'

export const SignInSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email is required').email('Write a correct email'),
    password: z.string().min(1, 'Password is required')
  })
})

export type SignInType = z.infer<typeof SignInSchema>['body']
