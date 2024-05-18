import type { APIRoute } from "astro";
import { db, User } from "astro:db";

export const GET: APIRoute = async () => {
    const users = await db.select().from(User).all()
    return new Response(JSON.stringify(users), { status: 200 })
}