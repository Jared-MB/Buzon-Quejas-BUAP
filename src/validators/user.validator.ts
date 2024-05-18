import { z } from 'zod'

export const UserRegisterValidator = z.object({
    name: z.string().min(3),
    lastName: z.string().min(3),
    matricula: z.string().min(9).max(9),
    phone: z.string().min(10).max(13),
    career: z.string().min(3),
    email: z.string().endsWith('.buap.mx', 'El correo electrónico debe un correo institucional').email(),
    password: z.string().min(6),
    username: z.string().min(3),
})