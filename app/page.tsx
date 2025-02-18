import { NotesPage } from "@/components/notepage";
import { getAllNotes } from "./actions/cardsActions";
export const revalidate = 0;

export default async function Home() {
  const notesData = await getAllNotes();

  return (
    <div id="app">
      <NotesPage notesData={notesData} />
    </div>
  );
}
