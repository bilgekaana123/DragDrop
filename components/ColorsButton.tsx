"use client";

import { updateNoteColors } from "@/app/actions/cardsActions";

type ColorsButtonProps = {
  color: {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
  };
  selectedNoteId: string | undefined;
};

export default function ColorsButton({
  color,
  selectedNoteId,
}: ColorsButtonProps) {
  const changeColor = async (id: string | undefined) => {
    if (!id) {
      alert("Please select a note first");
      return;
    }
    await updateNoteColors(id, color);
  };

  return (
    <button
      onClick={() => changeColor(selectedNoteId)}
      className="bg-gray h-10 w-10 cursor-pointer rounded-full"
      style={{ backgroundColor: color.colorHeader }}
    ></button>
  );
}
