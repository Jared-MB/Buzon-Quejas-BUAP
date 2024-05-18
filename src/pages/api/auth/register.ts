import type { APIRoute } from "astro";
import { db, User, eq } from "astro:db";
import * as bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {

    const body = await request.json()

    const isSomeWithSameEmail = (await db.select().from(User).where(eq(User.email, body.email)))[0]
    if (isSomeWithSameEmail) {
        return new Response(null, {
            status: 400,
            statusText: "El correo electrónico ya está en uso.",
        })
    }

    const id = crypto.randomUUID()
    const password = await bcrypt.hash(body.password, 10)

    await db.insert(User).values([{
        ...body,
        password,
        id,
    }])
    return new Response('Usuario registrado correctamente', { status: 201 })
}