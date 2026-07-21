import { Router } from "express";
import { z } from "zod";
import { saveLink, getAllLinks, search, shareDigest } from "../services/linkService.js";

const router = Router();

const NewLink = z.object({
  url: z.string(),
  title: z.string().optional(),
  tags: z.string().optional(),
  note: z.string().optional(),
  isPrivate: z.boolean().optional(),
});

router.post("/", async (req, res) => {
  const parsed = NewLink.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid body", details: parsed.error.issues });
  }
  try {
    const link = await saveLink(parsed.data);
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", (_req, res) => {
  res.json(getAllLinks());
});

router.get("/search", (req, res) => {
  res.json(search(req.query.q));
});

router.post("/share", (_req, res) => {
  res.json({ links: shareDigest() });
});

export default router;
