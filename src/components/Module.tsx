import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";

interface ModuleProps {
  title: string;
  amountOfLessons: number;
  moduleIndex: number;
}

export function Module({ amountOfLessons, title, moduleIndex }: ModuleProps) {
  return (
    <div>
      <button className="flex w-full items-center gap-3 bg-zinc-800 p-4 ">
        <span className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sm">
          {moduleIndex + 1}
        </span>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400" />
      </button>

      <nav className="relative flex flex-col gap-4 p-6">
        <Lesson title="Introdução" duration="05:19" />
        <Lesson title="Fundamentos do redux" duration="09:13" />
        <Lesson title="Zustand" duration="14:56" />
      </nav>
    </div>
  );
}
