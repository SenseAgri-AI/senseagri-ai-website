import type { ReactNode } from "react";
import WikiSidebar from "@/components/wiki/WikiSidebar";

export default function WikiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface px-6 py-12 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <WikiSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
