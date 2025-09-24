"use client";
import { useEffect } from "react";
import { db } from "../lib/db";

export default function Home() {
  useEffect(() => {
    const syncData = async () => {
      console.log("online");
      const accounts = await db.accounts.where("syncStatus").equals("pending").toArray();
      const registers = await db.registers.where("syncStatus").equals("pending").toArray();

      if (accounts.length || registers.length) {
        try {
          const res = await fetch("/api/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accounts, registers })
          });

          if (res.ok) {
            await db.accounts.bulkPut(accounts.map(a => ({ ...a, syncStatus: "synced" })));
            await db.registers.bulkPut(registers.map(r => ({ ...r, syncStatus: "synced" })));
          }
        } catch (err) {
          console.error("Error en sincronización:", err);
        }
      }
    };

    window.addEventListener("offline", () => {
      console.log("offline");
    });

    // Ejecutar cuando vuelva online
    window.addEventListener("online", syncData);

    return () => {
      window.removeEventListener("online", syncData);
      window.removeEventListener("offline", () => {
        console.log("offline");
      });
    };
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"></div>
  );
}
