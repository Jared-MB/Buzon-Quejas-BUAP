import type { APIRoute } from "astro";
import { db, User, eq } from "astro:db";
import * as bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

export const POST: APIRoute = async ({ request }) => {

    const body = await request.json()

    const isSomeWithSameEmail = (await db.select().from(User).where(eq(User.email, body.email)))[0]
    if (isSomeWithSameEmail) {
        return new Response(null, {
            status: 400,
            statusText: "El correo electrónico ya está en uso.",
        })
    }

    const id = randomUUID()
    const password = await bcrypt.hash(body.password, 10)

    const savedUser = await db.insert(User).values([{
        ...body,
        password,
        id,
    }]).returning({
        id: User.id,
        email: User.email,
        name: User.name,
    })

    return new Response(JSON.stringify(savedUser), { status: 201 })
}