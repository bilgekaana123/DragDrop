"use client";
import SideNav from "./SideNav";
import { NoteCard } from "./NoteCard";
import { useState } from "react";

type notesDataProps = {
  id: string;
  body: string | null;
  colors: string;
  position: string;
}[];

export const NotesPage = ({ notesData }: { notesData: notesDataProps }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>();
  return (
    <>
      <SideNav selectedNoteId={selectedNoteId} />
      {notesData.map((notes) => (
        <NoteCard
          note={{ ...notes, body: notes.body ?? "" }}
          key={notes.id}
          onSelect={() => setSelectedNoteId(notes.id)}
          isSelected={selectedNoteId === notes.id}
        />
      ))}
    </>
  );
};
