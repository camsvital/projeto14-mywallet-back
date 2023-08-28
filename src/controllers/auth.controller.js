import { db } from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (user) return res.status(409).send("Email já foi cadastrado!");

    const passwordHash = bcrypt.hashSync(password, 10);

    await db
      .collection("users")
      .insertOne({ ...req.body, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = uuid();
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("Esse email não está cadastrado!");

    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck)
      return res.status(401).send("Sua senha está incorreta!");

    await db.collection("sessions").insertOne({ token, userId: user._id });

    res.send({ token, userName: user.name });
  } catch (err) {
    res.status(500);
  }
}

export async function signOut(req, res) {
  const token = res.locals.session.token;
  try {
    await db.collection("sessions").deleteOne({ token });
    res.sendStatus(200);
  } catch (err) {
    res.status(500);
  }
}
