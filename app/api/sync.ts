import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { accounts, registers } = req.body;

      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);

      if (accounts?.length) {
        await db.collection("accounts").insertMany(accounts);
      }

      if (registers?.length) {
        await db.collection("registers").insertMany(registers);
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("❌ Error guardando en Mongo:", err);
      return res.status(500).json({ error: "Error guardando datos" });
    }
  }

  res.status(405).end();
}