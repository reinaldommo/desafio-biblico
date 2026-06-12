"use client";

import { useEffect } from "react";
import { InstallPrompt } from "./InstallPrompt";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      const register = () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* falha de registro do SW é não-fatal */
        });
      };
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return (
    <>
      {children}
      <InstallPrompt />
    </>
  );
}
