import { fakeData as notes } from "@/data/fakeData";
import { NoteCard } from "./NoteCard";

export const NotesPage = () => {
  return (
    <>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </>
  );
};
