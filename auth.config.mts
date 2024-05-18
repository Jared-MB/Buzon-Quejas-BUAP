import Credentials from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';
import { db, eq, User } from 'astro:db'

import * as bcrypt from 'bcrypt'

export default defineConfig({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const authUser = (await db.select().from(User).where(eq(User.email, credentials.email as string ?? '')))[0]
                if (!authUser) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials.password as string, authUser.password)
                if (!isPasswordValid) {
                    return null
                }

                const { password, ...user } = authUser
                return user
            },
        })
    ],
    pages: {
        signIn: '/login',
    }
})