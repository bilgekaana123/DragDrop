"use client";
import { useRef, useEffect, useState } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "@/lib/utils";
import { saveBody, savePosition } from "@/app/actions/cardsActions";
import { DeleteButton } from "./DeleteButton";

type NoteCardProps = {
  note: {
    id: string;
    body: string;
    colors: string;
    position: string;
  };
  onSelect: () => void; // New prop to handle selection
  isSelected: boolean; // New prop to show if selected
};

export function NoteCard({ note, onSelect, isSelected }: NoteCardProps) {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false); // Track if it's saving

  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  const mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const keyUpTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef.current);
    }
  }, []);

  async function handleKeyUp() {
    if (!textAreaRef.current) return;

    setSaving(true); // Show the spinner

    // Clear any previous timeout
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    // Set a timeout to save the body after 2 seconds
    keyUpTimer.current = setTimeout(async () => {
      if (!textAreaRef.current) return;
      await saveBody(note.id, textAreaRef.current.value);
      setSaving(false); // Hide the spinner after saving
    }, 2000);
  }

  function handleInput() {
    if (textAreaRef.current) {
      autoGrow(textAreaRef.current);
    }
  }

  function mouseDown(e: React.MouseEvent) {
    if (!cardRef.current) return;
    onSelect();
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(e: MouseEvent) {
    if (!cardRef.current) return;

    const mouseMoveDirection = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDirection);
    setPosition(newPosition);
  }

  async function mouseUp() {
    if (!cardRef.current) return;
    if (!textAreaRef.current) return;

    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    await savePosition(note.id, newPosition);
    await saveBody(note.id, textAreaRef.current.value);
  }

  return (
    <div
      ref={cardRef}
      onMouseDown={mouseDown}
      className={`card w-[400px] cursor-pointer rounded-md absolute ${isSelected ? "ring-4 ring-blue-500" : ""}`}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="flex justify-between items-center rounded-md p-1"
        style={{ backgroundColor: colors.colorHeader }}
      >
        {saving && (
          <div className="absolute top-0 right-0 p-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
          </div>
        )}
        <DeleteButton noteId={note.id} />
      </div>
      <div className="p-4 rouded-b-md">
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          onInput={handleInput}
          defaultValue={body}
          className="bg-inherit border-none w-full h-full resize-none text-sm focus:bg-inherit focus:outline-none focus:w-full focus:h-full"
          style={{ color: colors.colorText }}
        ></textarea>
      </div>
    </div>
  );
}
