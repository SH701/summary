"use client";

import Guide from "@/components/guide/Guide";
import { Info } from "lucide-react";
import { useState } from "react";

export default function InfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <Info className="text-blue-600" />
      </button>

      {open && <Guide onClose={() => setOpen(false)} />}
    </>
  );
}
