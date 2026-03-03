import { asc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { chirps } from "../../db/schema.js";

export async function insertChirp(body: string, userId: string) {
    const [res] = await db.insert(chirps).values({ body: body, userId: userId }).returning()
    return res
}

export async function getChips() {
    return await db.select().from(chirps).orderBy(asc(chirps.updatedAt))
}

export async function getAChip(chipId: string) {
    return await db.select().from(chirps).where(eq(chirps.id, chipId));
}