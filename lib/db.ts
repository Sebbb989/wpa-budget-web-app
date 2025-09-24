import Dexie, { type EntityTable } from "dexie";


interface Account {
  id: number;
  name: string;
  color: string;
  syncStatus: string;
}

interface Register {
  id: number;
  accountId: number;
  amount: number;
  category: string;
  transactionType: "income" | "expense" | "transfer";
  date: string;
  syncStatus: string;
}

const db = new Dexie('budgetDB') as Dexie & {
  accounts: EntityTable<
    Account,
    'id'
  >;
  registers: EntityTable<
    Register,
    'id'
  >;
};

db.version(1).stores({
  accounts: "++id, name, color, syncStatus",
  registers: "++id, accountId, amount, category, transactionType, date, syncStatus"
});

db.open().catch((err) => {
  console.error("Error opening database:", err);
});

export type { Account, Register }
export { db }