import { db } from "../db.js";
import dayjs from "dayjs";


export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const { userId } = res.locals.sessions;

  try {
    const date = dayjs().valueOf();

    await db
      .collection("transaction")
      .insertOne({ value, description, type, userId, date });
  } catch (err) {
    res.status(500);
  }
}
export async function getTransaction(req, res) {
  const { userId } = res.locals.sessions;
  try {
    const transaction = await db
      .collection("transactions")
      .find({ userId })
      .sort({ $natural: -1 })
      .toArray();
  } catch (err) {
    res.status(500);
  }
}
