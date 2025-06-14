import { Move } from "lucide-react";

export function ButtonDrag() {
  return (
    <div className="bg-[#f5f5f5] w-10 h-10 rounded-full flex items-center justify-center shadow-soft">
      <Move className="w-4 h-4 text-gray" />
    </div>
  );
}
