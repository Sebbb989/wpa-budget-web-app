"use client";
import { useEffect } from "react";
import { db } from "../lib/db";
import { ConfigIcon } from "@/assets/icons/ConfigIcon";
import { PlusIcon } from "@/assets/icons/PlusIcon";

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

  const tempAccounts = [
    { "name": "Visa", "amount": 120.5, "color": "#0D7377" },
    { "name": "Personal", "amount": -45.2, "color": "#A103FC" },
    { "name": "Pagos", "amount": 300.75, "color": "#0096C7" },
    { "name": "TC - BG", "amount": -720.33, "color": "#9D0191" },
    { "name": "TC - Deuda general", "amount": 75.1, "color": "#7B2CBF" },
    { "name": "TC - Paseo", "amount": -220.89, "color": "#B5179E" },
    { "name": "Ahorros", "amount": 500.0, "color": "#7209B7" },
    { "name": "Alquiler", "amount": -90.45, "color": "#3A0CA3" },
    { "name": "Transporte", "amount": 60.6, "color": "#4361EE" },
    { "name": "Gastos Fijos", "amount": 300.75, "color": "#0096C7" },
  ]

  return (
    <div className="font-sans p-4 flex flex-col gap-4 items-center">
      <div className="flex w-full justify-between items-center">
        <p className="text-lg">List of accounts</p>
        <div className="border-1 border-gray-700 rounded-xl p-2">
          <ConfigIcon className="w-7 h-7 text-blue-600" />
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-1 select-none">
        {tempAccounts.map((account) => {
          return (
            <div key={account.name} className="rounded-lg h-12 px-1.5 py-1.5" style={{ backgroundColor: account.color }}>
              <p className="text-xs truncate">{account.name}</p>
              <p className="text-sm">{account.amount.toString()?.startsWith('-') ? '-' : ''}USD ${account.amount.toFixed(2).toString().replace('-', '')}</p>
            </div>
          )
        })}
        <div key={"addaccount"} className="border-1 border-blue-500 rounded-lg px-0 py-1.5 bg-transparent text-blue-500 h-12 flex items-center justify-center" >
          <p className="text-base text-center leading-4 px-2">Add account</p>
          <div className="bg-blue-500 rounded-full p-0.5 mr-1">
            <PlusIcon className="w-4 h-4 text-black" />

          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 bg-[#212121] p-4 rounded-lg mt-2">
        <h1 className="text-xl">Balance:</h1>
        <p className="text-xl">{tempAccounts.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2).toString().startsWith('-') ? '-' : ''}USD {tempAccounts.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2).toString().replace('-', '')}</p>
      </div>
      <div className="absolute bottom-4 right-4 p-4 rounded-full bg-blue-500 text-white text-xl">
        <PlusIcon className="w-7 h-7" />
      </div>
    </div>
  );
}
