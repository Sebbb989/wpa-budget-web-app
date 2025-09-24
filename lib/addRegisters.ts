import { db } from "./db";

export async function addRegister(
  accountId: number,
  data: {
    amount: number;
    category: string;
    transactionType: "income" | "expense" | "transfer";
  }
) {
  await db.registers.add({
    accountId,
    ...data,
    date: new Date().toISOString(),
    syncStatus: "pending",
  });
}
