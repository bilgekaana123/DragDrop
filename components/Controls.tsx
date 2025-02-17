import { AddButton } from "./AddButton";

export default function Controls() {
  return (
    <div className="flex flex-col gap-4 items-center fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-4 rounded-xl shadow-xl z-50">
      <AddButton />
    </div>
  );
}
