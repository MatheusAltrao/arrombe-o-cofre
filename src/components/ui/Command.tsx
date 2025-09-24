import type { ReactNode } from "react";

interface CommandsProps {
  content: ReactNode;
  description: string;
}

export default function Command({ content, description }: CommandsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        <kbd className="pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          {content}
        </kbd>
      </div>
      <span className="text-sm text-muted-foreground">{description}</span>
    </div>
  );
}
