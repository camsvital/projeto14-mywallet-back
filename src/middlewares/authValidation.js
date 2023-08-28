import { db } from "../db.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const sessions = await db.collection("sessions").findOne({ token });
    if (!sessions) return res.sendStatus(401);

    res.locals.sessions = sessions;

    next();
  } catch (err) {
    res.status(500);
  }
}
