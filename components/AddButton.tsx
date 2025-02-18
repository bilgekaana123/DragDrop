"use client";

import { Plus } from "lucide-react";

import colors from "../data/colors.json";
import { addNote } from "@/app/actions/cardsActions";
import { useRef } from "react";

export function AddButton() {
  const startingPos = useRef(50);

  const addNoteButton = async () => {
    const position = {
      x: startingPos.current,
      y: startingPos.current,
    };
    const color = colors[0];
    const body = "";

    await addNote(body, color, position);

    startingPos.current += 10;
  };

  return (
    <button
      onClick={() => addNoteButton()}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-500 transition-all duration-300 hover:h-11 hover:w-11"
    >
      <Plus />
    </button>
  );
}
