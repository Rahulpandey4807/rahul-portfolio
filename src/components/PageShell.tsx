"use client";

import { useState, type ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";

export default function PageShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <main id="main-content">{children}</main>
    </>
  );
}
