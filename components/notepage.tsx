import Controls from "./Controls";
import { NoteCard } from "./NoteCard";
import { getAllNotes } from "@/app/actions/cardsActions";

export const NotesPage = async () => {
  const notesData = await getAllNotes();

  return (
    <>
      <Controls />
      {notesData.map((notes) => (
        <NoteCard note={{ ...notes, body: notes.body ?? "" }} key={notes.id} />
      ))}
    </>
  );
};
