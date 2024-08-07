import express from "express";
import { authChecker } from "../middlewares/authChecker.js";
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/note.controller.js";

const router = express.Router();
router.get("/read-all",authChecker,getAllNotes);
router.post("/create",authChecker,createNote );
router.put("/update/:id",authChecker,updateNote );
router.delete("/delete/:id",authChecker,deleteNote );

export default router;
