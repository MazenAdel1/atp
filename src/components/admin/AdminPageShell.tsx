import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export default function AdminPageShell({
  title,
  action,
  children,
  wideGrid = false,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  wideGrid?: boolean;
}) {
  return (
    <main className="container py-5">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl">{title}</h1>
        {action}
      </section>
      <section
        className={cn(
          "grid grid-cols-1 py-5 md:grid-cols-2",
          wideGrid ? "gap-6" : "gap-6 lg:grid-cols-3",
        )}
      >
        {children}
      </section>
    </main>
  );
}
