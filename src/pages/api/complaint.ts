import type { APIRoute } from "astro";
import { Complaint, db, User } from "astro:db";

export const GET: APIRoute = async () => {
    const users = await db.select().from(Complaint).all()
    return new Response(JSON.stringify(users), { status: 200 })
}