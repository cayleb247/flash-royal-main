import { Router } from "express";
import {
  createQuestionSet,
  getQuestionSets,
} from "../Controllers/questionSetController.js";
import jwt from "jsonwebtoken";
const router = Router();

router.get("/questionSets", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }

    return user;
  });
  const username = decoded.username;
  await getQuestionSets(username, (questionSets, err) => {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }

    res.send(questionSets);
  });
});

router.post("/createQuestionSet", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }

    return user;
  });
  const username = decoded.username;

  let { questions, name } = req.body;

  await createQuestionSet(username, questions, name, (_, err) => {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }
    res.send("success");
  });
});

export default router;
