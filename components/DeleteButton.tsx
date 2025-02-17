"use client";
import { Trash2 } from "lucide-react";
import { deleteNote } from "@/app/actions/cardsActions";
import { useTransition } from "react";

export function DeleteButton({ noteId }: { noteId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (noteId: string) => {
    startTransition(async () => {
      await deleteNote(noteId);
    });
  };

  return (
    <button
      onClick={() => handleDelete(noteId)}
      disabled={isPending}
      className=" rounded hover:bg-gray-100 transition-colors"
      aria-label="Delete note"
    >
      <Trash2
        className={`w-5 h-5 ${isPending ? "text-gray-400" : "text-black"}`}
      />
    </button>
  );
}
