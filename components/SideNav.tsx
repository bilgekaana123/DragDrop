import { AddButton } from "./AddButton";
import colors from "../data/colors.json";
import ColorsButton from "./ColorsButton";

export default function SideNav({
  selectedNoteId,
}: {
  selectedNoteId: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-4 items-center fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/80 p-4 rounded-full shadow-xl z-50">
      <AddButton />
      {colors.map((color) => (
        <ColorsButton
          key={color.id}
          color={color}
          selectedNoteId={selectedNoteId}
        />
      ))}
    </div>
  );
}
