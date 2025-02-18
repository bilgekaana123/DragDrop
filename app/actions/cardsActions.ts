"use server";

import { db } from "@/db/drizzle";
import { note } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllNotes() {
  const data = await db.select().from(note);
  return data;
}

export async function updateNoteColors(
  id: string,
  colors: {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
  },
) {
  await db
    .update(note)
    .set({ colors: JSON.stringify(colors) })
    .where(eq(note.id, id));

  revalidatePath("/");
}

export async function savePosition(
  id: string,
  position: { x: number; y: number },
) {
  await db
    .update(note)
    .set({ position: JSON.stringify(position) })
    .where(eq(note.id, id));
}

export async function saveBody(id: string, body: string) {
  await db
    .update(note)
    .set({ body: JSON.stringify(body) })
    .where(eq(note.id, id));
}

export async function deleteNote(id: string) {
  await db.delete(note).where(eq(note.id, id));

  revalidatePath("/");
}

export async function addNote(
  body: string,
  colors: {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
  },
  position: { x: number; y: number },
) {
  await db.insert(note).values({
    body,
    position: JSON.stringify(position),
    colors: JSON.stringify(colors),
  });

  revalidatePath("/");
}
