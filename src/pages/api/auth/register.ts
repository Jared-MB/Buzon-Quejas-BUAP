import type { APIRoute } from "astro";
import { db, User, eq } from "astro:db";
import * as bcrypt from "bcrypt";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    try {
        const isSomeWithSameEmail = (await db.select().from(User).where(eq(User.email, body.email)))[0];
        if (isSomeWithSameEmail) {
            return new Response("El correo electrónico ya está en uso.", {
                status: 400,
                statusText: "El correo electrónico ya está en uso.",
            });
        }
    }
    catch (error) {
        console.error(error);
        return new Response("Error al verificar el correo electrónico.", {
            status: 500,
            statusText: "Error al verificar el correo electrónico.",
        });
    }

    const id = crypto.randomUUID();
    const password = await bcrypt.hash(body.password, 10);

    console.log({ id, body });

    try {
        await db.insert(User).values([{
            ...body,
            password,
            id,
        }]);
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        return new Response("Error al registrar el usuario.", {
            status: 500,
            statusText: "Error al registrar el usuario.",
        });
    }

    return new Response('Usuario registrado correctamente', { status: 201 });
};
