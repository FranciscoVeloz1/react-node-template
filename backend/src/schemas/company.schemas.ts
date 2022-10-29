import { z } from 'zod'

export const CompanySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Company name is required'),
    location: z.string().min(1, 'Location is required')
  })
})

export const GetCompanySchema = z.object({
  params: z.object({
    id_company: z.string().min(1, 'ID is required')
  })
})

export type CompanyType = z.infer<typeof CompanySchema>['body']
export type GetCompanyType = z.infer<typeof GetCompanySchema>['params']
