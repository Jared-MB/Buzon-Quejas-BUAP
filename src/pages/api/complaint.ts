import { ComplaintValidator } from "@/validators/complaint.validator";
import type { APIRoute } from "astro";
import { Complaint, db, User, eq } from "astro:db";
import { getSession } from "auth-astro/server";

export const GET: APIRoute = async () => {
    const users = await db.select().from(Complaint).all()
    return new Response(JSON.stringify(users), { status: 200 })
}

export const POST: APIRoute = async ({ request }) => {

    const session = await getSession(request)

    if (!session || !session.user) {
        return new Response("Not Found", { status: 404 })
    }

    const complaint = await request.json()

    const user = (await db.select({ id: User.id }).from(User).where(eq(User.email, session?.user.email ?? '')))[0]
    if (!user) {
        return new Response("Not Found", { status: 404 })
    }

    // const parsedData = ComplaintValidator.safeParse(complaint)
    // if (!parsedData.success) {
    //     console.error(parsedData.error)
    //     return new Response('Bad Request', { status: 400 })
    // }

    const complaintData = {
        ...complaint,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await db.insert(Complaint).values(complaintData)

    return new Response('Queja subida correctamente', { status: 200 })
}