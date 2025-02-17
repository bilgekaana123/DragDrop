"use client";
import { useRef, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { setNewOffset, autoGrow, setZIndex } from "@/lib/utils";

type NoteCardProps = {
  note: {
    $id: number;
    body: string;
    colors: string;
    position: string;
  };
};

export function NoteCard({ note }: NoteCardProps) {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  const mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef.current);
    }
  }, []);

  function handleInput() {
    if (textAreaRef.current) {
      autoGrow(textAreaRef.current);
    }
  }

  function mouseDown(e: React.MouseEvent) {
    if (!cardRef.current) return;
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

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  return (
    <div
      ref={cardRef}
      onMouseDown={mouseDown}
      className="card w-[400px] cursor-pointer rounded-md absolute"
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
        <Trash2 className="w-5 h-5 text-black" />
      </div>
      <div className="p-4 rouded-b-md">
        <textarea
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
