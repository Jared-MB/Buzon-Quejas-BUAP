import { z } from 'zod'

export const ComplaintValidator = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    status: z.enum(['pending', 'inProgress', 'resolved']),
    userId: z.string().uuid(),
    id: z.string().uuid(),
    updatedAt: z.date().optional(),
    createdAt: z.date().optional(),
    at: z.date().optional(),
    location: z.string().optional()
})

export type Complaint = z.infer<typeof ComplaintValidator>