import express from "express";
import { authChecker } from "../middlewares/authChecker.js";
import { addInvoice, deleteInvoice, editInvoice, getInvoices } from "../controllers/invoice.controller.js";

const router = express.Router();
router.get("/get", authChecker, getInvoices);
router.post("/add", authChecker, addInvoice);
router.delete("/delete/:id", authChecker, deleteInvoice);
router.put("/update/:id", authChecker, editInvoice);

export default router;
