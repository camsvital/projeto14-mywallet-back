import { Router } from "express";
import {
  createTransaction,
  getTransaction,
} from "../controllers/transaction.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { transactionSchema } from "../schemas/authSchemas.js";
import { authValidation } from "../middlewares/authValidation.js";

const transactionRouter = Router();

transactionRouter.post(
  "/transactions",
  authValidation,
  schemaValidation(transactionSchema),
  createTransaction
);
transactionRouter.get("/transaction", authValidation, getTransaction);

export default transactionRouter;
