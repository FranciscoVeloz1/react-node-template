import { z } from 'zod'

export const CreateUserSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User is required'),
    email: z.string().min(1, 'Email is required').email('Write a correct email'),
    fullname: z.string().min(1, 'Fullname is required'),
    password: z.string().min(8, 'Password length must be minimum 8'),
    fk_role: z.number().min(1, 'Role is required').nonnegative(),
    fk_company: z.number().min(1, 'Company is required').nonnegative()
  })
})

export const GetUserSchema = z.object({
  params: z.object({
    id_user: z.number().min(1, 'ID is required').nonnegative()
  })
})

export const UpdateUserSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User is required'),
    email: z.string().min(1, 'Email is required').email('Write a correct email'),
    fullname: z.string().min(1, 'Fullname is required'),
    password: z.string().min(8, 'Password length must be minimum 8').optional(),
    fk_role: z.number().min(1, 'Role is required').nonnegative(),
    fk_company: z.number().min(1, 'Company is required').nonnegative()
  })
})

export type CreateUserType = z.infer<typeof CreateUserSchema>['body']
export type GetUserType = z.infer<typeof GetUserSchema>['params']
export type UpdateUserType = z.infer<typeof UpdateUserSchema>['body']
