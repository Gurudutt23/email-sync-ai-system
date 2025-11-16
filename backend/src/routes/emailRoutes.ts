import { Router } from "express";
import { getAllEmails, createEmail } from "../controllers/emailController";

const router = Router();

router.get("/all", getAllEmails);
router.post("/", createEmail);

export default router;
